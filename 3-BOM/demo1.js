// location对象
window.location === document.location;// true

// location = 'https://www.baidu.com:443/s?ie=UTF-8&wd=baiud'

let { hash, host, hostname, href, pathname, port, protocol, search } = location;
console.log(hash, host, hostname, href, pathname, port, protocol, search);
// "" hash为#后部分，无责返回""
// www.baidu.com:443 主机+端口
// www.baidu.com 主机名
// https://www.baidu.com/s?ie=UTF-8&wd=baiud完整url
// /s url的目录或者文件夹名
// 443 端口
// https: 协议
// ?ie=UTF-8&wd=baiud ？后搜索字符串

// 三者等价
location.assign('https://www.baidu.com');location.href = 'https://www.baidu.com';window.location = 'https://www.baidu.com';
// 也可通过上述属性来修改url
// 除修改hash，其他属性修改都会刷新页面

location.pathname = '/t';
// 使用上述location方法，都会在历史记录中生成一条记录，可以通过后退返回前一个页面，回退不会刷新
// 不会记录
location.replace('https://www.baidu.com');
// 参数表示从服务器重新加载(不推荐)
location.reload(true)

// navigator对象
// navigator对象用于识别客户端浏览器的信息
// 插件
const {plugins} = navigator
// 检测插件 -- 不支持IE
function hasPlugins(name){
    name = name.toLowerCase();
    for (let i = 0; i < plugins.length; i++) {
        if(plugins[i].name.toLowerCase().indexOf(name) > -1){
            return true
        } 
    }
    return false;
}

hasPlugins('flash')
// IE
function hasIEPlugins(name){
    try {
        new ActiveXObject(name);
        return true;
    } catch (error) {
        return false
    }
}

// 注册处理程序 -- H5新增，可以让一个站点指明处理特定类型信息
// 后续再说


// history对象
window.history.go(-1);// 后退1页
window.history.go('url');//跳转至最近的url
history.length === 0; // 打开窗口后的第一个页面？