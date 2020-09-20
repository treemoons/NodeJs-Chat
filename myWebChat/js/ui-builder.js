
import BuildFrame from './chat-frame.js';
/**要操作的目标元素
 * @type {HTMLElement}*/
var aimOfContextMenu;
/**@type {BuildFrame} */
let frame = new BuildFrame('treemoons', '../../peerpic.jpg', document.getElementsByClassName('chat-data')[0]);
/**@type {HTMLElement}*/
var friendFocus;
window.frame = frame;

/**
 * 调用context-menu显示在指定元素上
 * @param {{contextMenuClassName:string, 
 * contextMenuItems:{args:[string,Function]},
 * aimAreaElements:HTMLElement|HTMLCollectionOf<HTMLElement>, 
 * style:{items:string,itemsHover:string,contextMenu:string,customize:string}}} param0 
 */
function contextMenu({
    contextMenuClassName = 'context-menu',
    contextMenuItems = {
        copy: ['复制', function (e) {
            this.innerHTML = `<textarea readonly>${aimOfContextMenu.innerText}</textarea>`;
            console.log(aimOfContextMenu.innerText);
            this.children[0].select();
            document.execCommand('copy');
            console.log(this.children[0].value)
            this.innerHTML = contextMenuItems.copy[0];
        }],
        del: ['删除', function (e) { }]
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
    styleEle.innerHTML = `
                .${contextMenuClassName}>div {
                    margin: 2px auto;
                    padding: 10px 40px;
                    ${style.items}
                }

                .${contextMenuClassName}>div:hover {
                    background-color: rgb(233, 233, 233);
                    ${style.itemsHover}
                }

                .${contextMenuClassName} {
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
                }${style.customize}`;
    document.head.appendChild(styleEle);

    let contentMenu = document.createElement('div');
    contentMenu.className = contextMenuClassName;
    document.body.appendChild(contentMenu);

    function setContextMenuosition(e) {
        e.preventDefault();
        aimOfContextMenu = this;
        contentMenu.style.display = 'block';
        setTimeout(() => {
            contentMenu.style.opacity = 1;
        }, 20);
        if (document.body.clientWidth - e.clientX < getComputedStyle(contentMenu).width.replace('px', '')
            .trim()) {
            contentMenu.style.left = e.clientX - getComputedStyle(contentMenu).width.replace('px', '')
                .trim() + 'px';
        } else {
            contentMenu.style.left = e.clientX + 'px';
        }
        let s = document.documentElement.scrollTop || document.body.scrollTop
        if (innerHeight - e.clientY < getComputedStyle(contentMenu).height.replace('px', '').trim()) {
            contentMenu.style.top = e.clientY + s - getComputedStyle(contentMenu).height.replace('px', '')
                .trim() + 'px';
        } else
            contentMenu.style.top = e.clientY + s + 'px';
    }
    if (aimAreaElements.length > 1) {

        for (let i = 0; i < aimAreaElements.length; i++) {
            aimAreaElements[i].oncontextmenu = setContextMenuosition;
        }
    } else {
        aimAreaElements.oncontextmenu = setContextMenuosition;
    }
    for (let item in contextMenuItems) {
        contentMenu.innerHTML += `<div id='${item}'>${contextMenuItems[item][0]}</div>`;
    }

    for (let item in contextMenuItems) {
        document.getElementById(item).onclick = contextMenuItems[item][1];
    }

    onclick = function () {
        if (contentMenu.style.display == 'block') {
            contentMenu.style.opacity = 0;
            setTimeout(function () {
                contentMenu.style.display = 'none';
            }, 500);
        }
    }
};

function initialFrameTheme({
    chat = document.getElementsByClassName('chat')[0],
    listsFrame = document.querySelector('.chat-list .friends-frame'),
    chatDataWindow = document.querySelector('.chat-content-frame .chat-data-frame'),
    focusfriend = {
        focusBackground: 'plum',
        focusColor: 'white'
    },
    userbubble = {
        userbubbleColor: undefined,
        userbubbleBackgroundColor: undefined
    },
    peerbubble = {
        peerbubbleBackgroundColor: undefined,
        peerbubbleColor: undefined
    },
    friendlist = {
        friendlistBackgroundColor: 'white',
        friendlistColor: 'black'
    },
    friendlisthover = {
        friendlisthoverColor: 'white',
        friendlisthoverBackgroundColor: 'gray'
    },
    isopentransition = false,

    // loadFriendsList =/**@param {BuildFrame} chatframe*/ chatframe => chatframe.initializaingfriendlist(),
    showChatWindow = peername => frame.showFrame(peername),
    waitDivshow = {
        isShow: true,
        begin: () => { document.querySelector('.move').style.display = 'block' },
        end: () => { document.querySelector('.move').style.display = 'none' }
    }
} = {}) {
    let styleEle = document.createElement("style");
    styleEle.id = 'style';
    let style = document.getElementById('style');
    if (style == undefined) {
        document.head.appendChild(styleEle);
        style = document.getElementById('style');
    }
    if (userbubble != undefined)
        if (style.innerHTML == null | undefined) {
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
    if (peerbubble != undefined)
        style.innerHTML += `
            .peer-speak .user-chat-bubble::before {
                border-right-color: ${peerbubble.peerbubbleBackgroundColor};
            }
            .peer-speak .user-chat-bubble {
                color:${peerbubble.peerbubbleColor};
                background-color: ${peerbubble.peerbubbleBackgroundColor};
                
            }`;
    if (friendlist != undefined)
        style.innerHTML += `
            .friends-frame {
                color:${friendlist.friendlistColor};
                background-color: ${friendlist.friendlistBackgroundColor};
            }`;
    if (friendlisthover != undefined)
        style.innerHTML += `
            .friends-list:hover {
                color:${friendlisthover.friendlisthoverColor};
                background-color: ${friendlisthover.friendlisthoverBackgroundColor};
            }`;
    frame.friendlistEle = listsFrame;
    // loadFriendsList(frame);
    let lists = listsFrame.children;
    frame.setonclickanimotion = () => {

        if (lists.length > 0) {
            for (let i = 0; i < lists.length; i++) {
                lists[i].onclick = function () {
                    let title = document.getElementById('titlename');
                    title.innerText = this.innerText
                    if (friendFocus != undefined) {
                        friendFocus.setAttribute('style', `background-color:none;`);
                    }
                    this.setAttribute('style',
                        `background-color:${focusfriend.focusBackground};color:${focusfriend.focusColor}`
                    );
                    if (waitDivshow.isShow) {
                        waitDivshow.begin();
                    }
                    debugger
                    if (isopentransition) {

                        if (chatDataWindow.style.right == '0px') {
                            chatDataWindow.setAttribute('style', 'right:150%;');
                            setTimeout(() => {
                                showChatWindow(this.innerText);
                                chatDataWindow.setAttribute('style', 'right:0px');
                            }, 300)
                        } else {
                            showChatWindow(this.innerText);
                            chatDataWindow.setAttribute('style', 'right:0px');
                        }
                    } else {
                        if (chatDataWindow.style.right != '0px') {
                            chatDataWindow.setAttribute('style', 'right:0px');
                        }
                        showChatWindow(this.innerText);
                    }
                    if (waitDivshow.isShow) {
                        waitDivshow.end();
                    }
                    friendFocus = this;
                }
            }
        } else {
            // no friend to talk to
        }

        contextMenu();

    }
};
initialFrameTheme({
    isopentransition: true
    // showChatWindow: (user, ele) => {
    //     //  document.getElementsByClassName('chat-data')[0].scrolltoRelativePosition(document.getElementsByClassName('peer-speak')[1])

    // }
    // ,
});

/**
 * 当scrolltop==0继续向上滑动的事件处理;
 * @param {{action:(e:Event)=>void,tipText:string,
 * tipDealingText:string,tipClass:string,
 * tipDealingClass:string
 * }} /action格式:e=>{}
 */
HTMLElement.prototype.ScrollToTheTopUp = function ({ action = (e, tip) => {
    tip.remove();
},
    tipText = '更多', tipDealingText = '正在加载 ', tipClass = 'historytip', tipDealingClass = 'historyloading' }) {
    this.onmousewheel =
        /**
        @param {WheelEvent} e*/
        function (e) {
            if (this.scrollTop === 0 && (e.wheelDelta>0||e.detail>0)) {
                let tip = this?.children[0];
                if (tip?.getAttribute('class') == tipClass) {
                    tip.innerText = tipDealingText;
                    tip.className = tipDealingClass;
                    action(e, tip);
                } else if (this?.children[0]?.getAttribute('class') == tipDealingClass) {
                    return;
                } else {
                    let tip = document.createElement('p');
                    tip.innerText = tipText;
                    tip.className = tipClass;
                    this.prepend(tip);
                }
            }
        }
}
document.querySelector('.chat-data-frame>.chat-data').ScrollToTheTopUp({
    /**@param {WheelEvent} e */
    action: (e, tip) => {
        frame.backChatHistory(document.getElementById('titlename').innerText, 10, tip)
        document.getElementById('text').innerText = e.offsetY;
    }
})

var search = document.getElementById('search');
/**
 * 
 * @param {KeyboardEvent} e 
 */
onkeypress = function (e) {
    if (e.key) {
        characterCode = e.key;
        if (characterCode == 'Enter')
            search.value = characterCode
    }
}
// window.addEventListener("keydown", function (e) {
//     // if (e.code = "ArrowDown")
//         search.value = e.key;
// })

function test() {
    let chat = document.getElementsByClassName('chat-data')[0];
    let div = document.createElement('div');
    div.className = 'user-speak';
    div.innerHTML = `     <div class="user-chat-bubble">不是的，就是你手上还有还有推文没做完然后呢，你
                                    是周一你是上周五提的，你把他以为周一就可以走了，
                                    然后周一呢，他又给你安排新的东西，你上周累计的东
                                    西没有干完，然后又来了新的东西就这样就无限循环，
                                    就只要你在这儿永远都走不掉知道吧。不是的，就是你手上还有还有推文没做完然后呢，你
                                    是周一你是上周五提的，你把他以为周一就可以走了，
                                    然后周一呢，他又给你安排新的东西，你上周累计的东
                                    西没有干完，然后又来了新的东西就这样就无限循环，
                                    就只要你在这儿永远都走不掉知道吧。不是的，就是你手上还有还有推文没做完然后呢，你
                                    是周一你是上周五提的，你把他以为周一就可以走了，
                                    然后周一呢，他又给你安排新的东西，你上周累计的东
                                    西没有干完，然后又来了新的东西就这样就无限循环，
                                    就只要你在这儿永远都走不掉知道吧。
                                </div>
                                <img src="http://r.photo.store.qq.com/psc?/V11J2BXr3TLcNh/WUyRLVwskOVTItG8F0x768kqwQGsBKB6K*vun3EpaRrxraAToqleVUi8rha8n48QpW8DFgjG*mhu04tM*0rYOTbOc2wthnVNuula.NHIJR0!/r"
                                    width="30" alt="">
                            `
    chat.prepend(div, div)
}
