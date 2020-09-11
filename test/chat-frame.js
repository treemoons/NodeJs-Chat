"use strict";
Date.prototype.formatDate = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "f": this.getMilliseconds()
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
var ChatDataSigleList = (function () {
    function ChatDataSigleList(name, pic) {
        var _this = this;
        this.pushChatData = function (peer) {
            var data = _this.chatdata;
            data === null || data === void 0 ? void 0 : data.push(peer);
            _this.lastSpeak = data === null || data === void 0 ? void 0 : data[data.length - 1];
        };
        this.chatdata = [];
        this.username = name;
        this.userpic = pic;
    }
    return ChatDataSigleList;
}());
var objectTest = {
    thisIsATypescriptTestFrunction: function (test) {
        console.log(test);
    }
};
objectTest.thisIsATypescriptTestFrunction('');
var ChatData = (function () {
    function ChatData(_a) {
        var iscurrentuser = _a.iscurrentuser, content = _a.content, date = _a.date;
        this.iscurrentuser = iscurrentuser;
        this.content = content;
        this.date = date;
    }
    return ChatData;
}());
var BuildBubblesFrame = (function () {
    function BuildBubblesFrame(bubblesFrame, parentEle) {
        var _this = this;
        this.showFrame = function (peername) {
            try {
                _this.updateFrame(_this.chatDataLists);
            }
            catch (e) { }
            finally {
                _this.sigleChat.innerHTML = '';
                var frame = _this.bubblesFrame[peername];
                var data = frame.chatdata;
                var name_1 = frame.username;
                var pic = frame.userpic;
                for (var i = 0; i < data.length - 1; i++) {
                    if (new Date().formatDate('yyyyMMdd.HHmmss') > data[i].date + 1) {
                    }
                    else if (new Date().formatDate('yyyyMMdd.HHmmss') > data[i].date) {
                    }
                    else {
                    }
                    if (data.iscurrentuser) {
                        _this.sigleChat.innerHTML += "<div class=\"user-speak\">\n                                <div class=\"user-chat-bubble\">" + data[i].content + "</div>\n                                <img src=\"" + pic + "\"\n                                    width=\"30\" alt=\"" + name_1 + "\">\n                            </div>";
                    }
                    else {
                        _this.sigleChat.innerHTML += "<div class=\"peer-speak\">\n                                <img src=\"" + pic + "\"\n                                    width=\"30\" alt=\"" + name_1 + "\">\n                                <div class=\"user-chat-bubble\">" + data[i].content + "</div>\n                                <div class=\"resend\">\u91CD\u53D1</div>\n                            </div>";
                    }
                }
            }
        };
        this.updateFrame = function (bubblesFrame) {
            var bubbles = {};
            for (var i = 0; i < bubblesFrame.length - 1; i++) {
                var name_2 = bubblesFrame[i].username;
                bubbles[name_2] = bubblesFrame[i];
            }
            _this.bubblesFrame = bubbles;
            _this.chatDataLists = bubblesFrame;
        };
        this.sendChatMessage = function (name, data) {
            try {
                _this.bubblesFrame[name].pushChatData(new ChatData({ iscurrentuser: true, content: data, date: new Date().formatDate('yyyyMMdd.HHmmss') }));
                _this.sigleChat.innerHTML += "<div class=\"user-speak\">\n                                <div class=\"sending\"></div>\n                                <div class=\"user-chat-bubble\">" + data + "</div>\n                                <img src=\"" + loginUser.userpic + "\"\n                                    width=\"30\" alt=\"" + loginUser.userpic + "\">\n                            </div>";
                var dealResult = false;
                if (dealResult) {
                    var resend = _this.sigleChat.children[0].children[0];
                    resend.innerHTML = '重发';
                    resend.className = 'resend';
                }
                else {
                    _this.sigleChat.children[0].children[0].remove();
                }
            }
            catch (_a) { }
        };
        this.updateFrame(bubblesFrame);
        this.chatDataLists = bubblesFrame;
        this.sigleChat = parentEle;
    }
    return BuildBubblesFrame;
}());
var loginUser;
var Chat = (function () {
    function Chat() {
        this.chatTitleData = [];
        this.chatUserList = [];
        this.chatPic = [];
    }
    Chat.prototype.initilDataToMemory = function () {
        throw new Error("Method not implemented.");
    };
    Chat.prototype.getAllNetChatData = function (url) {
        throw new Error("Method not implemented.");
    };
    Chat.prototype.syncAllNetToLocal = function () {
        throw new Error("Method not implemented.");
    };
    Chat.prototype.getAllLocalChatData = function () {
        throw new Error("Method not implemented.");
    };
    Chat.prototype.getChatData = function (name, pages) {
        throw new Error("Method not implemented.");
    };
    Chat.prototype.getAllChatData = function (url) {
        return [];
    };
    ;
    return Chat;
}());
var Interactive = (function () {
    function Interactive() {
    }
    return Interactive;
}());
console.log(typeof Interactive);
