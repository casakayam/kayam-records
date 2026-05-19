const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const distAssetsDir = path.join(__dirname, 'dist', 'public', 'assets');
const clientAssetsDir = path.join(__dirname, 'client', 'public', 'assets');

// Directories to process: both source public/assets and dist/public/assets
const targetDirs = [clientAssetsDir, distAssetsDir];

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.match(/\.(png|jpe?g)$/i)) {
        results.push(file);
      }
    }
  });
  return results;
}

async function optimize() {
  console.log('--- Devops Image Optimization Script ---');
  
  // Find all images in our target directories
  let images = [];
  targetDirs.forEach(dir => {
    images = images.concat(walk(dir));
  });

  // De-duplicate in case paths overlap
  images = [...new Set(images)];

  console.log(`Found ${images.length} unique source/dist images to optimize.`);

  for (const img of images) {
    const ext = path.extname(img).toLowerCase();
    const dir = path.dirname(img);
    const name = path.basename(img, ext);
    
    // Skip if it's already a webp or a temporary asset
    if (name.endsWith('.webp')) continue;

    const webpPath = path.join(dir, `${name}.webp`);
    
    try {
      const buf = fs.readFileSync(img);
      const originalSize = buf.length;

      // 1. Generate the WebP alternative in the same directory (at 80% quality)
      await sharp(buf)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const webpSize = fs.statSync(webpPath).size;

      // 2. Compress the original PNG or JPEG *in-place*
      // This guarantees zero code changes are needed while saving huge bandwidth immediately
      let optimizedSize = originalSize;
      if (ext === '.png') {
        await sharp(buf)
          .png({ quality: 80, compressionLevel: 9, palette: true })
          .toFile(img);
        optimizedSize = fs.statSync(img).size;
      } else if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(buf)
          .jpeg({ quality: 80, progressive: true })
          .toFile(img);
        optimizedSize = fs.statSync(img).size;
      }

      const savingInPlace = ((1 - optimizedSize / originalSize) * 100).toFixed(0);
      const savingWebP = ((1 - webpSize / originalSize) * 100).toFixed(0);

      console.log(`✓ Processed ${path.relative(__dirname, img)}:`);
      console.log(`  Original : ${(originalSize / 1024).toFixed(1)} KB`);
      console.log(`  Optimized: ${(optimizedSize / 1024).toFixed(1)} KB (-${savingInPlace}%) [In-Place]`);
      console.log(`  WebP ver : ${(webpSize / 1024).toFixed(1)} KB (-${savingWebP}%) [Sidecar]`);
    } catch (err) {
      console.error(`✗ Error processing ${img}:`, err.message);
    }
  }
  console.log('--- Image Optimization Finished! ---');
}

// Generate responsive WebP sizes for key images and a small logo variant
async function generateResponsiveVariants() {
  console.log('--- Generating Responsive Variants ---');

  const heroSrc = path.join(clientAssetsDir, 'Rec_Podcast_47a04dba.jpeg');
  if (fs.existsSync(heroSrc)) {
    const buf = fs.readFileSync(heroSrc);
    for (const width of [400, 800]) {
      const outPath = path.join(clientAssetsDir, `Rec_Podcast_47a04dba-${width}w.webp`);
      await sharp(buf).resize(width).webp({ quality: 80 }).toFile(outPath);
      console.log(`✓ ${path.basename(outPath)} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
    }
  }

  const logoSrc = path.join(clientAssetsDir, 'logo-kayam-new.png');
  if (fs.existsSync(logoSrc)) {
    const outPath = path.join(clientAssetsDir, 'logo-kayam-new-small.png');
    await sharp(fs.readFileSync(logoSrc))
      .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`✓ ${path.basename(outPath)} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
  }

  console.log('--- Responsive Variants Done ---');
}

optimize().then(generateResponsiveVariants);
