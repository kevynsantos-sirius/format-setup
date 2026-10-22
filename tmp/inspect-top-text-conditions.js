const fs = require('fs');

const file = 'format-web/projects/25c0fea3-fb18-4ee5-a572-7262fcee9358/assets/drafts/layout-draft.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const page = data.listaDocumentos?.[0];

function text(content) {
  if (!Array.isArray(content)) return String(content ?? '');
  return content.map(part => {
    if (!part || typeof part !== 'object') return String(part ?? '');
    if (part.type === 'breakline') return '\\n';
    if (part.type === 'text') return part.content ?? '';
    if (part.type === 'campoSaida') return `{${part.expressao || part.content || ''}}`;
    return `[${part.type}]`;
  }).join('');
}

for (const [index, item] of (page?.layout || []).entries()) {
  if (item?.type === 'text' && item.x < 20 && item.y < 45) {
    console.log(JSON.stringify({
      index,
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      conditional: item.conditional,
      condicao: item.condicao,
      content: text(item.content).slice(0, 500)
    }, null, 2));
  }
}
