// 箭头函数中的this指向

// 原本以为自己懂了箭头函数中this的指向，结果发现还是理解不够清楚，单独拉一个文件理解

// 用let/const 找不到window下的全局变量
var name = 'window'

var person1 = {
    name: 'person1',
    show1: function () {
        console.log(this.name)
    },
    show2: () => { console.log(this.name) },
    show3: function () {
        console.log(this);//person1 person1 person2
        return function () {
            console.log(this);//window person2 window
            console.log(this.name)
        }
    },
    show4: function () {
        console.log(this);//person1 person1 person2
        return () => { console.log(this.name) }
    }
}
var person2 = { name: 'person2' }

person1.show1()//person1
person1.show1.call(person2)//person2

person1.show2()//window person1的外层
person1.show2.call(person2)//window call无效

//等价 let fn = person1.show3();fn();
person1.show3()()//window
//等价 let fn = person1.show3;fn().call(person2);
person1.show3().call(person2)//person2
person1.show3.call(person2)()//window person2被绑定到show3，而不是所返回的函数上

//show4隐式绑定了this，这个this是person1
person1.show4()()//person1 
person1.show4().call(person2)//person1
person1.show4.call(person2)()//person2 person1的this被指向了person2,是person2调用了show4

//箭头函数会根据作用域链向上查找绑定了this的作用域，并将this指向调用这个函数的对象

// 如果使用new，this被指向了实例
function Person(name) {
    this.name = name;
    this.show1 = function () {
        console.log(this.name)
    }
    this.show2 = () => { console.log(this.name) }
    this.show3 = function () {
        return function () {
            console.log(this);
            console.log(this.name)
        }
    }
    this.show4 = function () {
        return () => { console.log(this.name) }
    }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1()//personA
personA.show1.call(personB);//personB

//personA调用了show2
personA.show2()//personA
personA.show2.call(personB)//personA

//等价 let fn = personA.show3();fn();
personA.show3()();//window
personA.show3().call(personB)//personB
personA.show3.call(personB)()//window

//理由和普通对象相同，只有外层this指向被改变，箭头函数的中的this才会变
personA.show4()()//personA
personA.show4().call(personB)//personA
personA.show4.call(personB)()//personB