/// 创建对象的方式

// 1-工厂模式 
function createPerson(name,age){
    return {
        name:name,
        age:age,
        sayHello(){
            console.log(this.name);
        }
    }
}
let p1 = createPerson('jacky1',26);
p1.sayHello();
// 不能识别对象的类型

// 2-构造函数模式
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        console.log(this.name);
    }
}

let p2 = new Person('jacky2',26);
p2.sayHi();
// 每次实例化的对象包含的函数不是同一个函数，增加额外的内存空间
// 可以改成this.sayHi = sayHi;
// function sayHi(){ console.log(this.name) }

// 3-原型模式
function Person2(){}
Person2.prototype.name = 'jacky-p';
Person2.prototype.age = 26;
Person2.prototype.sayHi = function(){
    console.log(this.name);
}

let p3 = new Person2();
let p4 = new Person2();
p3.sayHi();
Person2.prototype.isPrototypeOf(p3) // true
Object.getPrototypeOf(p3) === Person2.prototype;//true
// 为p3添加了一个新的属性，屏蔽了对于原型的访问
p3.sayHi = function(){
    console.log(`sayHi!`);
}
p3.sayHi();//saiHi
p4.sayHi();//jacky4
// 可以判断实例属性还是原型属性
p3.hasOwnProperty('sayHi');//true
p4.hasOwnProperty('sayHi');//false

// 4-组合模式
function Person3(name,age) {
    this.name = name;
    this.age = age;
    this.prop = ['prop1','prop2'];
}
Person3.prototype.sayHi = function(){
    console.log(this.name);
}
let p5 = new Person3('jacky5',26);
let p6 = new Person3('jacky6',26);
p5.sayHi();
p5.prop === p6.prop;//false
p5.sayHi === p6.sayHi;//true

// 5-动态原型
function Person4(name,age) {
    this.name = name;
    this.age = age;
    this.prop = ['prop1','prop2'];
    if(typeof this.sayHi !== 'function'){
        Person4.prototype.sayHi = function () {
            console.log('Hi');
        }
    }
}

let p7 = new Person4('jacky7',26);
// 字面量会阻断实例与新原型的联系
Person4.prototype = {
    sayHi(){
        console.log('Hello');
    }
}
p7.sayHi();//Hi

// 6-寄生构造函数
// 可以重写调用构造函数时的返回值
function Person5(name,age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.sayHi = function (){
        console.log(this.name);
    }
    return o;
}
let p8 = new Person5('jacky8',26);
p8.sayHi();

// 7-稳妥构造函数
// 只能通过方法来访问内部变量，不使用this和new，适用于安全环境，防止被其他程序修改
function Person6(name,age) {
    let o = new Object();
    // 一些私有变量或者方法
    o.sayHi = function (){
        console.log(name);
    }
    return o;
}

let p9 = Person6('jacky9',26);
p9.sayHi();
// 通过构造函数实例化出来的对象都不能通过instanceof判断与构造函数之间的关系
