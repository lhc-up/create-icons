const path = require('path');
const { createIcons } = require('./main.js');
createIcons(path.join(__dirname, 'files/png'), path.join(__dirname, 'files/output')).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});