const fs = require('fs');
let content = fs.readFileSync('src/components/RelatedGroupsView.tsx', 'utf8');
content = content.replaceAll('(11 ระบบ)', '(12 ระบบ)');
fs.writeFileSync('src/components/RelatedGroupsView.tsx', content, 'utf8');
