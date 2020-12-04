
using System;
using System.Security.AccessControl;
using System.Text.RegularExpressions;
using System.Collections.Generic;
MyStruct a;
a.testa = "ss";
System.Console.WriteLine(a.testa);

struct MyStruct
{
    public MyStruct(string a)
    {
        testa = a;
        System.Console.WriteLine(0.1+0.2);
    }
    public string testa;
    void ss()
    { xxx
        System.Console.WriteLine(
          0.3457654345678765432345678987654323456788m
        ==0.3457654345678765432345678988m);
          System.Text.RegularExpressions.Regex regex=new System.Text.RegularExpressions.Regex(@"\/\*[^*]*\*+([^\/*][^*]*\*+)*\/",System.Text.RegularExpressions.RegexOptions.IgnoreCase)
                ;string s = " /**/" +
"/*" +
" * 对话记录" +
" * <i>username和userpic为对方信息</i>" +
" ***/" +
"class ChatDataSigleList" +
"        {" +
"            /**  /**  * /" +
"             * @param {string} name 对方姓名" +
"             * @param {string} pic 对方头像" +
"             * @param {ChatData} data 对方头像" +
"            * */" +
"            constructor(name, pic, data)" +
"            {" +
"                this.peername = name;" +
"                this.peerpic = pic;" +
"                this.chatdata = data;" +
"            }" +
"            /**" +
"             * 添加一条记录" +
"             * @param {ChatData} peer 对话记录" +
"             */" +
"            pushChatData = ( /**他的话 ❤*/ peer) => {" +
"        let data = this.chatdata;" +
"            data.push(peer);" +
"        this.lastSpeak = data[data.length- 1];" +
"    }" +
"        /**" +
"         * @param {ChatData} peer 对话记录" +
"         */" +
"        getHistoryChat = (peer) => {" +
"        let data = this.chatdata;" +
"        data.unshift(peer);" +
"    }" +
"" +
"    /** 好友用户名 " +
"     * @type {string}*/" +
"    peername;" +
"" +
"    /** 好友头像 " +
"     * @type {string}" +
"     */" +
"    peerpic;" +
"" +
"    /**我们在一起的话❤" +
"     * @type {ChatData[]}" +
"     */" +
"    chatdata = [];" +
"" +
"    /**我们之间上一次的最后一句 " +
"     * @type {ChatData} ♥*/" +
"    lastSpeak;" +
"" +
"    /**当前是我在说话嘛 " +
"     * @type {boolean}" +
"     */" +
"    isMeSpeakNow;" +
"    /* @type {number} */" +
"    unreadCount = 0;" +
"};";
var result = regex.Matches(s);
foreach (var item in result)
{
    System.Console.WriteLine("------------------------------------------------");
    System.Console.WriteLine(item);
}

    }
}