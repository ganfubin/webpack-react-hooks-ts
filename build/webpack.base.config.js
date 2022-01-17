const path = require('path')
const WebpackBar = require('webpackbar')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const getVersion = () =>  {
  const version = process.version.replace(/v|\./g, '').slice(0,2)
  return Number(version)
}

if (getVersion() < 16) throw new Error('' +
  '代码依赖node > 16的版本，请注意升级 https://www.npmjs.com/package/eslint ' +
  '可以通过n(https://www.npmjs.com/package/n）来管理node版本'
)


module.exports = {
  entry: {
    app: resolve('../src/index.tsx')
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
    alias: {
      '@': resolve('../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules|\.d\.ts$/
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'images/'
            }
          },
          // {
          //   loader: "url-loader",   //file-loader
          //   options: {
          //     name: "[name]_[hash].[ext]",
          //     outputPath: "images/",
          //     limit: 2048
          //   }
          // }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 10 // 需要级别高点
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd',
          chunks: 'all',
          priority: 10 // 需要级别高点
        },
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendor',
        //   chunks: 'all',
        //   priority: 9
        // },
        // commons: {
        //   test: /src/,
        //   name: 'commons',
        //   chunks: 'all',
        //   priority: 9
        // }
      }
    }
  },
  cache: {
    type: 'filesystem',
  },
  plugins: [
    new AntdDayjsWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: resolve('../config'), to: resolve('../dist') }
      ],
    }),
    new WebpackBar()
  ]
}