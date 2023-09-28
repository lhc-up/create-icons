const icongen = require('icon-gen');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * ico:需提供16x16,24x24,32x32,48x48,64x64,128x128,256x256大小的图片
 * icns:需提供16x16,32x32,64x64,128x128,256x256,512x512,1024x1024大小的图片
 * favicon.ico:需提供16x16,24x24,32x32,48x48,64x64大小的图片
 * 文件均以大小命名，如：24.png
 * 
 * 不想生成某种格式的图标，把该格式的配置传入空对象即可，不传则使用默认配置
 * 
 * @param {*} pngDir 
 * @param {*} outputDir 
 * @param {*} options 
 */
async function createIcons(png1024, outputDir, options = {
    report: true,
    ico: {
        name: 'client-windows',
        sizes: [16, 24, 32, 48, 64, 128, 256]
    },
    icns: {
        name: 'client-mac',
        sizes: [16, 32, 64, 128, 256, 512, 1024]
    },
    favicon: {
        name: 'web-favicon-',
        pngSizes: [32, 57, 72, 96, 120, 128, 144, 152, 195, 228],
        icoSizes: [16, 24, 32, 48, 64]
    }
}) {
    const pngDir = await createAllSizeImages(png1024, path.join(__dirname, 'files/png'));
    return icongen(pngDir, outputDir, options);
}

/**
 * 根据给定图片，生成各尺寸图片，推荐1024x1024
 * @param {*} png1024 
 * @returns 
 */
async function createAllSizeImages(png1024, outputDir) {
    if (!outputDir) outputDir = path.dirname(png1024);
    const allSize = [16, 24, 32, 48, 57, 64, 72, 96, 120, 128, 144, 152, 195, 228, 256, 512, 1024];
    const promiseList = allSize.map(size => {
        return sharp(png1024).resize(size, size).png().toBuffer();
    });
    const bufferList = await Promise.all(promiseList);
    for (const [index, buf] of bufferList.entries()) {
        fs.writeFileSync(path.join(outputDir, `${allSize[index]}.png`), buf);
    }
    return outputDir;
}

exports.createIcons = createIcons;
exports.createAllSizeImages = createAllSizeImages;