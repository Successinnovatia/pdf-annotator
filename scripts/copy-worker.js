// scripts/copy-worker.js
const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destPath = path.join(__dirname, '..', 'public', 'pdf.worker.min.mjs');

try {
  // Ensure the public directory exists
  const publicDir = path.dirname(destPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(sourcePath, destPath);
  console.log('✅ PDF worker file copied successfully');
  console.log(`   From: ${sourcePath}`);
  console.log(`   To: ${destPath}`);
} catch (error) {
  console.error('❌ Error copying PDF worker file:', error.message);
  process.exit(1);
} 