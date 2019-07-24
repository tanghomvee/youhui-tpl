import {
    baseUrl
} from './env'

import loading from '../components/common/loading';
import axios from 'axios'
axios.defaults.baseURL = `/`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做些事
    return response.data ? response.data : response
  },
  function (error) {
    // 请求错误时做些事
    const err = error.response
    // return Promise.reject(err)
  }
)

/**
 * 封装request请求
 * @param {string} url
 * @param {object} param1
 */
export function request (url, { method, params, headers }) {
  switch (method) {
    case 'post':
      if (headers) {
        return params
          ? axios.post(url, params, { headers })
          : axios.post(url, { headers })
      } else {
        return params ? axios.post(url, params) : axios.post(url)
      }
    case 'put':
      if (headers) {
        return params
          ? axios.put(url, params, { headers })
          : axios.put(url, { headers })
      } else {
        return params ? axios.put(url, params) : axios.put(url)
      }
    case 'delete':
      if (headers) {
        return params
          ? axios.delete(url, { data: params }, { headers })
          : axios.delete(url, { headers })
      } else {
        return params ? axios.delete(url, { data: params }) : axios.delete(url)
      }
    case 'patch':
      return params ? axios.patch(url, params) : axios.patch(url)
    default:
      if (headers) {
        return params
          ? axios.get(url, { params: params, headers: headers })
          : axios.get(url, { headers })
      } else {
        return params
          ? axios.get(url, { params: { ...params } })
          : axios.get(url)
      }
  }
}

/**
 * 判断数据有效性
 */
export const isData=(data) =>{
        if(data != null && data != "" && data != '' && data != {} && data != "undefined") {
            return true;
        } else {
            return false;
        }
    }

/**
 * 获取sha签名方法
 */
export const getSHA1=() =>{
        return new SHA1();
    }

/**
 * 判断手机号码
 */
export const checkPhone=(pPhone) =>{
        pPhone = pPhone + "";
        pPhone = pPhone.replace(" ", "");
        if(!isData(pPhone) || pPhone <= 0) {
            return("手机号码不能为空!");
        } else {
            var phone = pPhone
            if(pPhone.indexOf("+86") >= 0) {
                phone = pPhone.split("+86")[1];
            }
            if(phone.length != 11) {
                return("请输入11位手机号码!");
            } else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))) {
                return("手机号码格式不正确");
            } else {
                return null;
            }
        }
    }

/**
 * 返回时间差  几小时前
 */
export const getDatePart=(d1) =>{
             //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd = new Date();//获取当前时间
        var curYear = dateEnd.getFullYear();
        var curMonth = dateEnd.getMonth() + 1;
        var curDay = dateEnd.getDate();
        var year = dateBegin.getFullYear();
        var month = dateBegin.getMonth() + 1;
        var day = dateBegin.getDate();
        var hour = dateBegin.getHours();
        console.log(month+"-----"+year)

        var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))//计算出小时数
        //计算相差分钟数
        var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        var result = "";
        if(year < curYear) {
            result = year + '年' + month + '月';
        } else if(month < curMonth) {
            result = month + '月' + day + '日 ';
        }else if (dayDiff>0) {
            result = dayDiff+"天前";
        }else if (hours>0) {
            if (hours<6) {
                result = hours+"小时前";
            } else {
                result = day+"日"+hour+"点";
            }
        }else if (minutes>0) {
            result = minutes+"分钟前";
        }
        console.log(result)
       return result;
    }

/**
 * 获取当前时间yyyy-mm-dd
 */
