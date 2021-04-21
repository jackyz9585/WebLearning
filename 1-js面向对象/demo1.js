// 继承
// 在js中，继承基本都通过原型链来实现
// 每个构造函数都有自己的原型对象，原型对象中的constructor属性指向其构造函数
// 当一个对象的该属性指向另一个对象的实例，并且后续的对象的原型属性是该对象实例
// 这样就构成了原型-实例的层层递进，形成原型链


// 原型链继承
function SuperType1() {
    this.superProperty = 'superType';
    this.colors = ['red','yellow'];
}
// 父类的原型对象
SuperType1.prototype.getSuperType = function(){
    console.log(this.superProperty);
}
function SubType1() {
    this.subProperty = 'subType';
}
// 子类的原型属性是另一个构造函数的实例
SubType1.prototype = new SuperType1();
// 子类的原型
SubType1.prototype.getSubType = function(){
    console.log(this.subProperty);
}
// 实例化
let instance1_1 = new SubType1();
instance1_1.getSuperType(); // superType
let instance1_2 = new SubType1();
// 缺陷
// 原型属性实例共享 在任一实例中修改引用(对象，数组)属性会导致其他实例中的属性同时被修改
// 不能向超类传递参数
instance1_1.colors.push('green');
console.log(instance1_1.colors,instance1_2.colors);

// 构造函数
// 为了解决原型属性引用属性和无法传递参数问题，在子类的函数体中调用父类构造函数
function SuperType2(name){
    this.name = name;
    this.colors = ['red','yellow'];
}

function SubType2(){
    this.age = 25;
    SuperType2.call(this,'aaa');
}

let instance2_1 = new SubType2();
let instance2_2 = new SubType2();
instance2_1.colors.push('green');
console.log(instance2_1,instance2_2);

// 缺陷
// 不能够实现方法的复用，超类中的属性对于子类不可见

// 组合继承 -- 常用
// 结合了原型链和构造函数的继承模式，使原型属性和方法共享，实例属性私有
function SuperType3(name){
    this.name = name;
    this.colors = ['red','yellow'];
}
SuperType3.prototype.sayHi = function(){
    console.log('hello!my name is ' + this.name);
}
function SubType3(name,age){
    this.age = age;
    SuperType3.call(this,name);
}
SubType3.prototype = new SuperType3();
SubType3.prototype.constructor = SubType3;// 将构造函数指向自身
SubType3.prototype.sayAge = function(){
    console.log(this.age);
}
let instance3_1 = new SubType3('aaa',25);
let instance3_2 = new SubType3('bbb',26);
instance3_1.colors.push('green');
console.log(instance3_1,instance3_2);
instance3_1.sayHi()
console.log(instance3_1.constructor);