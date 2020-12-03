//this绑定优先级的问题
//this绑定分为显式和隐式
//使用关键字new call/apply/bind位显式，根据调用关系系统进行判断this指向称为隐式

function fn() {
    console.log(this.v);
}

const obj1 = {
    v: 123,
    fn
}

const obj2 = {
    v: 456,
    fn
}

obj1.fn();//123
obj1.fn.call(obj2);//456
obj2.fn.call(obj1);//123
//由此可以看出显式优先级高于隐式

function Func(v) {
    this.v = v;
}
const obj = {};
let fn1 = Func.bind(obj);
console.log(typeof fn1);//function
fn1(999);
console.log(obj.v);//999
let func = new fn1(666);
console.log(typeof func);//object
console.log(func.v);//666

//bind返回一个fn1的构造函数，将this指向了obj，但是后面使用new关键字的时候，this指向了func实例，证明new优先级高于bind

//箭头函数
//前面已经说过，箭头函数中的this由定义时候的上下文决定指向，并且不会被改变
//这两个例子可以看出来


function testFun1() {
    return () => {
        console.log(this.v)
    }
}
const testObj1 = {
    v: 1
}
const testObj2 = {
    v: 2
}

let test1 = testFun1.call(testObj1);
test1();//1
test1.call(testObj2);//1

var v = 321;//注意，这里使用var声明v和使用let/const声明变量会出现不同的情况，如果使用quokka.js运行的话需要插件，因为node没有window全局对象 -_-|||!
//因为var声明的全局变量会挂在window顶层对象下面，而let和const声明的全局变量不会
//demo2.html可以查看结果
const testFun2 =  () => () => { console.log(this.v); };
let test2 = testFun2.call(testObj1);
test2();//321
test2.call(testObj2);//321

//本来想继续整理bind，call，apply以及new的js实现的，后来想了想，由很多细节需要考虑到，后面再单独写一个demo吧