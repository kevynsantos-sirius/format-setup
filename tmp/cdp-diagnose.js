const fs = require('fs');

const targetUrl = process.argv[2] || 'http://localhost:5173/project/editor?projectId=b2eb6cfa-cc44-4274-9a4f-2af15473e48a&imported=true';
const screenshotPath = process.argv[3] || 'tmp/cdp-editor.png';
const port = process.argv[4] || '9223';
const shouldNavigate = process.argv[5] !== 'no-nav';

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  return response.json();
}

async function main() {
  const tabs = await getJson(`http://127.0.0.1:${port}/json`);
  const tab = tabs.find((item) => item.type === 'page') || tabs[0];
  if (!tab || !tab.webSocketDebuggerUrl) throw new Error('No debuggable page found');

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let nextId = 1;
  const pending = new Map();
  const events = [];

  ws.onmessage = (message) => {
    const payload = JSON.parse(message.data);
    if (payload.id && pending.has(payload.id)) {
      const { resolve, reject } = pending.get(payload.id);
      pending.delete(payload.id);
      if (payload.error) reject(new Error(JSON.stringify(payload.error)));
      else resolve(payload.result);
      return;
    }
    if (payload.method) events.push(payload);
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  function send(method, params = {}) {
    const id = nextId++;
    ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Performance.enable');
  if (shouldNavigate) {
    await send('Page.navigate', { url: targetUrl });
  }

  const started = Date.now();
  while (Date.now() - started < 15000) {
    const ready = await send('Runtime.evaluate', {
      expression: 'document.readyState',
      returnByValue: true
    }).catch(() => null);
    if (ready?.result?.value === 'complete') break;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const metrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvas = document.querySelector('#canvas, .canvas, [data-editor-canvas], .editor-canvas');
      const components = Array.from(document.querySelectorAll('.component'));
      const selected = Array.from(document.querySelectorAll('.component.selected'));
      const pageSelector = document.querySelector('#pageSelector');
      const buttons = document.querySelectorAll('button').length;
      const bodyText = document.body ? document.body.innerText.slice(0, 1200) : '';
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        href: location.href,
        title: document.title,
        readyState: document.readyState,
        bodyText,
        canvasFound: Boolean(canvas),
        canvasRect: canvas ? canvas.getBoundingClientRect().toJSON() : null,
        componentCount: components.length,
        selectedCount: selected.length,
        pageCount: pageSelector ? pageSelector.options.length : null,
        buttonCount: buttons,
        memory: performance.memory ? {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        } : null,
        navigation: nav ? {
          domContentLoaded: nav.domContentLoadedEventEnd,
          loadEventEnd: nav.loadEventEnd,
          duration: nav.duration
        } : null
      };
    })()`,
    returnByValue: true
  });

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(screenshotPath, Buffer.from(shot.data, 'base64'));

  console.log(JSON.stringify({
    targetUrl,
    screenshotPath,
    metrics: metrics.result.value,
    recentEvents: events.slice(-10).map((event) => event.method)
  }, null, 2));

  ws.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
