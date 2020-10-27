import {
    changeTransition,
    chatdatawindow,
    getAjaxData,
    default as BuildFrame,
    getfriendid as getfriendId
} from './chat-frame.js';
/**要操作的目标元素
 * @type {HTMLElement}*/
var aimOfContextMenu;
/**@type {BuildFrame} */
export let frame = new BuildFrame('treemoons', '../../peerpic.jpg');
/**@type {HTMLElement}*/
export var friendFocus;
/**@type {HTMLInputElement}*/
export let textArea = document.getElementById('pretext');
export let getfriendid = getfriendId;
window.frame = frame;
/**
 * 获取聊天中的图片
 * @param {string} chattext 
 */
export function getChatImg(chattext) {
    let reg = /<img.[^>]*src="(.[^"]*).[^>]*>/gi;
    let match = chattext.match(reg);
    return match == null ? undefined : match;
}

let sendimg = {
    data: undefined,
    datainfo: undefined,
}



/**
 * input/type='file' 中onchange事件
 * @param {Event} e 
 */
export async function selectFile(e) {
    let username;
    let peername = getfriendId(friendFocus);
    for (let i = 0; i < this.files.length; i++) {
        /** @type {File} */
        let file = this.files[i];
        let filedata = await file.arrayBuffer();
        // let text = await file.text();
        let blob = new Blob([filedata]);
        let blobscr = URL.createObjectURL(blob);
        let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
        /**@type { {usertopeer: string|'username-peername', fileExtension: string|'gif',filesize: number,date:string}} */
        let datainfo = {
            usertopeer: `${username}-${peername}`,
            fileExtension: fileExtension,
            filesize: file.size,
            date: new Date().formatDate('yyyyMMddHHmmssf')
        }
        let l = new FileReader();
        let isOrigin;
        debugger
        /**@type {HTMLImageElement} */
        let img = document.getElementById('canvasimg');
        img.src = blobscr;
        let textimg = document.createElement('img');
        textimg.width = 200;
        switch ((isOrigin ? true : fileExtension)) {
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'jfif':
            case 'pjpeg':
            case 'pjp':
                let can = document.createElement('canvas');
                let context = can.getContext('2d');
                img.onload = function () {
                    can.width = this.width;
                    can.height = this.height;
                    context.drawImage(img, 0, 0, this.width, this.height);
                    can.toBlob( /**@param {Blob} d*/ async d => {
                        debugger;
                        l.readAsArrayBuffer(d);
                        l.onload = function () {
                            datainfo.filesize = l.result.byteLength;
                            textimg.src = URL.createObjectURL(d);
                            textArea.append(textimg);
                            // let formdata = new FormData();
                            // formdata.append(file.name, datas);
                            // console.log(formdata)
                            // console.log(datas)
                            frame.imgsinfo.push({ imgelement: textimg, imgfile: { data: l.result, datainfo: datainfo } });
                        }
                    });
                }
                break;
            default:
                textimg.src = blobscr;
                textArea.append(textimg);
                frame.imgsinfo.push({ imgelement: textimg, imgfile: { data: filedata, datainfo: datainfo } });
                break;
        }
    }
}

/**
 * 
 * @param {Event} e 
 * @param {(e:HTMLElement)=>void} callback 
 */
export function keypressEnter(e, callback, obj) {
    if (e.key) {
        let characterCode = e.key;
        if (characterCode == 'Enter') {
            e.preventDefault()
            callback(obj);
        }
    }
}

/**
 * 调用context-menu显示在指定元素上
 * @param {{contextMenuClassNameOrId:string, 
 * contextMenuItems:{args:[string,Function]},
 * aimAreaElements:HTMLElement|HTMLCollectionOf<HTMLElement>, 
 * style:{items:string,itemsHover:string,contextMenu:string,customize:string}}} param0 
 */
