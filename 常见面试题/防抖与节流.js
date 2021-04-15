// 防抖 前后两次事件间隔大于delay才能触发 e.g.输入框防抖 拖拽
function debounce(fn,delay = 1000) {
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(
            ()=>{
                fn.call(this,arguments);
            }
        ,delay);
    }
}


// 节流 前后两次经过时间间隔才触发 e.g. 页面滚动 rezise
function throttle(fn,wait = 1000) {
    let last = 0;
    return function(){
        let now = +new Date();
        if(now - last >= wait){
            fn.call(this,arguments);
            last = now;
        }
    }
}