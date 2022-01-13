import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
// import 'antd/dist/antd.less'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import App from './App'
import runtime from "./runtime";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter basename={runtime.baseName}>
      <App/>
    </BrowserRouter>
  </ConfigProvider>,
  document.querySelector('#root'))
