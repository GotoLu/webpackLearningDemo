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