export function contextMenu({
    contextMenuClassNameOrId = 'context-menu',
    contextMenuItems = {
        copy: ['复制', function (e) {
            this.innerHTML = `<textarea readonly>${aimOfContextMenu.innerText}</textarea>`;
            // console.log(aimOfContextMenu.innerText);
            this.children[0].select();
            document.execCommand('copy');
            console.log(this.children[0].value)
            this.innerHTML = contextMenuItems.copy[0];
        }]
    },
    aimAreaElements = document.getElementsByClassName('user-chat-bubble'),
    style = {
        items: undefined,
        itemsHover: undefined,
        contextMenu: undefined,
        customize: undefined
    }
} = {}) {
    let styleEle = document.createElement('style');
    styleEle.id = 'style';
    styleEle.innerHTML = `
                .${contextMenuClassNameOrId}>div {
                    margin: 2px auto;
                    padding: 10px 40px;
                    ${style.items}
                }

                .${contextMenuClassNameOrId}>div:hover {
                    background-color: rgb(233, 233, 233);
                    ${style.itemsHover}
                }

                .${contextMenuClassNameOrId} {
                    z-index: 9;
                    box-shadow: 1px 5px 12px rgba(0, 0, 0, 0.198);
                    overflow: hidden;
                    display: none;
                    border-radius: 5px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 200px;
                    background-color: rgb(253, 253, 253);
                    transition: all 0.5s ease;
                    opacity: 0;
                    ${style.contextMenu}
                }
                ${style.customize}`;

    if (document.getElementById(styleEle.id)) {
        document.head.removeChild(document.getElementById(styleEle.id));
    }
    document.head.appendChild(styleEle);

    if (document.getElementById(contextMenuClassNameOrId)) {
        document.body.removeChild(document.getElementById(contextMenuClassNameOrId));
    }
    let contextMenu = document.createElement('div');
    contextMenu.className = contextMenuClassNameOrId;
    contextMenu.id = contextMenuClassNameOrId;
    contextMenu.innerHTML = '';
    document.body.appendChild(contextMenu);

    function setContextMenuosition(e) {
        aimOfContextMenu = this;
        e.preventDefault();
        contextMenu.style.display = 'block';
        setTimeout(() => {
            contextMenu.style.opacity = 1;
        }, 20);
        if (document.body.clientWidth - e.clientX < getComputedStyle(contextMenu).width.replace('px', '')
            .trim()) {
            contextMenu.style.left = e.clientX - getComputedStyle(contextMenu).width.replace('px', '')
                .trim() + 'px';
        } else {
            contextMenu.style.left = e.clientX + 'px';
        }
        let s = document.documentElement.scrollTop || document.body.scrollTop
        if (innerHeight - e.clientY < getComputedStyle(contextMenu).height.replace('px', '').trim()) {
            contextMenu.style.top = e.clientY + s - getComputedStyle(contextMenu).height.replace('px', '')
                .trim() + 'px';
        } else
            contextMenu.style.top = e.clientY + s + 'px';
    }
    for (let i = 0; i < aimAreaElements.length; i++) {
        aimAreaElements[i].oncontextmenu = setContextMenuosition;
    }

    for (let item in contextMenuItems) {
        contextMenu.innerHTML += `<div id='${item}'>${contextMenuItems[item][0]}</div>`;
    }

    for (let item in contextMenuItems) {
        document.getElementById(item).onclick = contextMenuItems[item][1];
        document.getElementById(item)
    }

    onclick = function () {
        if (contextMenu.style.display == 'block') {
            contextMenu.style.opacity = 0;
            setTimeout(function () {
                contextMenu.style.display = 'none';
            }, 500);
        }
    }
};

