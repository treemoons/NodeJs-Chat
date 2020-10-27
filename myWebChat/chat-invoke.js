import {
    initialFrameTheme,
    frame,
    friendFocus,
    textArea,
    getfriendid,
    keypressEnter,
    selectFile
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

search.searchtext.onkeydown = function (e) {
    keypressEnter(e, searchfriend, this)
}
// search.icon.onclick = e => searchfriend(this);
document.querySelector('.search .icon').onclick = e => {
    searchfriend(search.searchtext)
}

/**
 * 
 * @param {HTMLInputElement} ele 
 */
function searchfriend(ele) {
    // search friends by input-text
    alert('a');
    ele.value = '';
}


/**
 * 每一个input的file都对应files是多个文件，必须使用files[0]来设置和获取单个文件属性
 * 可以在标签中使用multiple多选
 *  accept="image/jpeg,image/png,image/gif" 类型
 * @type {HTMLInputElement} 
 */
let pic = fileform.filepic;
pic.onchange = selectFile;