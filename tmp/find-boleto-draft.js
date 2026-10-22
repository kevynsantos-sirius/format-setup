const fs = require('fs');
const path = require('path');

const root = path.resolve('format-web/projects');
for (const project of fs.readdirSync(root)) {
  const file = path.join(root, project, 'assets', 'drafts', 'layout-draft.json');
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('SAC: 0800 286 0116') || text.includes('Boleto Instituidos')) {
    console.log(file);
  }
}
