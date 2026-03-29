// console.log(arguments);
// console.log(require('module').wrapper);

//module.exports
const Cal = require('./test-module-1')
const C = new Cal();
console.log(C.add(1,4))

//exports
const Cal2 = require('./test-modules-2')
console.log(Cal2.add(1,4))

require('./test-module-3')();

