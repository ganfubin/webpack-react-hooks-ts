import React, {FC} from 'react'
import {Result} from "antd";
import NotFoundImage from '@/assets/images/404.png'

const NotFound: FC = () => {
  return (
    <Result style={{padding: 0}} title="404" subTitle="您要访问的页面, 它去了遥远的星球, 暂时访问不了" icon={<img src={NotFoundImage} alt="404" />} />
  )
}

export default NotFound