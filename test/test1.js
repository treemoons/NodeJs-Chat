
const { Database } = require("sqlite3");
var sqlite3 = new Database('../myNodeTest/controllers/api/data');
let data = { applyuser: 'apply', sendData: { username: 'name', content: "niha", date: 20200910.121822 } }
sqlite3.serialize(() => {
    sqlite3.run(`INSERT INTO CHATDATA(USERNAME,PEERNAME,CONTENT,DATE) 
                                VALUES(?,?,?,?);`,
        [data.applyuser, data.sendData.username, data.sendData.content, data.sendData.date],
        err => {
            let msg = { status: 0, msg: undefined };
            if (err != undefined)
                msg.msg = err.message;
            else
                msg.status = 1;
            console.log(JSON.stringify(msg));
        });
    sqlite3.all('SELECT * FROM CHATDATA', (err, row) => {
        console.log(row)
    })
});
/**@type {HTMLCanvasElement} */
let canvas;
let context= canvas.getContext('2d');
