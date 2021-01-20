# MY NODEJS TEST 
> # **myWebChat** 
## This is client window for chatting with others,which is a component that can be CORS of website.
- this is component after user logined，username could be encrypted by function that `atob` or `btoa` to decrypt the part.
-  adds the following into your html :
 ```html
 <object data="./NodeJs-Chat/myWebChat/chat.html" type="text/html"></object>
 ```
- Then you can use the JavaScript function to change the default color of theme or other UI settings<br>(I recommend to add code to parameters that is function ,instead of deleting existed code )
```js
initialFrameTheme({
    chat= document.getElementsByClassName('chat')[0], //object element
    listsFrame = document.querySelector('.chat-list .friends-frame'),// friends list element
    chatwindowFrame = chatwindow.parentElement, //window of chat 
    focusfriend= { //setting forcolor or backgroudcolor chat to one ,who is the friend in friends list
        focusBackground: 'plum',
        focusColor: 'white'
    },
    userbubble= {  // bubble all color of current user
        userbubbleColor: undefined,
        userbubbleBackgroundColor: undefined
    },
    peerbubble= {  // bubble all color of current friend,who you chat with
        peerbubbleBackgroundColor: undefined,
        peerbubbleColor: undefined
    },
    friendlist= { // default all color of friends list ,execpt hover
        friendlistBackgroundColor: 'white',
        friendlistColor: 'black'
    },
    friendlisthover = {
        friendlisthoverColor: 'white',
        friendlisthoverBackgroundColor: 'gray'
    },
    isopentransition= false,// animotion of transistion 
    showChatWindow = (peername) => {//load all data of your friends
     // prepare to load your friend-data to the window
        frame.showFrame(peername,isopentransition);
        contextMenu();
    },
    waitDivshow= { //dot of waiting
        isShow: true,  //whether enable to use
        begin: () => { document.querySelector('.move').style.display = 'block' },
        end: () => { document.querySelector('.move').style.display = 'none' }
        }
})
```
---

> # **NodeJs** 
-  Use grammar ES6 at latest,node version -v14.8

- Cmd  ` cd ${workspaceFolder}/myNodeTest && node ./start.js`. <br>Replace `${workspaceFolder}` with your real workspace folder

- All route in the directory named controllers

- File `"./myNodeTest/data.db"` is sqlite3 for test
 
 `package.json` in order to use ES6,written
`{"type":"module"}`

***regular the format of data,which persons who talked each other via***
```ts
let sigleChat= { 
        username: string,
        content: string,
        date: string|number,
        isread:number 
}
```
***the formate of loaded data ,whose class is from  '`BuildBubblesFrame`'***
```ts
let data={
    peername:string,
    peerpic:string,
    chatdata:{
        iscurrentuser:string,
        content:string,
        date:string,
        isread:number
        }[] 
    }[]
```
***the information of uploaded file ,which is transported by httpheader***
``` ts
let fileInformation= {
     usertopeer: string|'username-peername', 
     fileExtension: string|'gif'|'png'|'jpg',
     filesize: number,
     date:string
     }
```
---
># **Electron**

- Build for chatting ,in order to test easier. 

- Thus eletron 
 
***dependencise*** in `"${wordspaceFolder}/package.json"`
```json
  "devDependencies": {
    "electron": "^11.1.0",
    "electron-builder": "^22.9.1",
    "node": "^14.15.1",
    "npm": "^6.14.9",
    "sqlite3": "^5.0.0"
  },
```