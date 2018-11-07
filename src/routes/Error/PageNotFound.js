import React from 'react'
import {Button} from 'antd'
import {actions} from 'mirrorx'

const PageNotFound = ()=> {
    return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: 50}}>
            <img src="/images/404.svg" alt="" style={{marginRight: 40}}/>
            <div style={{paddingTop: 60}}>
                <div style={{fontSize: '68px', lineHeight: '100px',}}>404</div>
                <div style={{fontSize: '16px', lineHeight: '40px'}}>页面不见了，要不我们返回首页吧?</div>
                <Button type="primary" onClick={() => {
                    actions.routing.push('/home')
                }}>返回首页</Button>
            </div>
        </div>
    )
}

export default PageNotFound

