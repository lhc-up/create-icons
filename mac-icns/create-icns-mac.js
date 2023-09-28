const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// sips -z 16 16 /Users/luohao/Desktop/icns/logo.png --out /Users/luohao/Desktop/icns/logo_16x16.png
// 1024x1024 png
function createIcns(png1024) {
    return new Promise(async (resolve, reject) => {
        if (os.platform() !== 'darwin') return reject('Mac Only -_-!!!');
        try {
            if (!fs.existsSync(png1024)) return reject(`${png1024}图片不存在！`);
        } catch(err) {
            return reject(err);
        }
        const sizeArr = [16, 32, 128, 256, 512];
        const iconsetFolder = path.join(path.dirname(png1024), 'icns_temp.iconset');
        try {
            fs.mkdirSync(iconsetFolder);
        } catch(err) {console.log(err)}
        
        for (let i = 0; i < sizeArr.length; i++) {
            const size = sizeArr[i];
            try {
                await spawnAsync(`sips -z ${size} ${size} ${png1024} --out ${path.join(iconsetFolder, `icon_${size}x${size}.png`)}`);
                await spawnAsync(`sips -z ${size * 2} ${size * 2} ${png1024} --out ${path.join(iconsetFolder, `icon_${size}x${size}@2x.png`)}`);
            } catch(err) {
                return reject(err);
            }
        }
        // iconutil -c icns /Users/luohao/Desktop/icns/logo.iconset -o /Users/luohao/Desktop/icns/aaa.icns
        const folder = path.dirname(png1024);
        const name = path.basename(png1024, path.extname(png1024));
        const output = path.join(folder, `${name}.icns`);
        const cmd = `iconutil -c icns ${iconsetFolder} -o ${output}`;
        spawnAsync(cmd).then(() => {
            try {
                fs.rmdirSync(iconsetFolder, { recursive: true });
            } catch(err) { console.log(err) }
            resolve(output);
        }).catch(err => {
            reject(err);
        });
    });
}
function spawnAsync(cmd) {
    return new Promise((resolve, reject) => {
        const cmdArr = cmd.split(' ');
        const cp = spawn(cmdArr.shift(), cmdArr);
        const stdout = [], stderr = [];

        cp.on('error', err => reject(err));
        cp.stderr.on('data', data => stderr.push(data));
        cp.stdout.on('data', data => stdout.push(data));

        cp.on('close', code => {
            const info = Buffer.concat([...stdout, ...stderr]).toString();
            return code ? reject(info) : resolve(info);
        });
    });
}
module.exports = {
    createIcns
}