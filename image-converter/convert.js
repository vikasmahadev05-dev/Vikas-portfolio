const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const signatureDir = 'C:\\Users\\vikas\\OneDrive\\Desktop\\Portfolio\\frontend\\src\\assets\\signature';

async function convertFrames() {
    console.log('Starting conversion...');
    const files = fs.readdirSync(signatureDir).filter(f => f.endsWith('.png'));
    
    if (files.length === 0) {
        console.log('No PNG files found.');
        return;
    }

    let processed = 0;
    for (const file of files) {
        const inputPath = path.join(signatureDir, file);
        // Rename from ezgif-frame-001.png to frame-001.webp for cleaner naming
        const newName = file.replace('ezgif-', '').replace('.png', '.webp');
        const outputPath = path.join(signatureDir, newName);

        try {
            await sharp(inputPath)
                .webp({ quality: 60 }) // 60 is a great balance of size/quality for high fps sequences
                .toFile(outputPath);
            
            // Delete original PNG
            fs.unlinkSync(inputPath);
            processed++;
            console.log(`Converted and deleted: ${file} -> ${newName}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    console.log(`Successfully converted ${processed} frames to WebP!`);
}

convertFrames();
