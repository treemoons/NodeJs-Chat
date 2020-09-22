import {
    initialFrameTheme,
    frame,
    friendFocus,
    textArea,
    getfriendid
} from "./js/ui-builder.js";

/** 初始化加载数据 */
initialFrameTheme({
    isopentransition: false
    // showChatWindow: (user, ele) => {
    //     //  document.getElementsByClassName('chat-data')[0].scrolltoRelativePosition(document.getElementsByClassName('peer-speak')[1])

    // }
    // ,
});

/** 向上滚动查看历史记录 */
document.querySelector('.chat-data-frame>.chat-data').ScrollToTheTopUp({
    /**@param {WheelEvent} e */
    action: (e, tip) => {
        frame.backChatHistory(getfriendid(friendFocus), 10, tip)
        textArea.innerText = e.offsetY;
    }
});