export const getNowFormatDate=() =>{
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

/**
 * 获取当前月份yyyy-mm
 */
export const getNowMonth=() =>{
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month;
        return currentdate;
    }
/**
 * 获取上个月
 */
export const lastMonthDate=(data) =>{
         //var Nowdate = new Date('2017-12-23'); //data为当前月的时间
         var Nowdate = new Date(data);
          var vYear = Nowdate.getFullYear();
          var vMon = Nowdate.getMonth() + 1;
          var vDay = Nowdate.getDate();
      　　//每个月的最后一天日期（为了使用月份便于查找，数组第一位设为0）
          var daysInMonth = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
          if(vMon==1){
              vYear = Nowdate.getFullYear()-1;
             vMon = 12;
         }else{
             vMon = vMon -1;
         }
     　　//若是闰年，二月最后一天是29号
         if(vYear%4 == 0 && vYear%100 != 0  || vYear%400 == 0 ){
             daysInMonth[2]= 29;
         }
         if(daysInMonth[vMon] < vDay){
             vDay = daysInMonth[vMon];
         }
         if(vDay<10){
             vDay="0"+vDay;
         }
         if(vMon<10){
             vMon="0"+vMon;
         }
         // var date =vYear+"-"+ vMon +"-"+vDay;
         var date =vYear+"-"+ vMon;
         console.log(date)
         return date;
    }

/**
 * 字符排序
 */
export const objKeySort = (obj) => {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//      console.log("obj==" + JSON.stringify(obj))
        var newkey = Object.keys(obj).sort();
        //创建一个字符串，用于存放排好序的字符串　　 
        var newStr = ""; 
        for(var i = 0; i < newkey.length; i++) { //遍历newkey数组
            // console.log(newkey[i] +"==="+obj[newkey[i]])
            if (obj[newkey[i]]==null||obj[newkey[i]]==undefined) {
                obj[newkey[i]] = ""; 
            }
            if(newStr.length == 0 && isData(obj[newkey[i]].toString())) {
                newStr += newkey[i] + "=" + obj[newkey[i]];
            } else if(isData(obj[newkey[i]].toString())) {//如果不转字符串等于0的会漏掉
                newStr += "&" + newkey[i] + "=" + obj[newkey[i]];
            } 
        } 
        newStr = newStr.replace(/\s+/g, ""); //去空
        return newStr;
}
/**
 * 加载等待 loading
 */
export const showLoading = (msg) => {
    loading.show(msg);
}
export const hideLoading = () => {
    loading.hide();
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") { 
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch(mode){
                case 'ease-out': 
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400; 
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch(mode){
                case 'ease-out': 
                    status = iCurrent != target[attr]; 
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr]; 
            }

            if (status) {
                flag = false; 
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}

function MD5() {
    var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase  */
    var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance */
    var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode  */
    var ddb_key = "ss#$%@!"; //点点邦加密需要拼接的密钥
    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    this.hex_md5 = function(s,key) {
        // console.log("key===" + key)
        if (isData(key)) {
            ddb_key = key;
        }else{
            ddb_key = "ss#$%@!";
        }
        s = s.replace(/\s+/g, ""); //去空
        s = s + ddb_key; //根据需求自己添加的代码，在需要加密的字符串后面拼接密钥
        console.log("s===" + s)
        s=this.tounicode(s);
        // console.log("tounicode===" + s)
        return this.binl2hex(this.core_md5(this.str2binl(s), s.length * chrsz));
    }
    this.hex_md52 = function(s,key) {
        console.log("key===" + key)
        if (Tools.isData(key)) {
            ddb_key = key;
        }else{
            ddb_key = "";
        }
        s = s + ddb_key; //根据需求自己添加的代码，在需要加密的字符串后面拼接密钥
        console.log("s===" + s)
        return this.binl2hex(this.core_md5(this.str2binl(s), s.length * chrsz));
    }
    //根据需求自己添加的代码 转换为unicode格式
    this.tounicode=function(data){ 
       if(data == '') return;
       var str =''; 
       for(var i=0;i<data.length;i++) 
       {
          str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
       }
       return str;  
    }

    this.b64_md5 = function(s) {
        return this.binl2b64(this.core_md5(this.str2binl(s), s.length * chrsz));
    }

    this.str_md5 = function(s) {
        return this.binl2str(this.core_md5(this.str2binl(s), s.length * chrsz));
    }

    this.hex_hmac_md5 = function(key, data) {
        return this.binl2hex(this.core_hmac_md5(key, data));
    }

    this.b64_hmac_md5 = function(key, data) {
        return this.binl2b64(this.core_hmac_md5(key, data));
    }

    this.str_hmac_md5 = function(key, data) {
        return this.binl2str(this.core_hmac_md5(key, data));
    }
    /*
     * Perform a simple self-test to see if the VM is working
     */
    this.md5_vm_test = function() {
        return this.hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
    }
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length
     */
    this.core_md5 = function(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for(var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }
    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    this.md5_cmn = function(q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    }

    this.md5_ff = function(a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    this.md5_gg = function(a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    this.md5_hh = function(a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    this.md5_ii = function(a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    /*
     * Calculate the HMAC-MD5, of a key and some data
     */
    this.core_hmac_md5 = function(key, data) {
        var bkey = this.str2binl(key);
        if(bkey.length > 16) bkey = this.core_md5(bkey, key.length * chrsz);
        var ipad = Array(16),
            opad = Array(16);
        for(var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.core_md5(ipad.concat(this.str2binl(data)), 512 + data.length * chrsz);
        return this.core_md5(opad.concat(hash), 512 + 128);
    }
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    this.safe_add = function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return(msw << 16) | (lsw & 0xFFFF);
    }
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    this.bit_rol = function(num, cnt) {
        return(num << cnt) | (num >>> (32 - cnt));
    }
    /*
     * Convert a string to an array of little-endian words
     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
     */
    this.str2binl = function(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin;
    }
    /*
     * Convert an array of little-endian words to a string
     */
    this.binl2str = function(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str;
    }
    /*
     * Convert an array of little-endian words to a hex string.
     */
    this.binl2hex = function(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }
    /*
     * Convert an array of little-endian words to a base-64 string
     */
    this.binl2b64 = function(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) |
                (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) |
                ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for(var j = 0; j < 4; j++) {
                if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    }
};

function SHA1() {
    var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase     */
    var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance  */
    var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode    */
    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    this.hex_sha1 = function(s) {
        return this.binb2hex(this.core_sha1(this.str2binb(s), s.length * chrsz));
    }

    this.b64_sha1 = function(s) {
        return this.binb2b64(this.core_sha1(this.str2binb(s), s.length * chrsz));
    }

    this.str_sha1 = function(s) {
        return this.binb2str(this.core_sha1(this.str2binb(s), s.length * chrsz));
    }

    this.hex_hmac_sha1 = function(key, data) {
        return this.binb2hex(this.core_hmac_sha1(key, data));
    }

    this.b64_hmac_sha1 = function(key, data) {
        return this.binb2b64(this.core_hmac_sha1(key, data));
    }

    this.str_hmac_sha1 = function(key, data) {
        return this.binb2str(this.core_hmac_sha1(key, data));
    }
    /*
     * Perform a simple self-test to see if the VM is working
     */
    this.sha1_vm_test = function() {
        return this.hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
    }
    /*
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     */
    this.core_sha1 = function(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;
        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;
        for(var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            var olde = e;
            for(var j = 0; j < 80; j++) {
                if(j < 16) w[j] = x[i + j];
                else w[j] = this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = this.safe_add(this.safe_add(this.rol(a, 5), this.sha1_ft(j, b, c, d)), this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));
                e = d;
                d = c;
                c = this.rol(b, 30);
                b = a;
                a = t;
            }
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
            e = this.safe_add(e, olde);
        }
        return Array(a, b, c, d, e);
    }
    /*
     * Perform the appropriate triplet combination function for the current
     * iteration
     */
    this.sha1_ft = function(t, b, c, d) {
        if(t < 20) return(b & c) | ((~b) & d);
        if(t < 40) return b ^ c ^ d;
        if(t < 60) return(b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    }
    /*
     * Determine the appropriate additive constant for the current iteration
     */
    this.sha1_kt = function(t) {
        return(t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
    }
    /*
     * Calculate the HMAC-SHA1 of a key and some data
     */
    this.core_hmac_sha1 = function(key, data) {
        var bkey = this.str2binb(key);
        if(bkey.length > 16) bkey = this.core_sha1(bkey, key.length * chrsz);
        var ipad = Array(16),
            opad = Array(16);
        for(var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.core_sha1(ipad.concat(this.str2binb(data)), 512 + data.length * chrsz);
        return this.core_sha1(opad.concat(hash), 512 + 160);
    }
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    this.safe_add = function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return(msw << 16) | (lsw & 0xFFFF);
    }
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    this.rol = function(num, cnt) {
        return(num << cnt) | (num >>> (32 - cnt));
    }
    /*
     * Convert an 8-bit or 16-bit string to an array of big-endian words
     * In 8-bit function, characters >255 have their hi-byte silently ignored.
     */
    this.str2binb = function(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        return bin;
    }
    /*
     * Convert an array of big-endian words to a string
     */
    this.binb2str = function(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
        return str;
    }
    /*
     * Convert an array of big-endian words to a hex string.
     */
    this.binb2hex = function(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
    /*
     * Convert an array of big-endian words to a base-64 string
     */
    this.binb2b64 = function(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
            for(var j = 0; j < 4; j++) {
                if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    }
};
