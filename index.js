const icongen = require('icon-gen');

/**
 * ico:需提供16x16,24x24,32x32,48x48,64x64,128x128,256x256大小的图片
 * icns:需提供16x16,32x32,64x64,128x128,256x256,512x512,1024x1024大小的图片
 * favicon.ico:需提供16x16,24x24,32x32,48x48,64x64大小的图片
 * 文件均以大小命名，如：24.png
 * 
 * 不想生成某种格式的图标，把该格式的配置传入空对象即可，不传则使用默认配置
 * 
 * @param {*} pngFolder 
 * @param {*} outputFolder 
 * @param {*} options 
 */
exports.createIcons = function createIcons(pngFolder, outputFolder, options = {
    report: true,
    ico: {
        name: 'app',
        sizes: [16, 24, 32, 48, 64, 128, 256]
    },
    icns: {
        name: 'app',
        sizes: [16, 32, 64, 128, 256, 512, 1024]
    },
    favicon: {
        name: 'favicon-',
        // pngSizes: [32, 57, 72, 96, 120, 128, 144, 152, 195, 228],
        pngSizes: [32, 128],
        icoSizes: [16, 24, 32, 48, 64]
    }
}) {
    console.log(pngFolder);
    return icongen(pngFolder, outputFolder, options);
}