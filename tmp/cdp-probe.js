const port = process.argv[2] || '9224';

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  return response.json();
}

async function main() {
  const tabs = await getJson(`http://127.0.0.1:${port}/json`);
  const tab = tabs.find((item) => item.type === 'page') || tabs[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let nextId = 1;
  const pending = new Map();
  const logs = [];
  const exceptions = [];
  const responses = [];
  const failures = [];

  ws.onmessage = (message) => {
    const payload = JSON.parse(message.data);
    if (payload.id && pending.has(payload.id)) {
      const { resolve, reject } = pending.get(payload.id);
      pending.delete(payload.id);
      if (payload.error) reject(new Error(JSON.stringify(payload.error)));
      else resolve(payload.result);
      return;
    }
    if (payload.method === 'Runtime.consoleAPICalled') {
      logs.push({
        type: payload.params.type,
        text: payload.params.args.map((arg) => arg.value || arg.description || '').join(' ')
      });
    }
    if (payload.method === 'Runtime.exceptionThrown') {
      exceptions.push(payload.params.exceptionDetails);
    }
    if (payload.method === 'Network.responseReceived') {
      const r = payload.params.response;
      responses.push({ url: r.url, status: r.status, mimeType: r.mimeType });
    }
    if (payload.method === 'Network.loadingFailed') {
      failures.push(payload.params);
    }
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

  await send('Runtime.enable');
  await send('Network.enable');
  await new Promise((resolve) => setTimeout(resolve, 8000));

  const state = await send('Runtime.evaluate', {
    expression: `(() => {
      const safe = (fn) => { try { return fn(); } catch (e) { return String(e && e.message || e); } };
      return {
        href: location.href,
        text: document.body.innerText.slice(0, 1000),
        globals: Object.keys(window).filter(k => /Layout|Format|Project|Editor|Core|UI/i.test(k)).slice(0, 80),
        layoutCore: safe(() => ({
          pageCount: window.LayoutCore?.state?.pages?.length,
          currentPage: window.LayoutCore?.state?.currentPage,
          componentCount: window.LayoutCore?.state?.pages?.[window.LayoutCore?.state?.currentPage || 0]?.layout?.length,
          project: window.LayoutCore?.state?.project
        })),
        pageSelectorCount: document.querySelector('#pageSelector')?.options?.length || null,
        componentCount: document.querySelectorAll('.component').length,
        loadingText: Array.from(document.querySelectorAll('*')).map(e => e.innerText).find(t => t && t.includes('Preparando projeto importado')) || null,
        scripts: Array.from(document.scripts).map(s => s.src).filter(Boolean).slice(-10)
      };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify({
    state: state.result.value,
    logs: logs.slice(-30),
    exceptions: exceptions.slice(-10).map((e) => ({
      text: e.text,
      exception: e.exception?.description,
      url: e.url,
      lineNumber: e.lineNumber,
      columnNumber: e.columnNumber
    })),
    failures: failures.slice(-20).map((f) => ({ url: f.requestId, errorText: f.errorText, canceled: f.canceled })),
    responses: responses.slice(-50).map((r) => ({ status: r.status, url: r.url.replace(location?.origin || '', '') }))
  }, null, 2));

  ws.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
