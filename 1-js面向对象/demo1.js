// 继承
// 在js中，继承基本都通过原型链来实现
// 每个构造函数都有自己的原型对象，原型对象中的constructor属性指向其构造函数
// 当一个对象的该属性指向另一个对象的实例，并且后续的对象的原型属性是该对象实例
// 这样就构成了原型-实例的层层递进，形成原型链

function SuperType() {
    this.superProperty = 'superType';
}
// 父类的原型对象
SuperType.prototype.getSuperType = function(){
    console.log(this.superProperty);
}
function SubType() {
    this.subProperty = 'subType';
}
// 子类的原型属性是另一个构造函数的实例
SubType.prototype = new SuperType();
// 子类的原型
SubType.prototype.getSubType = function(){
    console.log(this.subProperty);
}
// 实例化
let instance1 = new SubType();
instance1.getSuperType(); // superType