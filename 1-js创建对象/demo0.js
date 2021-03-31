// 工厂模式 
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

// 构造函数模式
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

// 原型模式
function Person2(name,age){
    this.name = name;
    this.age = age;
}
Person2.prototype.sayHi = function(){
    console.log(this.name);
}

let p3 = new Person2('jacky3',26);
p3.sayHi();