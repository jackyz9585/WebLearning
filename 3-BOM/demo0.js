// window - BOM的核心
// window对象等同于ECMA中的Global对象
// 在全局声明的function，变量都会变成window的属性

var age = 25;
delete window.age;//false [[configurable]]为false，不能删除

window.age = 25;
delete window.age;//true

// top属性时指向最顶层的窗口
window === top;
// parent在没有框架的情况下等于top === window


// 窗口位置 -- 兼容opera
let screenLeft = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
let screenTop = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY;

moveTo(x,y);// 移动到x,y
moveBy(x,y);// 移动x(负向左)，y(负向上)像素

// 获取浏览器窗口大小
outerWidth,outerHeight;// 浏览器大小
innerHeight,innerWidth;// 可视区域大小(出去边框和导航栏)
document.body.clientHeight;document.body.clientWidth;// 视口大小 等价inner 混杂模式
document.documentElement.clientHeight;document.documentElement.clientWidth;// 视口布局

resizeTo(x,y);// 调整到长x宽y
resizeBy(x,y);// 新窗口和旧窗口之差

// 等价于<a href='url' target='target'></a>
// target指如果有名为taget的窗口或者框架，就在窗口或者框架下加载这个url，否则，就会创建一个新窗口并命名为target（_self,_parent,_top,_blank）
// 如果target并不是一个已经存在的窗口，则会根据options创建一个新的窗口或者标签页
// options="width=400px,height=400px..."
window.open('url','target','options','replace') 
// open对应close，限于用open打开的窗口
let page = window.open('https://www.baidu.com/','_blank');
page.close()

// setTimeout/setInterval
// 在延迟回调之前使用clearTimeout清除回调的ID相当于什么都没发生
// setTimeout第一个参数可以接受字符串，类似eval()，但是出于性能不推荐
let time = setTimeout(function(){},1000);
clearTimeout(time);

