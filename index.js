const icongen = require('icon-gen');
const sharp = require('sharp');
const fse = require('fs-extra');
const path = require('node:path');
const merge = require('merge');

function getOutputDir(output) {
    const _out = output || path.join(__dirname, 'output');
    fse.ensureDirSync(_out);
    return _out;
}

/**
 * ico:需提供16x16,24x24,32x32,48x48,64x64,128x128,256x256大小的图片
 * icns:需提供16x16,32x32,64x64,128x128,256x256,512x512,1024x1024大小的图片
 * favicon.ico:需提供16x16,24x24,32x32,48x48,64x64大小的图片
 * 文件均以大小命名，如：24.png
 * 
 * 不想生成某种格式的图标，把该格式的配置传入空对象即可，不传则使用默认配置
 * 
 * @param {String} pngPath 
 * @param {String} output 
 * @param {Object} options 
 */
async function createIcons(pngPath, output, options={}) {
    output = getOutputDir(output);
    fse.emptyDirSync(output);
    // see https://www.npmjs.com/package/icon-gen
    const defaultOptions = {
        report: false,
        ico: {
            name: 'icon',
            sizes: [256]
        },
        icns: {
            name: 'icon',
            sizes: [1024]
        },
        favicon: {
            name: 'favicon',
            pngSizes: [32],
            icoSizes: [32]
        }
    }
    const opt = merge({}, defaultOptions, options);
    const pngDir = await createAllSizeImages(pngPath, path.join(output, 'tempPngs'));
    await collectLinuxIcons(pngDir);
    fse.copyFileSync(pngPath, path.join(output, 'icon.png'));
    return icongen(pngDir, output, opt);
}

async function collectLinuxIcons(pngDir, output) {
    output = getOutputDir(output);
    const sizeList = [16, 24, 32, 48, 64, 96, 128, 256, 512, 1024];
    for (const size of sizeList) {
        const png = path.join(pngDir, `${size}.png`);
        fse.copyFileSync(png, path.join(output, `${size}x${size}.png`));
    }
}

/**
 * 根据给定图片，生成各尺寸图片，推荐1024x1024
 * @param {String} pngPath 
 * @returns 
 */
async function createAllSizeImages(pngPath, output) {
    output = getOutputDir(output);
    fse.emptyDirSync(output);
    const allSize = [16, 24, 32, 48, 57, 64, 72, 96, 120, 128, 144, 152, 195, 228, 256, 512, 1024];
    const promiseList = allSize.map(size => {
        return sharp(pngPath).resize(size, size).png().toBuffer();
    });
    const bufferList = await Promise.all(promiseList);
    for (const [index, buf] of bufferList.entries()) {
        fse.writeFileSync(path.join(output, `${allSize[index]}.png`), buf);
    }
    return output;
}

exports.createIcons = createIcons;
exports.createAllSizeImages = createAllSizeImages;