// 通过使用访问对象的方式来检测浏览器是否支持某个方法
function getElementById(id) {
    if(document.getElementById){
        return document.getElementById(id);
    }else if(document.all){
        // IE5不支持
        return document.all[id]
    }else{
        throw Error(`some error happened`)
    }
}

