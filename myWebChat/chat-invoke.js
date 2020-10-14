
import {
    initialFrameTheme,
    frame,
    friendFocus,
    textArea,
    getfriendid, ajax
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


/**
 * 每一个input的file都对应files是多个文件，必须使用files[0]来设置和获取单个文件属性
 * 可以在标签中使用multiple多选
 *  accept="image/jpeg,image/png,image/gif" 类型
 * @type {HTMLInputElement} 
 */
let pic = fileform.filepic;
pic.onchange = async function (e) {
    console.log(this.files);
    /**
     * @type {FileList[0]}
     */
    let file = this.files[0];
    let datas = await file.arrayBuffer();
    let text = await file.text();
    let blob = new Blob([datas]);
    let l = new FileReader();
    let can = document.createElement('canvas');
    let context = can.getContext('2d');
    let img = new Image(200, 200);
    img.src = URL.createObjectURL(blob);
    context.drawImage(img, 200, 200);
    console.log(img.src)
    can.toBlob(/**@param {Blob} d*/async d => {
        let buf = await d.arrayBuffer();
        l.readAsDataURL(d)
        l.onload = function (e) {

            textArea.innerHTML += `<img src="${l.result}" width="20" height="20" alt="">`
            // let formdata = new FormData();
            // formdata.append(file.name, datas);
            // console.log(formdata)
            console.log(datas)
            ajax(
                {
                    url: 'http://localhost:8888/api/test1',
                    data: l.result,
                    // httptype:'text/plian;charset=utf-8',
                    success: d => {
                        console.log(d)
                    }
                }


            )
        }
    });
}
