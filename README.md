# create-icons

根据png图片制作Electorn客户端使用的.ico(windows),.icns(mac)格式的图标以及web端使用的favicon.ico，推荐使用1024x1024的png图片，只需一张图片，剩下的由程序搞定

## install

- `Node.js`:14.19.0
- `icon-gen`如果装不上，可尝试直接从源码构建:`npm install icon-gen --build-from-source --nodedir=/path-to/14.19.0`

## Quick Start

```js
const { createIcons } = require('./index.js');
createIcons('1024.png', 'outputDir').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
```

## Notes  

**Mac环境，使用命令行工具制作icns图片，步骤如下：**  

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
