//bind的js实现简易版

/*
    bind首先需要能够修改this的指向
    bind返回一个函数
    能够接受参数
    柯里化
 */

function test(v) {
    this.v = v
    console.log(this.v);
    console.log(this);
}
test.prototype.text = 'test prototype';

let obj = {
    v: '1'
}
/**
 * @param  {Array} context 
 * @returns {function}
 */
Function.prototype.myBind = function (context) {

    //将function给self，防止混乱
    //调用的函数
    const self = this;
    let outerParam = Array.from(arguments).slice(1);
    if (self instanceof Function) {
        //返回函数 -- 函数length失真，显示的是bound的参数个数
        let bound = function () {
            let arg = Array.from(arguments);
            let res = arg.concat(outerParam);
            //判断bound是作为构造函数还是普通函数
            //构造函数的话this指向bound，普通函数this指向window
            //所以是构造函数将this指向新的实例，否则指向绑定的对象context
            // return self.apply(context, res);
            return self.apply(this instanceof bound ? this : context, res);
        }
        // 由于原型链继承的缺点，修改实例原型属性时会同时修改构造函数的原型属性
        // bound.prototype = self.prototype;
        // 所以使用一个空对象作为传输原型的一个媒介(原型式继承)
        bound.prototype = Object.create(self.prototype);//IE9以下不支持

        // let temp = function(){};
        // temp.prototype = self.prototype;
        // bound.prototype = new temp();
        return bound
    } else {
        throw new Error("error")
    }

}

let res = test.myBind(obj, 1, 2, 3);
res();
// console.log(res.length);//0 bound函数的参数个数
// console.log(res);
const t = new res(3);
//原型属性测试继承
console.log(t.text);//test prototype

// 使用setPrototypeOf()不会影响构造函数的原型属性
// Object.setPrototypeOf(t,{'text':'123'});
// 直接操作__proto__.text会对构造函数的原型有影响
t.__proto__.text = 'new test prototype'
console.log(t.text);
console.log(test.prototype.text);//new test prototype / test prototype

