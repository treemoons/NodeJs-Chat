let one_base64 = Buffer.from('{"name":"中文名"}', 'utf8').toString('base64');
console.log("one_base64: ",one_base64)
let two_base64 =Buffer.from(one_base64,'utf-8') .toString('base64');
console.log("two_base64:", two_base64)
let one_decryt = Buffer.from(two_base64, 'base64').toString();
console.log("one_decryt",one_decryt)
let originString = Buffer.from(one_decryt, 'base64').toString()
console.log(originString)