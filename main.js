﻿const electron = require('electron');
const { BrowserWindow, app } = electron;
const {exec} = require('child_process')
// const t=require('./TEST/test')
var win;
async function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });
    //  win.menuBarVisible = false;
    // Menu.setApplicationMenu(null);
    // for (const key in getcookies) {
    //     if (Object.prototype.hasOwnProperty.call(getcookies, key)) {
    //         const element = getcookies[key];
    //         console.log(`${key}==========${element}`)
    //         // cookies.set({ url: './', name: key, value: element });
    //     }
    // }
    // 并且为你的应用加载index.html

    // let p = path.join(__dirname, 'Data.db');
    // console.log(p)
    // const db = new Database(p, err => { console.log('err:' + err) });
    
    // console.log('test-sqlite3')
    // db.get('select *from relationcode limit 4,10', (err, rows) => {
    //    console.log(rows)
    // });
    win.loadFile('./test/newtest.html')
    // 打开开发者工具
    win.webContents.openDevTools();
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)
//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit();
        
    }
})
app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。
console.log('结束');

// 在主进程中.
const { ipcMain } = require('electron');
const { kill } = require('process');
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    exec('&"e:\\partJob\\NodeJs-Chat\\test\\name.ps1"',(err,stdout,stderr)=>console.log(stdout+"\n"+err+"\n"+stderr))
    event.reply('asynchronous-reply', 'main.js返回的消息');
    setTimeout(() => {
        kill(0);
    }, 10000);
    // app.quit();
})
