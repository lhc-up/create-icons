const { createIcns } = require('./index.js');

createIcns('./logo.png').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});