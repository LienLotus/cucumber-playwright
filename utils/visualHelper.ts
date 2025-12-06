import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export async function compareScreenshotWithBaseline(actualPath: string, baselineName: string): Promise<void> {
  const baselineDir = path.join(process.cwd(), 'visual-baseline');
  const baselinePath = path.join(baselineDir, baselineName);

  if (!fs.existsSync(baselineDir)) {
    fs.mkdirSync(baselineDir, { recursive: true });
  }

  if (process.env.UPDATE_SNAPSHOTS === 'true' || !fs.existsSync(baselinePath)) {
    fs.copyFileSync(actualPath, baselinePath);
    // First run or updating snapshots: treat as pass
    return;
  }

  const actualImg = PNG.sync.read(fs.readFileSync(actualPath));
  const baselineImg = PNG.sync.read(fs.readFileSync(baselinePath));

  if (actualImg.width !== baselineImg.width || actualImg.height !== baselineImg.height) {
    throw new Error('Snapshot size mismatch between baseline and actual image');
  }

  const { width, height } = actualImg;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    actualImg.data,
    baselineImg.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  const allowedDiff = 100; // tune as needed
  if (numDiffPixels > allowedDiff) {
    const diffPath = path.join('test-results', 'visual-diffs', baselineName);
    const diffDir = path.dirname(diffPath);
    if (!fs.existsSync(diffDir)) {
      fs.mkdirSync(diffDir, { recursive: true });
    }
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    throw new Error(`Visual regression detected for ${baselineName}. Diff pixels: ${numDiffPixels}`);
  }
}
