//栈
class Stack {
    // 声明私有变量
    constructor() {
        // 保存栈内的元素
        this._items = [];
    }

    push(e) {
        this._items.push(e);
    }

    pop() {
        this._items.pop();
    }

    peek() {
        return this._items[length - 1];
    }

    isEmpty() {
        return this._items.length == 0;
    }

    clear() {
        this._items = [];
    }

    print() {
        console.log(this._items.toString());
    }
}

//使用symbol类实现作用域的限定
/*let _items = new Symbol();
class newStack{
    constructor(){
        //初始化_items
        this[_items] = [];
    }
    //其他方法

    // 使用Object.getOwnPropertySymbols()会破坏_items的私有性
}*/

//闭包
//将匿名函数赋值给newStack并立刻调用
let newStack = (function () {
    //使用weakMap实现类
    const _items = new WeakMap()
    //weakMap 可以储存K-V，k可以是对象，V可以是任何数据结构
    class newStack {
        constructor() {
            _items.set(this, []);//this指向自己本身
        }
        push(e) {
            let k = _items.get(this);//从weakMap中取值
            k.push(e);
        }

        pop() {
            let k = _items.get(this);
            return k.pop();
        }
        print() {
            let k = _items.get(this);
            console.log(k.toString());
        }
        //其他方法
    }
    return newStack;
})();