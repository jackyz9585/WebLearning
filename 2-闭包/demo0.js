// 闭包是一种能够访问另一个函数作用域中变量的函数
// 使用在函数内嵌套另一个函数来实现

// 当一个函数被执行的时候，会初始化一个执行环境和作用域链
// 然后使用arguments和其他参数初始化函数的活动对象
// 外层函数的活动对象处于后一位，越外层越在后一位，直到全局作用域

function closures1(props) {
    return function (o1, o2) {
        let v1 = o1[props], v2 = o2[props];
        if (v1 - v2 > 0) {
            return 1
        } else if (v1 - v2 < 0) {
            return -1
        } else {
            return 0;
        }
    }
}

let compare = closures1('name');
compare({ name: '2' }, { name: '1' });

// 闭包中的this
var name = 'windows';

var obj1 = {
    name: 'object',
    sayName() {
        // 搜索活动变量this和arguments时，并不能直接访问外层函数的this和arguments
        return function () {
            return this.name;
        }
    }
}

console.log(obj1.sayName()());// windows

var obj2 = {
    name: 'object',
    sayName() {
        // 保存this，使闭包函数能够访问到
        let that = this;
        return function () {
            return that.name;
        }
    }
}

console.log(obj2.sayName()());// object

// 内存泄漏
// 如果闭包函数包括了一个HTML节点，那么元素就无法销毁
function closures2(){
    let node = document.getElementById('id');
    // node的引用至少有一个，则不会销毁
    node.onclick = function(){
        console.log(node.id);
    }
    // 添加即可实现销毁
    node = null;
}
