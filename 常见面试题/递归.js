function factorial(n){
    if(n<=1){
        return 1
    }else{
        // callee是一个指向正在执行函数的指针，实现递归
        return n*arguments.callee(n-1)
    }
};

let anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(5));

// 严格模式下，不能通过脚本访问arguments.callee,可以使用函数代替
let factorial1 = (function fn(n){
    if(n<=1){
        return 1
    }else{
        return n*fn(n-1)
    }
});
console.log(factorial1(5));