/** 初始化加载数据 */
export function initialFrameTheme({
    chat = document.querySelector('.chat'),
    listsFrame = document.querySelector('.chat-list .friends-frame'),
    chatwindowFrame = chatdatawindow.parentElement,
    focusfriend = {
        focusColor: '#000',
        focusBackground: 'white',
        focusBorderColor: 'rgb(180,180,180)'
    },
    userbubble = {
        userbubbleColor: undefined,
        userbubbleBackgroundColor: undefined
    },
    peerbubble = {
        peerbubbleColor: undefined,
        peerbubbleBackgroundColor: undefined
    },
    friendlist = {
        friendlistColor: undefined,
        friendlistBackgroundColor: undefined
    },
    friendlisthover = {
        friendlisthoverColor: undefined,
        friendlisthoverBackgroundColor: undefined
    },
    // loadFriendsList =/**@param {BuildFrame} chatframe*/ chatframe => chatframe.initializaingfriendlist(),
    showChatWindow = (peername) => {
        frame.showFrame(peername);
        contextMenu();
    },
    isopentransition = false,
    waitDivshow = {
        isShow: true,
        begin: () => {
            document.querySelector('.move').style.display = 'block'
        },
        end: () => {
            document.querySelector('.move').style.display = 'none'
        }
    }
} = {}) {
    changeTransition(isopentransition);
    let styleEle = document.createElement("style");
    styleEle.id = 'style';
    let style = document.getElementById('style');
    if (!style) {
        document.head.appendChild(styleEle);
        style = document.getElementById('style');
    }
    if (userbubble)
        if (style.innerHTML) {
            style.innerHTML = '';
        }
    style.innerHTML += `
            .user-speak .user-chat-bubble {
                color:${userbubble.userbubbleColor};
                background-color: ${userbubble.userbubbleBackgroundColor};
            }
            .user-speak .user-chat-bubble::after {
                border-left-color: ${userbubble.userbubbleBackgroundColor};
            }`;
    // if (peerbubble)
    style.innerHTML += `
            .peer-speak .user-chat-bubble::before {
                border-right-color: ${peerbubble.peerbubbleBackgroundColor};
            }
            .peer-speak .user-chat-bubble {
                color:${peerbubble.peerbubbleColor};
                background-color: ${peerbubble.peerbubbleBackgroundColor};
                
            }`;
    // if (friendlist)
    style.innerHTML += `
            .friends-frame {
                color:${friendlist.friendlistColor};
                background-color: ${friendlist.friendlistBackgroundColor};
            }`;
    // if (friendlisthover)
    style.innerHTML += `
            .friends-list:hover {
                color:${friendlisthover.friendlisthoverColor};
                background-color: ${friendlisthover.friendlisthoverBackgroundColor};
            }`;
    frame.friendlistEle = listsFrame;
    /**@type {HTMLElement} */
    let a;
    // loadFriendsList(frame);
    frame.setonclickanimotion = () => {
        let lists = listsFrame.children;
        if (lists.length > 0) {
            for (let i = 0; i < lists.length; i++) {
                lists[i].onclick = function () {
                    let idname = getfriendid(this);
                    document.getElementById('titlename').innerText = idname
                    if (friendFocus) {
                        friendFocus.setAttribute('style', `background-color:none;`);
                    }
                    friendFocus = this;
                    this.setAttribute('style',
                        `background-color:${focusfriend.focusBackground};
                        color:${focusfriend.focusColor};
                        box-shadow: 0px 2px 4px 1px gainsboro;
                        margin-left: 3px;`
                    );
                    if (waitDivshow.isShow) {
                        waitDivshow.begin();
                    }
                    if (isopentransition) {
                        style.innerHTML += `
                        .user-speak,
                        .peer-speak {
                             opacity: 0;
                            }`;
                        if (chatwindowFrame.style.right == '0px') {
                            chatwindowFrame.setAttribute('style', 'right:150%;');
                            setTimeout(() => {
                                showChatWindow(idname);
                                chatwindowFrame.setAttribute('style', 'right:0px');
                            }, 300)
                        } else {
                            showChatWindow(idname);
                            chatwindowFrame.setAttribute('style', 'right:0px');
                        }
                    } else {
                        if (chatwindowFrame.style.right != '0px') {
                            chatwindowFrame.setAttribute('style', 'right:0px');
                        }
                        showChatWindow(idname);
                    }
                    this.children[0].style.opacity = '0';
                    if (waitDivshow.isShow) {
                        waitDivshow.end();
                    }
                }
            }
        } else {
            // no friend to talk to
        }

        textArea.onkeydown =
            /** @param {KeyboardEvent} e */
            function (e) {
                if (e.shiftKey && e.key == 'Enter') return;
                keypressEnter(e, sent, this);
            }
        document.querySelector('.chat-text-send-button').onclick = function (e) {
            sent(textArea);
            textArea.focus();
        };
    }
};

/**
 * 发送
 * @param {HTMLElement} obj 要发送的文本html元素
 */
function sent(obj) {
    if (obj.innerHTML) {
        try {
            let count = 0;
            let name = getfriendid(friendFocus);
            let date = parseFloat(new Date().formatDate('yyyyMMdd.HHmmss'))
            frame.bubblesFrame[name].pushChatData({
                iscurrentuser: true,
                content: textArea.innerHTML,
                date: date,
                isread: 1
            });
            let piecesChat = document.createElement('div');
            piecesChat.className = 'user-speak';
            piecesChat.innerHTML += `
                                <div class="sending" date="${date}"></div>
                                <div class="user-chat-bubble"><article>${textArea.innerHTML.replace('\n', '<br>')}</article></div>
                                <img src="${frame.userpic}"
                                    width="30" alt="${frame.username}">`;
            frame.sigleChat.append(piecesChat);
            chatdatawindow.scrolltoRelativePosition(piecesChat);
            /**@type {HTMLImageElement[]} */
            let contentEle = piecesChat.querySelectorAll('.user-chat-bubble img');
            if (frame.imgsinfo.length > 0)
                frame.imgsinfo.forEach(img => {
                    if (img.imgelement.parentElement) {
                        getAjaxData({
                            url: '',
                            httpheader: {
                                'Content-Type': 'multipart/form-data',
                                'datainfo': img.imgfile.datainfo,
                            },
                            data: img.imgfile.data,
                            success: d => {
                                contentEle[count].src = d; //从服务器获取图片链接
                                count++;
                                if (count == frame.imgsinfo.length) {

                                    frame.sendChatMessage(obj);
                                    obj.innerHTML = null;
                                    contextMenu();
                                }
                            }
                        })
                    }
                })
            else {
                frame.sendChatMessage(obj);
                obj.innerHTML = null;
                contextMenu();
            }
        } catch (e) {
            console.error(e)
        }
    } else {
        let tip = document.querySelector('.enter-empty');
        tip.style.display = 'block';
        setTimeout(() => {
            tip.style.display = 'none'
        }, 1000);
    }
}
/**
 * 当scrolltop==0继续向上滑动的事件处理;
 * @param {{action:(e:Event)=>void,tipText:string,
 * tipDealingText:string,tipClass:string,
 * tipDealingClass:string
 * }} /action格式:e=>{}
 */
