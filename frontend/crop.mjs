import Jimp from 'jimp';

async function cropFavicon() {
  try {
    const image = await Jimp.read('./src/assets/hero-color.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Calculate the square to crop from the center
    const size = Math.min(width, height);
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    
    // Crop it to a 1:1 square
    image.crop(x, y, size, size);
    
    // Resize down to 256x256 for a solid, crisp favicon
    image.resize(256, 256);
    
    await image.writeAsync('./public/favicon.png');
    console.log('Successfully cropped and resized favicon!');
  } catch (err) {
    console.error('Error cropping image:', err);
  }
}

cropFavicon();
