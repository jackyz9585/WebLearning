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