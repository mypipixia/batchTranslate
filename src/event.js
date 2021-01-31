//执行数量
const KEY1 = 'tanNum';
//执行出错的key集合
const KEY2 = 'error'

//定义事件  -------- 策略模式
export const strategy = {
    [KEY1]: key1,
    [KEY2]: key2
}

/**
 * key1事件 数量
 * @param {*} value 现在执行的数量
 * @param {*} length //数组总长度
 */
function key1({ value, length }) {
    document.querySelector('.progress').style.color = 'black';
    document.querySelector('.progress').style.display = 'block';
    document.querySelector('.progress-num').innerText = value;
    document.querySelector('.progress-allnum').innerText = length;
    if (value == length) {
        document.querySelector('.progress').style.color = '#67C23A';
        setTimeout(() => {
            alert('执行完成');
        }, 1000);
    }
}
//key2事件 出错的key集合
function key2({ value }) {
    document.querySelector('.error').innerHTML = ''
    value.forEach((key) => {
        let li = document.createElement('li');
        li.innerText = `执行错误key: ${key}`
        document.querySelector('.error').appendChild(li);
    })

}


//响应式
export function initProxy(obj, { obser, length }) {
    let targetObject = {
        [KEY1]: 0,
        [KEY2]: []
    }
    Object.keys(targetObject).forEach((key) => {
        obser.add(key, strategy[key])
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return targetObject[key]
            },
            set(value) {
                obser.notiy(key, { value, length, key })
                return Reflect.set(targetObject, key, value);
            }
        })
    })
}


