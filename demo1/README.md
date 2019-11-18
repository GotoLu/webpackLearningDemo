Webpack 进阶

*   关于autoprefixer 自动给css样式加前缀
    由于浏览器的标准没有统一，样式属性的支持力度也不一致，有些属性需要加上浏览器对应的前缀，但是手动添加是一件比较浪费时间的事，因此autoprefixer出现。现如今存在四种主流浏览器的IE（trident/-ms）、Firefox（geko/-moz）、Chrome（webkit/-webkit）、O（presto/-o）
    * 用法，需要借助postcss-loader
    ```
    // 在css-loader前面加上
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                require('autoprefixer')
            ]
        }
    }
    // autoprefixer可以定义要兼容的版本，可以创建一个配置文件.browserslistrc，里面包含需要的版本控制
    last 2 version
    > 1%
    ios 7 # sorry
    ```
*   移动端适配，px2rem-loader自动将px转换为对应的rem，不过font-size需要借助使用flexible来设置。
    * px2rem-loader用法，需要在less-loader处理后
    ```
    {
        loader: 'px2rem-loader',
        options: {
            remUni: 75, // 1rem = ?px
            remPrecision: 8  // rem 保留小数点后几位
        }
    }
    ```
    * flexible 需要安装lib-flexible，而且要内联到html中，这里需要使用raw-loader进行js文本的内联
    ```
    // xxx.html script标签注入js
    ${ require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js') }
    ```
*   MPA打包通用方案
    * 统一目录风格，借助glob来获取入口entry以及htmlPlugins
    ```
    const makeMPA = () => {
        let entry = {};
        let htmlPlugins = [];
        const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
        entryFiles.forEach(entryFile => {
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match[1];
            entry[pageName] = entryFile;
            htmlPlugins.push(
                new HtmlWebpackPlugin({
                    title: pageName,
                    template: path.join(__dirname, `./src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true
                    }
                })
            );
        });
        return {
            entry,
            htmlPlugins
        }
    }
    ```
* 提取页面公共资源
  * html-wepack-externals-plugin
  ```
    htmlWebpackExternalsPlugin({
        externals: [
            {
                module: 'jquery',
                entry: 'dist/jquery.min.js',
                global: 'jQuery',
            },
        ],
    })
  ```
  * splitChunkPlugin
    * 提取基础库
    ```
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /(react/react-dom)/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    ```
    * 提取公共资源
    ```
        optimization: {
            splitChunks: {
                minSize: 0,
                cacheGroups: {
                    commons: {
                        name: 'common',
                        chunks: 'all',
                        minChunks: 2
                    }
                }
            }
        }
    ```
* tree shaking
  * 只支持es6模块，因为tree shaking利用import模块的操作是在编译阶段完成的，且模块是immutable的特性，它会在编译阶段对无效的代码进行注释，最后会在uglify阶段对这些代码进行擦除。
  * 特性（DCE-dead code elimination）：
    * 代码不会被执行，不可到达
        ```
            if (false) {
                console.log('无法执行的代码');
            }
        ```
    * 代码执行的结果不会被用到
    * 代码只会影响死变量（这个变量只写不读）
