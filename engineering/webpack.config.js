const webpack = require("webpack");
// const TerserPlugin = require('terser-webpack-plugin')
const path = require("path");
function resolve(dir) {
  //设置绝对路径
  return path.join(__dirname, dir);
}
const HtmlWebPackPlugin = require("html-webpack-plugin");
// let isProduction=process.env.NODE_ENV;//判断环境 配合configureWebpack 进行不同环境编译打包
module.exports = {
  // 配置 打包环境
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    // 文件校验
    rules: [
      {
        test: /\.((t|j)sx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.tsx$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10, // 小于10KB图片，转base64编码
        },
      },
    ],
  },
  plugins: [
    // 压缩html
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
      inject: "body",
      minify: {
        removeComments: true,
      },
    }),
    // 热更新配置
    new webpack.HotModuleReplacementPlugin(),
  ],
  // webpack5 自带的optimization配置 还有问题
  // optimization:{
  //     minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
  //     minimizer: [
  //         new TerserPlugin({
  //                   test: /\.js(\?.*)?$/i,  //用来匹配需要压缩的文件。通常可以配置min.js来过滤一些已经压缩过的js文件避免重复压缩导致问题
  //                 //   include: undefined, //正则表达式，匹配参与压缩的文件。
  //                 //   exclude: undefined, //正则表达式，匹配不需要压缩的文件
  //                   parallel: true, //使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1 。
  //                   minify: false, //允许你自定义压缩函数。 默认情况下，插件使用 terser 库。 对于使用和测试未发布的版本或 fork 的代码很帮助。

  //           terserOptions: {
  //                 toplevel: true, // 最高级别，删除无用代码
  //                 ie8: true, //允许浏览器内核
  //                 safari10: true,
  //             }
  //         })
  //     ]
  // },
  // 热更新配置 级 路由响应
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  // 配置文件别名
  resolve: {
    alias: {
      "@": resolve("src"),
      assets: resolve("@/assets"),
      components: resolve("@/components"),
      views: resolve("@/views"),
    },
    extensions: [".js", ".jsx", ".tsx", ".json"],
  },

  mode: "production",
};
