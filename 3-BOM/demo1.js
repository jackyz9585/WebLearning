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

