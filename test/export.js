
Date.prototype.formatDate = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份           
    "d+": this.getDate(), //日           
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
    "H+": this.getHours(), //小时           
    "m+": this.getMinutes(), //分           
    "s+": this.getSeconds(), //秒           
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
    "f": this.getMilliseconds() //毫秒           
  };
  let week = {
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
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 
 * @param {string} formatString 
 * @param {string} format 
 */
function backToDate(formatString, format) {
  let date = new Date();
  console.log('date:',date)
  let o = {
    "y+|Y+": date.setFullYear, //月份    
    "M+": date.setMonth, //月份           
    "d+|D+": date.setDate, //日             
    "H+|h+": date.setHours, //小时           
    "m+": date.setMinutes, //分           
    "s+": date.setSeconds, //秒                    
    "f+": date.setMilliseconds //毫秒           
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      console.log('reg:', RegExp.$1)
      let length = RegExp.$1.length;
      let index = format.indexOf(RegExp.$1);
      let tempDate = formatString.substr(index, length);
      console.log('tempDate:', tempDate)
      if(k=='M+')
        o[k].call(date, parseInt(tempDate)-1)
      else
        o[k].call(date, parseInt(tempDate))
      console.log('----\n',date)
    }
  }
  return date;
}

console.log(backToDate('2010-12-22 12:22:33.12', 'yyyy-MM-dd hh:mm:ss.fff').formatDate('yyyy-MM-dd hh:mm:ss.f'))
