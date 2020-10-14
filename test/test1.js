import { ajax } from "../myWebChat/js/ui-builder.js";



/**
 * 每一个input的file都对应files是多个文件，必须使用files[0]来设置和获取单个文件属性
 * 可以在标签中使用multiple多选
 *  accept="image/jpeg,image/png,image/gif" 类型
 * @type {HTMLInputElement} 
 */
let pic = fileform.filepic;
async function test(e) {
    console.log(pic.files);
    /**
     * @type {FileList[0]}
     */
    let file = pic.files[0];
    let datas = await file.arrayBuffer();
    let text = await file.text();
    let a = { 'Content-Type': 'multipart/form-data', 'Content-Type': 'text/plain' };
   for(let key in a){
       console.log(a[key])
   }
    console.log(file.size)
    console.log(datas)
    ajax({
        url: 'http://localhost:8888/api/test1',
        httpheader: { 'Content-Type':'multipart/form-data','test':'this is test header','accept':'image/png'},
        data: datas,
        success: d => {
            console.log(d)
        }

    })
    // c.lineWidth = "12";
    // c.strokeStyle = "red";
    // c.rect(100, 100, 300, 300); //矩形的方法
    // c.stroke(); //显示路径图像
    // //  c.closePath();
    // c.beginPath(); //创建新的图像路径
    // c.arc(500, 500, 300, -Math.PI, Math.PI / 2); //绘制圆的方法
    // c.stroke();
    // c.beginPath();
    // c.strokeRect(400, 400, 300, 300);//绘制并显示矩形
    let imgele = document.getElementsByTagName('img')[0]
    imgele.src = URL.createObjectURL(new Blob([datas]))

    // c.clearRect(0, 0, 300, 300)
    // img.onload = e => {

    //     c.drawImage(img, 0, 0, 300, 300);
    //     can.toBlob(async d => {

    //     })
    // }
    // console.log(img)


}
top.test = test;