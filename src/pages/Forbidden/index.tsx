import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import Result from 'antd/lib/result'
import { Button, Row } from 'antd'
import ForbiddenImage from '@/assets/images/403.svg'

const Forbidden: FC = () => {
  const history = useHistory()

  return (
    <>
      <Result title="403" subTitle="您没有权限访问该资源" icon={<img src={ForbiddenImage} alt="403" />} />
      <Row justify="center">
        <Button style={{ marginLeft: 20 }} onClick={() => history.replace('/login')}>退出登录</Button>
      </Row>
    </>
  )
}

export default Forbidden