HTMLElement.prototype.ScrollToTheTopUp = function ({
    action = (e, tip) => {
        tip.remove();
    },
    tipText = '更多',
    tipDealingText = '正在加载 ',
    tipClass = 'historytip',
    tipDealingClass = 'historyloading'
}) {
    // if (this.a===undefined)
    //     console.log(this.a)
    if (this.onwheel !== undefined)
        this.onwheel = gethistorydata;
    else if (this.onmousewheel !== undefined)
        this.onmousewheel = gethistorydata;
    else
        this.addEventListener('DOMMouseScroll', gethistorydata)
    /** 获取历史数据的滚动ui交互
    @param {WheelEvent} e*/
    function gethistorydata(e) {
        if (this.scrollTop === 0 && (e.wheelDelta > 0 || e.detail < 0)) {
            let tipchild = this?.children[0];
            if (tipchild?.getAttribute('class') == tipClass) {
                tipchild.innerText = tipDealingText;
                tipchild.className = tipDealingClass;
                action(e, tipchild);
            } else if (this?.children[0]?.getAttribute('class') == tipDealingClass) {
                return;
            } else {
                let tip = document.createElement('p');
                tip.innerText = tipText;
                tip.className = tipClass;
                this.prepend(tip);
                setTimeout(() => {
                    if (tip?.getAttribute('class') == tipClass)
                        tip.remove();
                }, 500);
            }
        }
    }
}

var search = document.getElementById('search');
export function resendmessage() {
    let resendeles = document.querySelectorAll('.chat-data .resend');
    if (resendeles) {
        resendeles.forEach(ele => {
            ele.onclick = function (e) {
                this.className = 'sending';
                this.innerText = '';
                let content = this.parentElement.children[1].innerHTML;
                frame.resent(this, friendFocus, content)
            }
        })
    }
}



// window.addEventListener("keydown", function (e) {
//     // if (e.code = "ArrowDown")
//         search.value = e.key;
// })

// function test() {
//     let chat = document.getElementsByClassName('chat-data')[0];
//     let div = document.createElement('div');
//     div.className = 'user-speak';
//     div.innerHTML = `     <div class="user-chat-bubble">不是的，就是你手上还有还有推文没做完然后呢，你
//                                     是周一你是上周五提的，你把他以为周一就可以走了，
//                                     然后周一呢，他又给你安排新的东西，你上周累计的东
//                                     西没有干完，然后又来了新的东西就这样就无限循环，
//                                     就只要你在这儿永远都走不掉知道吧。不是的，就是你手上还有还有推文没做完然后呢，你
//                                     是周一你是上周五提的，你把他以为周一就可以走了，
//                                     然后周一呢，他又给你安排新的东西，你上周累计的东
//                                     西没有干完，然后又来了新的东西就这样就无限循环，
//                                     就只要你在这儿永远都走不掉知道吧。不是的，就是你手上还有还有推文没做完然后呢，你
//                                     是周一你是上周五提的，你把他以为周一就可以走了，
//                                     然后周一呢，他又给你安排新的东西，你上周累计的东
//                                     西没有干完，然后又来了新的东西就这样就无限循环，
//                                     就只要你在这儿永远都走不掉知道吧。
//                                 </div>
//                                 <img src="http://r.photo.store.qq.com/psc?/V11J2BXr3TLcNh/WUyRLVwskOVTItG8F0x768kqwQGsBKB6K*vun3EpaRrxraAToqleVUi8rha8n48QpW8DFgjG*mhu04tM*0rYOTbOc2wthnVNuula.NHIJR0!/r"
//                                     width="30" alt="">
//                             `
//     chat.prepend(div, div)
// }