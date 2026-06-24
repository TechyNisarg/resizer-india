import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';

const VERSION = '1.7.0';
const URL = `https://staticimgly.com/@imgly/background-removal-data/${VERSION}/package.tgz`;
const TAR_FILE = 'package.tgz';
const TARGET_DIR = path.resolve('public', 'models', 'bg-removal');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

console.log(`Downloading ${URL}...`);

const file = fs.createWriteStream(TAR_FILE);

https.get(URL, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete. Extracting...');
    try {
      execSync(`tar -xf ${TAR_FILE}`);
      // Tar extracts to a folder named "package"
      const packageDist = path.resolve('package', 'dist');
      
      // Copy all files from package/dist to public/models/bg-removal
      const files = fs.readdirSync(packageDist);
      for (const f of files) {
        fs.copyFileSync(path.join(packageDist, f), path.join(TARGET_DIR, f));
      }
      
      console.log(`Models successfully copied to ${TARGET_DIR}`);
      
      // Cleanup
      fs.unlinkSync(TAR_FILE);
      fs.rmSync('package', { recursive: true, force: true });
    } catch (e) {
      console.error('Error during extraction:', e);
    }
  });
}).on('error', (err) => {
  fs.unlink(TAR_FILE, () => {});
  console.error('Error downloading:', err.message);
});
