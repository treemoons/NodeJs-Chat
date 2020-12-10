import  sqlite from 'sqlite3';
const { Database } = sqlite;
var sqlite3 = new Database('./myNodeTest/data.db');
let data = { applyuser: 'apply', sendData: { username: 'name', content: "niha", date: 20200910.121822 } };
sqlite3.serialize(() => {
    // sqlite3.run(`INSERT INTO CHATDATA(USERNAME,PEERNAME,CONTENT,DATE) 
    //                             VALUES(?,?,?,?);`, [data.applyuser, data.sendData.username, data.sendData.content, data.sendData.date], (err) => {
    //     let msg = { status: 0, msg: undefined };
    //     if (err != undefined)
    //         msg.msg = err.message;
    //     else
    //         msg.status = 1;
    //     console.log(JSON.stringify(msg));
    // });
    sqlite3.all(`PRAGMA table_info('t_chat_data')`, (err, rows) => {
       
        if (err) {
        console.log('err:\n' + err);
        }
        rows.forEach(v => {
            console.log(v);
        })

    });
});
