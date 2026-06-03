const fs = require('fs');
for (const file of ['src/components/Education.jsx', 'src/components/AboutMe.jsx', 'src/components/Projects.jsx']) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace('bg-[#E3D4C1]', 'bg-transparent');
    const startIdx = content.indexOf('{/* Subtle Neon Blue & Red Ambient Lighting */}');
    if (startIdx !== -1) {
        const endIdx = content.indexOf('</div>', content.indexOf('{/* Glowing Curvy Spider Web Pattern Background */}')) + 6;
        content = content.substring(0, startIdx) + content.substring(endIdx);
    }
    fs.writeFileSync(file, content);
}
console.log('Cleaned files');
