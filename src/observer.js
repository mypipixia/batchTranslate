//观察者-发布者模式

// 观察者
export class observer {
    constructor() {
        //储存订阅者
        this.Dep = {};
    }
    add(key, event) {
        !this.Dep.key && (this.Dep[key] = []);
        this.Dep[key].push(event)
    }
    notiy(key, attrs) {
        if (this.Dep[key] && this.Dep[key].length) {
            this.Dep[key].forEach((item) => {
                item(attrs)
            })
        }
    }
}

