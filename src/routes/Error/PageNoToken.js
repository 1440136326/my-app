import React from 'react'
import {Button} from 'antd'
import {actions} from 'mirrorx'

const PageNoToken = ()=> {
    return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: 50}}>
            <img src="/images/403.svg" alt="" style={{marginRight: 40}}/>
            <div style={{paddingTop: 60}}>
                <div style={{fontSize: '68px', lineHeight: '100px',}}>403</div>
                <div style={{fontSize: '16px', lineHeight: '40px'}}>尚未登陆或登陆超时，请重新登陆</div>
                <Button type="primary" onClick={() => {
                    actions.routing.push('/')
                }}>重新登陆</Button>
            </div>
        </div>
    )
}

export default PageNoToken

