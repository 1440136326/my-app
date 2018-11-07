import React from 'react'
import {Button} from 'antd'
import {actions} from 'mirrorx'

const PageNoPermission = ()=> {
    return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: 50}}>
            <img src="/images/403.svg" alt="" style={{marginRight: 40}}/>
            <div style={{paddingTop: 60}}>
                <div style={{fontSize: '68px', lineHeight: '100px',}}>403</div>
                <div style={{fontSize: '16px', lineHeight: '40px'}}>没有该页面的访问权限</div>
                <Button type="primary" onClick={() => {
                    actions.routing.push('/home')
                }}>返回首页</Button>
            </div>
        </div>
    )
}

export default PageNoPermission

