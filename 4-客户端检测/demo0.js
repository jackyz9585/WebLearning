// 通过使用访问对象的方式来检测浏览器是否支持某个方法
function getElementById(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        // IE5不支持
        return document.all[id]
    } else {
        throw Error(`some error happened`)
    }
}

// 能力检测
// 注意IE8
function isSortable(object) {
    return typeof object.sort === 'function';
}

// 客户端代理
// Mozilla/5.0 (Windows NT 10.0; Win64; x64)
// Mozilla/版本号 (平台 加密类型;操作系统;CPU)
// AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36


// 浏览器识别（最广泛）
var client = function () {
    let engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        ver: null
    };

    let browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        ver: null
    };

    let system = {
        // computer
        win: false,
        mac: false,
        xll: false,
        // mobile
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        // gaming
        wii: false,
        ps: false
    };
    // 引擎和浏览器
    const ua = navigator.userAgent;
    if (window.opera) {
        // opera 7.6+
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp["$1"];// 匹配的第一个子匹配（括号为标识）
        engine.webkit = parseFloat(browser.ver);
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = browser.ver;
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            let sarafiVersion = 1;
            if (engine.webkit < 100) {
                sarafiVersion = 1;
            } else if (engine.webkit < 312) {
                sarafiVersion = 1.2;
            } else if (engine.webkit < 412) {
                sarafiVersion = 1.3
            } else {
                sarafiVersion = 2;
            }
            browser.safari = browser.ver = sarafiVersion;
        }
    }
    // 省略其他检测，方法一致

    // 平台
    const p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.xll = (p == 'Xll') || (p.indexOf(Linux) == 0);
    if(system.win){
        // ...
    }
    return {
        engine,
        browser,
        system
    }
}();