import {default as test} from './test/chat-frame.js';
 function a() {
     console.log('test')
     let p = document.getElementById('p');
            p.innerHTML="sssss"
}

/**
 * @param {string} fmt 
 */
// Date.prototype.formatDate = formatdate
// window.formatdate = formatdate
window.test = test;
window.a = a;
async function a(){return true;};
async function s(p) {
    
    return p;
}
async function t() {
    console.log(await s(await a()))
}
t()