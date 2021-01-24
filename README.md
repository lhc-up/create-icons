# create-icns-mac
Mac系统下制作icns图片，需要提供1024x1024的png图片

## Quick Start
```js
const { createIcns } = require('create-icns-mac');
createIcns(imgPath).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
// or
(async () => {
    const data = await createIcns(imgPath);
})();
```

## Notes  
**icns图片制作步骤如下：**  
- 生成临时文件夹：`folder.iconset`，文件夹名称随便都可以，但必须使用`.iconset`后缀
- 使用mac图片工具sips，根据原始图片，制作不同尺寸的图片备用，全部尺寸为：`[16, 32, 128, 256, 512]`，每个尺寸除自身外还需要再额外制作一个2倍图，命令为
  ```bash
  sips -z 16 16 inputPath --out folder.iconset/icon_16x16.png
  sips -z 32 32 inputPath --out folder.iconset/icon_16x16@2x.png
  ```
  共生成10张图片，且都保存在上一步的临时文件夹中
- 使用iconutil命令把folder.iconset生成为icns
  ```bash
  iconutil -c icns folder.iconset -o output.icns
  ```