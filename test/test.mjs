console.log('test.mjs module');
export function  test() {
        console.log('test')
    
}

console.log(" %ct %cest", "color:red", "color:blue")
console.log('\x1b[36m%s', 'I am cyan');  //cyan

console.log('test')
console.log('\x1b[43m%s\x1b[0m', "stringToMakeYellow");  //yellow
console.log("\x1b[35;3;1m%s #eab10e","test")