const fs=require('node:fs');
const d=JSON.parse(fs.readFileSync('tmp/agent-reliability/real-plan-draft.json','utf8'));
const lines=d.plan.changes.map(c=>{const parts=c.pointer.split('/'),idx=+parts.at(-1),items=d.layout.listaDocumentos[c.documentIndex].layout;const ordinal=items.slice(0,idx).filter(x=>x.type==='text').length;return [c.documentIndex,ordinal,c.before,c.after,c.context.xMm,c.context.yMm].join('\t');});
fs.writeFileSync('tmp/final-legacy/manifest.tsv',lines.join('\n'));
console.log(JSON.stringify({edits:lines.length,documents:d.plan.scope.documents}));
