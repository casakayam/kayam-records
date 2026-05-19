const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'client');
const outputFile = path.join(__dirname, 'kayam_records_full_code.txt');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
        if (!file.includes('node_modules') && !file.includes('dist')) {
            results = results.concat(walk(file));
        }
    } else { 
      if (file.match(/\.(tsx|ts|html|css|json)$/)) {
          results.push(file);
      }
    }
  });
  return results;
}

const allFiles = walk(rootDir);
let combined = '';

allFiles.forEach(file => {
    const relPath = path.relative(__dirname, file);
    combined += `\n\n// ==========================================\n`;
    combined += `// File: ${relPath}\n`;
    combined += `// ==========================================\n\n`;
    combined += fs.readFileSync(file, 'utf8');
});

fs.writeFileSync(outputFile, combined);
console.log('Export successful! Wrote ' + allFiles.length + ' files to ' + outputFile);
