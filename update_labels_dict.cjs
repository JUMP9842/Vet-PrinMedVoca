const fs = require('fs');
let content = fs.readFileSync('src/components/DictionaryView.tsx', 'utf8');

content = content.replaceAll('(11 ระบบ)', '(12 ระบบ)');

fs.writeFileSync('src/components/DictionaryView.tsx', content, 'utf8');
