Webpack - 幕布    

Webpack

*   配置文件
    *   entry
        *   单入口为一个字符串String  
            `entry: "./src/index.js"`
        *   多入口时，是一个object  
            ```
             entry: {
                index: "./src/index.js",
                search: "./src/search.js"
             }
            ```
    *   output
        *   出口只有一个object  
            ```
            output: {
                path: __dirname + '/dist', // 此处路径必须为绝对路劲，不能使用./dist
                filename: 'bundle.js' // 当有多个入口时，需要使用'\[name\]\_bundle.js',此时name为入口的key
            }
            ```
    *   mode
        *   development  
            开发中使用，可以使用热更新插件，不会压缩文件
        *   production  
            生产环境中使用，会自动开启压缩混淆功能
    *   watch  
        文件监听，当代码发送变化时会自动重新构建项目。  
        需要注意的是：watch需要手动刷新页面才能看到更改后的效果。  
        同时也支持在命令加上--watch选项，可以达到同样的效果​
    *   loader  
        用法： 
        ```
        module: {
            rules: [
                // 各种loader的使用
            ]
        }
        ```
        由于webpack本身只能解析基本的js语法，像es6/react/vue等的解析就需要用到loader，还有css/img/font等文件的解析也需要使用loader
        *   babel-loader  
            用法：
            ```
            module: {
                rules: [
                    {
                        test: /\\.js$/,
                        use: 'babel-loader'
                    }
                ]
            }
            ```
            可以使用babel来解析es6/react/vue等语法。  
            babel-loader依赖于babel，这里需要在根目录下配置.babelrc，并安装@babel/core  
            `npm install @babel/core。`  
            以**react**为例，**.babelrc**需要设置为
            ```
            {
                "presets": ["@babel/preset-react"]
            }
            ```
            同时安装@babel/preset-react  
            `npm install @babel/preset-react`。
        *   style-loader/css-loader/less-loader(sass-loader)  
            **解析css文件**，**style-loader**负责**将css-loader**解析出来的css文件插入到文档的head中，**less-loader(sass-loader)**  则负责将less、sass文件解析成css文件。  
             在这里需要**注意**的是这几个loader顺序，因为使用compose的组合函数，会将less-loader/sass-loader的结果传入css-loader，然后再讲css-loader运行的结果传入style-loader。所以这里用**compose(style-loader，css-loader， less-loader/sass-loader)**，其再loader中的用法也要保持这个顺序。
        *   file-loader  
            解析img和font
        *   url-loader  
            将img编码为base64插入文档
    *   plugin
        *   html-webpack-plugin  
            作用：根据指定模板和配置文件生成html文件。  
            用法：
            ```
            new HtmlWebpackPlugin({
                title: 'list', // document的title，默认为Webpack App 
                filename: 'list.html', // 生成的html文件名，默认为index.html 
                template: './src/list.html', // html文件的模板
                chunks: \['list'\] // 存在多入口时，可以配置哪些js文件注入到该html中
            })
            ```
        *   HotModuleReplaceMentPlugin  
            webpack自带模块，配合devServer使用，当文件发送变化时会自动重新编译打包
    *   devServer  
        依赖于webpack-dev-server  
        `npm install webpack-dev-server`  
        用法:  
        `node_modules/.bin/webpack-dev-server`
        ```
        devServer: {
		    contentBase: __dirname + '/dist',
		    compress: true,
		    port: 9000
	    }
        ```
        *   contentBase  
            服务根路径
        *   port  
            端口
        *   compress  
            是否压缩## 目标
