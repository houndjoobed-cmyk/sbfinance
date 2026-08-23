const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../src/app/sbf-gestion/(dashboard)'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/className=\"([^\"]*)border-gray-300([^\"]*)\"/g, (match, p1, p2) => {
    let classes = (p1 + 'border-gray-300' + p2).split(' ').filter(c => c);
    if (!classes.includes('border')) classes.push('border');
    if (!classes.includes('bg-white') && !classes.some(c => c.startsWith('bg-'))) classes.push('bg-white');
    if (!classes.some(c => c.startsWith('p-') || c.startsWith('px-') || c.startsWith('py-'))) {
      classes.push('px-3', 'py-2');
    }
    return 'className=\"' + classes.join(' ') + '\"';
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Updated ' + file);
  }
});
