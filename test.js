const path = require('node:path');
const { createIcons } = require('./index.js');
createIcons(path.join(__dirname, 'files/1024.png')).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});