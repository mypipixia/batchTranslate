//引入观察者
import { observer } from './observer'
import { initProxy } from './event'
import { MD5 } from './md5';
document.querySelector('.loadExort').addEventListener('click', () => {
    doing(LANG)
})

//下载用的json
let textResult = {};
//响应式的数据
let proxyObject = {}
//观察者实例
let obser;
//调用接口翻译
function dotranEn(q, key, isNeedone = false) {
    return new Promise((resolve) => {
        let salt = (new Date).getTime();
        var str1 = APPID + q + salt + KEY;
        var sign = MD5(str1);
        let startTime = Date.now()
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            async: false,
            data: {
                q: q,
                appid: APPID,
                salt: salt,
                from: FROM,
                to: TO,
                sign: sign
            },
            success: function (data) {
                proxyObject.tanNum++
                if (data.trans_result) {
                    let text = data.trans_result[0].dst
                    textResult[key] = text.replace(/@/g, '/');
                } else {
                    textResult[key] = null;
                    proxyObject.error = [...proxyObject.error, key]
                }
                //判断是否需要1秒执行一次
                if (isNeedone) {
                    timeOneSc(startTime, resolve)
                } else {
                    resolve()
                }
            }
        });
    })
}
//执行
async function doing(LANG) {
    textResult = {};
    let LANG_JSON = JSON.parse(JSON.stringify(LANG))
    let keys = Object.keys(LANG_JSON);
    obser = new observer()
    //响应式
    initProxy(proxyObject, { obser, length: keys.length });
    //把/正则为@符合，防止翻译的时候，接口自动切割
    keys.forEach((key) => {
        LANG_JSON[key] = LANG_JSON[key].replace(/\//g, '@')
    })
    //判断每一秒执行次数，如果为1次
    if (LOADNUM == 1) {
        for (let key in LANG_JSON) {
            await dotranEn(LANG_JSON[key], key, true);
        }
    } else {
        //使用for循环，让await生效
        let promiseList = [];
        let dindex = 0;
        let i = 0;
        //由于百度的接口一次最多只能同时调用10个
        for (let key in LANG_JSON) {
            promiseList.push(dotranEn(LANG_JSON[key], key))
            dindex++
            i++
            if (dindex < LOADNUM && i != keys.length) {
                continue
            }
            await promiseNum(promiseList)
            promiseList = [];
            dindex = 0;
        }
    }
    dowrite('export default ' + toStringD(textResult))
}

//下载js文件
function dowrite(text) {
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'text.js')
    element.style.display = 'none'
    element.click()
}

//对象转为字符，同时换行
function toStringD(obj) {
    let d = "{"
    Object.keys(obj).forEach((key) => {
        d = d + key + ':"' + obj[key] + '", //' + LANG[key] + '\n'
    })
    return d + '}'
}


//限制一秒执行次数
function promiseNum(promiseArr) {
    return new Promise((resolve) => {
        let startTime = Date.now()
        Promise.all(promiseArr).then(() => {
            timeOneSc(startTime, resolve)
        })
    })
}

function timeOneSc(startTime, resolve) {
    let endTime = Date.now();
    let allTime = endTime - startTime;
    if (allTime < 1100) {
        setTimeout(() => {
            resolve()
        }, 1100 - allTime);
    } else {
        resolve()
    }
}