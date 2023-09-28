const path = require('path');
const { createIcons } = require('./index.js');
createIcons(path.join(__dirname, 'files/png/1024.png'), path.join(__dirname, 'files/output')).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});