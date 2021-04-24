// 继承2

// 原型式继承
// 基于已有对象创建新对象,实现对于已有对象的浅复制
function superType4(o){
    // 临时的构造函数
    function F(){};
    F.prototype = o;
    return new F();
}

let obj4 = {
    name:'aaa',
    colors:['red','yellow']
}

// 等价与 Object.create(obj4)
let obj4_1 = superType4(obj4);
obj4_1.name = 'bbb';
obj4_1.colors.push('green'); 

let obj4_2 = superType4(obj4);
obj4_2.name = 'ccc';
obj4_2.colors.push('blue');
console.log(obj4.colors);

let obj4_3 = Object.create(obj4);
obj4_3.name = 'ddd';
obj4_3.colors.push('purple');
console.log(obj4_3,obj4);

// 缺点
// 与原型模式一样，对于引用属性的修改会共享到所有的实例
// 超类属性位于__proto__中，遍历子类对象不能遍历到，需要通过Object.getPrototypeOf()访问

// 原型式继承适用于维持连个对象保持类似


// 寄生式继承
// 适用于非自定义对象
function superType5(o){
    // 获取已有对象/不是必须的只要是返回新对象的函数
    let clone = superType4(o);
    // 增强对象
    clone.sayName = function(){
        console.log(this.name);
    }
    return clone;
}


// 寄生组合继承 最优继承
// 接受两个构造函数
function superType6(subType,superType){
    // 获取超类原型属性
    let prototype = Object.create(superType.prototype)
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(name){
    this.name = name;
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
}

function SubType(name,age){
    // 调用构造函数
    SuperType.call(this,name);
    this.age = age;
    console.log(this);
}

superType6(SubType,SuperType);

// 避免创建子类不必要的属性
SubType.prototype.sayAge = function(){
    console.log(this.age);
}

let instance3_1 = new SubType('aaa',25);
console.log(instance3_1.name);