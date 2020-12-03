//new的实现，修改this的指向

//原型
let proto = {
    p1:'string'
}

//构造函数
function OBJ(val) {
    this.val = val
    // return this
}
OBJ.prototype = proto;

function _new(...params) {
    //新建空对象，挂载构造函数原型属性
    let obj = Object.create(OBJ.prototype);
    // 绑定this指向，传入参数
    let res = OBJ.call(obj,...params);
    // 判断构造函数有无返回值
    return typeof res === 'object' ? res : obj;
}

let obj = _new('test');
// let obj = new OBJ('test');
console.log(obj instanceof OBJ);//true
console.log(obj);//{val:'test'}
console.log(obj.__proto__);//proto