const fs = require('node:fs/promises');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'dist');

async function build() {
  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.cp(path.join(projectRoot, 'site'), outputDirectory, { recursive: true });
  console.log('Website built in dist/');
}

build().catch((error) => {
  console.error('Website build failed:', error);
  process.exitCode = 1;
});