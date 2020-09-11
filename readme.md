# MY NODEJS TEST 
> # **myWebChat** 
## this is client window for chat with others.
-  adds below:
 ```html
 <script src:"./myWebChat/chat.html"></script>
 ```
- than you can just use the function 
```js
initialFrameTheme({
    chat : document.getElementsByClassName('chat')[0], //object element
    lists : document.getElementsByClassName('friends-list'),// friends list element
    chatDataWindow : document.getElementsByClassName('chat-data-frame')[0], //window of chat 
    focusfriend : { //setting forcolor or backgroudcolor chat to one ,who is the friend in friends list
        focusBackground: 'plum',
        focusColor: 'white'
    },
    userbubble : {  // bubble all color of current user
        userbubbleColor: undefined,
        userbubbleBackgroundColor: undefined
    },
    peerbubble : {  // bubble all color of current friend,who you chat with
        peerbubbleBackgroundColor: undefined,
        peerbubbleColor: undefined
    },
    friendlist : { // default all color of friends list ,execpt hover
        friendlistBackgroundColor: 'white',
        friendlistColor: 'black'
    },
    isopentransition : false,// animotion of transistion 
    loadFriendsList : () => { }, //load all data of your friends
    showChatWindow : (username, bubbleFrameEle) => { // prepare to load your friend-data to the window
    }, 
    waitDivshow : { //dot of waiting
    isShow: true,
    begin: () => { document.getElementsByClassName('move')[0].style.display : 'block' },//shown
    end: () => { document.getElementsByClassName('move')[0].style.display : 'none' } }// hidden
})
```
> # **NodeJs** 
-  Use grammar ES6 at latest,node version -v14.8

- just node  ```start.js```

- all route in directory named controllers

- file ```"./myNodeTest/data"``` is sqlite3 for test

>regular the format of  data
```ts
let sigleChat= { 
    applyuser: string,
    sendData: { 
        username: string,
        content: string,
        date: string|number,
        isread:number 
    }
}
```
># **Electron**

- build for chat ,for easy test. electron version -v10.1.1

- thus eletron 
 dependencise in package.json
```json
"dependencies": {
    "atob": "^2.1.2",
    "btoa": "^1.2.1",
    "electron": "^10.1.1",
    "node": "^14.8.0",
    "sqlite3": "^5.0.0",
    "typescript": "^4.0.2"
  }
```