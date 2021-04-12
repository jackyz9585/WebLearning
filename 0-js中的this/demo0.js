//this的几种指向问题

// 0 直接调用
function fn01() {
    console.log(this);
}
function fn02() {
    'use strict'
    console.log(this);
}
const obj0 = {
    v: 0,
    fn() {
        console.log(this);
    }
}

fn01();// window/global
fn02();// undefined
let fn00 = obj0.fn;
fn00();// window/global
//总结：当直接在全局环境中调用的时候，this指向全局，使用严格模式会指向undefined

// 1 在上下文执行
const obj1 = {
    v: 1,
    cObj: {
        v: 2,
        // 等价于
        // fn:function(){}
        fn() {
            console.log(this);
        }

    }
}

obj1.cObj.fn()//cObj
// 当使用嵌套的对象的时候，this指向最近的对象(最后调用的对象)

//p.s. 当将对象属性的方法赋予一个变量时，根据this的判断依据：在哪调用this就指向哪；
//此时的函数fn11调用环境是全局，所以，此时this指向的是全局
//可参考函数fn00
let fn11 = obj1.cObj.fn;
fn11(); // window/global


function fun() {
    return this;
}
let obj11 = {
    v: 1,
    fn: fun
};
let obj12 = {
    v: 2,
    fn() {
        return obj11.fn()
    }
}
let obj13 = {
    v: 3,
    fn() {
        let fn = obj11.fn;
        return fn();
    }
}

console.log(obj11.fn());//obj11
console.log(obj12.fn());//obj11
console.log(obj13.fn());//window
//若要obj12的fn返回obj12，需要怎么改？
//bind,call,apply显式改变this指向
let obj14 = {
    v: 2,
    fn() {
        return obj11.fn.call(obj14);
    }
}
console.log(obj14.fn());//obj14(obj12)
//直接使用obj11的fn属性 或者fun函数 ^_^
let obj15 = {
    v: 2,
    fn: obj11.fn//fun

}
console.log(obj15.fn())//obj15(obj12)


//2 显式改变this指向 bind,call,apply
//此处不深入这三个方法，后续的继承会涉及到这三个方法
const obj2 = {
    v2: 1
}
function fun2() {
    console.log(this, ...arguments);
}

fun2.bind(obj2, '1', '2', '3')();//bind返回的是一个函数，需要再次调用
fun2.call(obj2, '1', '2', '3');//参数列表
fun2.apply(obj2, ['1', '2', '3']);//参数数组
//p.s. 后续的demo1中写了简单的new关键字的实现，其中使用了call/apply方法，可以简单的看一下


//3 箭头函数
//箭头函数是ES6中提出的一种函数，形式如(arguments)=>{function body}，但是，箭头函数中并没有this和arguments关键字
//箭头函数的this指向的定义时候上下文this的指向，并且call/apply/bind不能影响箭头函数中this的指向
//是根据外层（函数或者全局）作用域（词法作用域）来决定this
//setTimeout内部callback指向全局对象
const obj3 = {
    fn() {
        setTimeout(function(){
            console.log(this);
        })
    }
}
obj3.fn();//window

const obj3_1 = {
    v: 1,
    fn(){
        //fn 属性中this指向当前对象
        setTimeout(()=>{
            console.log(this);
        })
    }
}
obj3_1.fn();//obj3_1
let fn31 = obj3_1.fn;
fn31();//window

//4 构造函数
//构造函数中this指向new出来的实例，demo1给出了new的简单实现，可以看一下为什么
function Fn4(v) {
    this.v = v
}
Fn4.prototype.test = function () {
    return this
}
let obj4 = new Fn4(4);
console.log(obj4.v);//4

// 5 原型中的this
// 这里应该和继承有关，下一块整理与继承相关模块
console.log(obj4.test());//Fn4 {v:5}
