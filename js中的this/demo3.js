//bind的js实现简易版
function test(v) {
    // this.v = v
    console.log(this.v);
}
test.prototype.test = function () { console.log('test prototype'); }

let obj = {
    v: '1'
}
/**
 * 
 * @param {Object} tar 
 * @param  {Array} params 
 * @returns {function}
 */
Function.prototype.myBind = function (tar, ...params) {
    //将function给self，防止混乱
    const self = this;

    if (self instanceof Function && tar instanceof Object) {
        //返回函数 -- 函数length失真，显示的是bound的参数个数
        return function bound() {
            //使用instanceof判断是否为new
            let arg = Array.from(arguments);
            let res = params.concat(arg);
            return self.apply(tar, res);
        }
    } else {
        throw new Error("error")
    }

}

let std = test.bind(obj)
console.log(std);
let res = test.myBind(obj);
console.log(res);
const t = new res(1);
// console.log(res.length);//0 bound函数的参数个数
// std();
res();