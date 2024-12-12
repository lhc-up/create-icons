const path = require('path');
const { createIcons } = require('./index.js');
createIcons(path.join(__dirname, 'files/png/1024.png'), path.join(__dirname, 'files/output'), {
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
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});