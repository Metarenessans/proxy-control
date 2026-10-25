import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWatch = process.argv.includes('--watch');
const distDir = path.resolve(__dirname, 'dist');
const scratchDir = path.resolve('C:\\Users\\zeron\\.gemini\\antigravity-ide\\scratch\\proxy-extension');

async function build() {
  console.log('[Build] Starting TypeScript bundle...');

  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  // 1. Bundle TypeScript entry points directly into root of dist
  await esbuild.build({
    entryPoints: [
      { in: path.resolve(__dirname, 'src/background/background.ts'), out: 'background' },
      { in: path.resolve(__dirname, 'src/popup/popup.ts'), out: 'popup' },
      { in: path.resolve(__dirname, 'src/options/options.ts'), out: 'options' },
      { in: path.resolve(__dirname, 'src/offscreen/offscreen.ts'), out: 'offscreen' }
    ],
    outdir: distDir,
    bundle: true,
    minify: false,
    sourcemap: true,
    target: 'es2022',
    format: 'iife',
    platform: 'browser',
    logLevel: 'info'
  });

  // 2. Copy static assets to dist
  copyFileSync(path.resolve(__dirname, 'src/manifest.json'), path.resolve(distDir, 'manifest.json'));
  copyFileSync(path.resolve(__dirname, 'src/styles/style.css'), path.resolve(distDir, 'style.css'));
  copyFileSync(path.resolve(__dirname, 'src/popup/popup.html'), path.resolve(distDir, 'popup.html'));
  copyFileSync(path.resolve(__dirname, 'src/options/options.html'), path.resolve(distDir, 'options.html'));
  copyFileSync(path.resolve(__dirname, 'src/offscreen/offscreen.html'), path.resolve(distDir, 'offscreen.html'));

  const iconsSrcDir = path.resolve(__dirname, 'src/icons');
  const iconsDistDir = path.resolve(distDir, 'icons');
  copyDirSync(iconsSrcDir, iconsDistDir);

  console.log('[Build] dist/ generated successfully.');

  // 3. Sync to Chrome dev scratch directory if accessible
  try {
    if (fs.existsSync(path.dirname(scratchDir))) {
      copyDirSync(distDir, scratchDir);
      console.log('[Build] Synced to active browser scratch directory:', scratchDir);
    }
  } catch (err) {
    console.warn('[Build] Could not sync to scratch directory:', err.message);
  }

  console.log('[Build] Build complete!');
}

function copyFileSync(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

build().catch((err) => {
  console.error('[Build] Failed:', err);
  process.exit(1);
});
