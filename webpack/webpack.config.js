const path = require('path');
module.exports = {
    // 模式:development|production|none
    mode:'development',
    
    entry:'./main.js',
    // entry:['path1','path2'],
    // entry:{
    //     a:'path1',
    //     b:'path2'
    // },
    // entry:()=>{
    //     return {
    //         a:'path1',
    //         b:'path2'
    //     }
    // },
    // entry:()=>{
    //     return new Promise(resolve=>{
    //         resolve({
    //             a:'path1',
    //             b:'path2'
    //         })
    //     })
    // },

    output:{
        // 文件名 string
        filename:'bundle.js',
        // 输出的文件所保存的本地目录--绝对路径
        path:path.resolve(__dirname,'./dist'),
        // 非入口chunk文件名称，在运行过程中生成的chunk
        chunkFilename:'[id].js',
        // 异步加载所需构建资源的URL
        publicPath:'https://cdn.example.com/dist',
        // 路径信息是否生成到代码中
        pathinfo:true,
        // 导出库名称
        library:'myLibrary',
        // 如何暴露library
        libraryTarget:'var',// var commomjs this window global
        // 使用动态加载script标签的JSONP的代码片跨域策略
        crossOriginLoading:'anonymous',// false anonymous use-credentials
    },

    module:{
        // loader
        rules:[
            {
                // 匹配的文件 RegExp 
                test:[/\.css$/],
                // 在指定路径匹配对应文件
                include:[
                    path.resolve(__dirname,'.')
                ],
                // 使用的loader，从右到左
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{},
                        enforce:'pre',// post pre
                    }
                ],
                // 忽略的文件--避免使用 优先级高于test include
                // exclude:[
                //     path.resolve(__dirname,'node_modules')
                // ],
                noParse:/jquery|chartjs/,// funtion 无需解析模块,其中不包含import require define
                parser:{
                    commonjs:false,// 禁用commonJS

                },
                // 配置如何搜索模块对应文件
                resolve:{
                    // 假设./src/component下有很多组件
                    // 第三方模块的寻找路径
                    // 可直接使用import something
                    modules:['node_modules',path.resolve(__dirname,'./src/component/')],
                    alias:{
                        // component/something替换成了./src/component/something
                        component:'./src/component/',
                        // 以react结尾的导入语句会被替换
                        react$:'/path/react.min.js'
                    },
                    // 当请求文件夹是，从文件读取属性
                    mainField:['browers','main'],
                    // 如无文件后缀名，补全文件名搜索
                    extensions:['.js','.json'],
                    // 使用import导入文件不需要加后缀名
                    enforceExtension: false,
                    // 使用import导入node_modules内的文件不需要加后缀名
                    enforceModuleExtension: false,
                }
            }
        ]
    },

    plugins:[
        // 使用plugin的实例
    ],

    devServer:{
        // 同域名发送API请求
        proxy:{
            '/api':'http://localhost:3000'
        },
        // 热更新
        hot:true,
        // 服务器文件的根目录，默认为当前执行目录
        contentBase:'.',
        // SPA为T/F，任何请求对会返回index.html
        // 多页面使用RegExp匹配路由，命中返回对应html
        historyApiFallback:{
            rewrites:[
                {from:/^\/user/,to:'/user.html'},
                {from:/./,to:'/index.html'}
            ]
        },
        headers:{
            // 添加响应头
        },
        host:'localhost',
        port:8080,
        open:true,
        https:false,
        // 是否启用gzip
        compress:false
    },
    
    // 针对不同环境构建不同代码
    target:'web',// web node async-node webworker electron-main electron-renderer
    devtool:'source-map',
    // 不需要打包模块
    externals:['vue']
};