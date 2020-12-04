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
test.prototype.test = function () { console.log('test prototype'); }

let obj = {
    v: '1'
}
/**
 * @param  {Array} params 
 * @returns {function}
 */
Function.prototype.myBind = function (params) {
    //将function给self，防止混乱
    //调用的函数
    const self = this;
    let outerParam = Array.from(arguments).slice(1);
    if (self instanceof Function) {
        //返回函数 -- 函数length失真，显示的是bound的参数个数
        let bound = function () {
            let arg = Array.from(arguments);
            let res = arg.concat(outerParam);
            
            return self.apply(params, res);
        }
        bound.prototype = self.prototype;
        return bound
    } else {
        throw new Error("error")
    }

}

// let std = test.bind(obj)
// console.log(std);
let res = test.myBind(obj,1,2,3);
// res.test()
// console.log(res);
const t = new res(3);
console.log(t);
// t.test();
console.log(res.length);//0 bound函数的参数个数
// std();
res();