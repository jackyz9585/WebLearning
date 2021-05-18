// Promise A+ 规范
// https://promisesaplus.com/
/*
    1. 一个promise的当前状态只能是pending、fulfilled和rejected三种之一。
    状态改变只能是pending到fulfilled或者pending到rejected。状态改变不可逆

    2.promise的then方法接收两个可选参数，表示该promise状态改变时的回调
    promise.then(onFulfilled, onRejected)
    两个参数都必须是函数，如果不是，就忽略
    then方法必须返回一个promise，记为promise2,使得可以多次调用then方法
    如果有一个onFulfilled或onRejected返回一个值x，则执行[[Resolve]](promise2,x)
    如果onFulfilled或onRejected不是函数且promise1已完成/拒绝，
    则需要把promise1的状态传递下去

    3.不同的promise可以交互
    该操作称为promise的解决过程，函数记为[[Resolve]](promsie,x)
    如果x有then方法且类似promise，我们将其当作promise对象，使用promise接收x的状态
    否则使用x的值来执行promise
    [[Resolve]](promsie,x)需要满足：
    如果promise和x引用相同对象，则以TypeError拒绝执行promise
    如果x是一个Promise，则使Promise接受x的状态
    如果x是对象或者函数，则取x.then的值，如果出现异常e，则Promise进入rejected状态，理由为e
    如果then是一个函数
    则把x作为then函数中的this调用，then方法接收两个参数resolvePromise和rejectPromise
    如果resolvePromise执行，则以resolvePromise的参数value作为x继续调用[[Resolve]](promsie,value)
    如果rejectPromise执行，则让Promise进入reject状态；
    如果then不是函数，则直接以x作为resolve的值
    如果x不是一个函数或者对象，则使用x的值执行Promise
*/

// 3种状态
const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

function isFunction(fn) {
    return typeof fn === 'function';
}

function isObject(obj) {
    return typeof obj === 'object';
}

class PromiseT {
    status = PENDING;
    data = undefined;
    reason = undefined;
    // 存储回调函数的集合
    onFulfilledCallback = [];
    onRejectedCallback = [];
    constructor(fn) {
        if (!isFunction(fn)) {
            throw TypeError('must need a function as a parameter')
        }
        
        // PENDING->FULFILLED
        let resolve = value => {
            this.status = FULFILLED;
            this.data = value;
            this.onFulfilledCallback.forEach(v=>v)
        }
        // PENDING->REJECTED
        let reject = reason => {
            this.status = REJECTED;
            this.reason = reason
            this.onRejectedCallback.forEach(v=>v)
        }
        // 执行构造函数
        try {
            fn(resolve, reject)
        } catch (reason) {
            reject(reason);
        }
    }

    // then方法
    then(onFulfilled, onRejected) {
        // 忽略参数为非函数的情况
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : v => v
        onRejected = isFunction(onRejected) ? onRejected : e => { throw e }

        // 返回一个新的Promise
        let promise2;
        promise2 = new PromiseT((resolve, reject) => {
            // FULFILLED状态
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.data);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })

            }
            // REJECTED状态
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            // 需要考虑状态为pending，执行的函数可能为异步函数
            if (this.status === PENDING) {
                // 发布订阅
                // 为PENDING状态，则添加到回调队列中
                this.onFulfilledCallback.push(
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.data);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                );

                this.onRejectedCallback.push(
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                );

            }
        });

        return promise2;
    }

    // [[Resolve]](promsie2,x)
    resolvePromise(promise2, x, resolve, reject) {
        let called = false;
        // 如果promise和x引用相同对象，则以TypeError拒绝执行promise
        if (promise2 === x) {
            return reject(new TypeError('chaining cycle detected for promise!'))
        }

        // 如果x是一个Promise，则使Promise接受x的状态
        if (x instanceof PromiseT) {
            // 使状态确定
            if (x.status === PENDING) {
                x.then(value => {
                    resolvePromise(promise2, value, resolve, reject);
                });
            } else {
                x.then(resolve, reject);
            }
            return
        }

        // 如果x是对象或者函数，则取x.then的值，如果出现异常e，
        // 则Promise进入rejected状态，理由为e
        if (x !== null && isFunction(x) || isObject(x)) {
            try {
                const then = x.then;
                if (isFunction(then)) {
                    then.call(x, y => {
                        if (called) {
                            return;
                        }
                        called = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    }, r => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(r);
                    });
                } else {
                    //  如果then不是函数，则直接以x作为resolve的值
                    if (called) {
                        return;
                    }
                    called = true;
                    resolve(x)
                }
            } catch (error) {
                if (called) {
                    return;
                }
                called = true;
                reject(error);
            }
        } else {
            // 如果x不是一个函数或者对象，则使用x的值执行Promise
            resolve(x)
        }
    }

}


let p0 = new Promise(resolve => {
    resolve('123');
    setTimeout(() => {
        resolve('321');
    });
}).then(res => {
    console.log(res);
}).then(res=>{
    console.log(res);
})

// 状态控制不对，应该是resolve函数的问题
let p = new PromiseT(resolve => {
    resolve('123');
    setTimeout(() => {
        resolve('321');
    });
}).then(res => {
    console.log(res);
}).then(res=>{
    console.log(res);
})

