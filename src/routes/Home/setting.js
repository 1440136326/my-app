import React from 'react'
import {connect,actions} from 'mirrorx'

import {Card,Switch,message} from 'antd'

class  SettingIndex extends React.Component {

    onSettingLayout = (layout)=> {
        const {user} = this.props
        actions.system_user.setting({
            id: user.id,
            name: 'ui-layout',
            value: layout
        }).then(result => {
            if (result.status === 1) {
                //message.success(result.message)
                actions.global.getTokenUser()
            } else {
                message.error(result.message)
            }
        })
    }

    render = ()=> {

        const {isSaving, isLoading} = this.props
        const layoutSetting = this.props.user.settings.find(item => item.name === 'ui-layout')
        const layout = layoutSetting ? layoutSetting.value : 'layout-lc'

        return (
            <div>
                <Card
                    title="页面布局"
                    type="inner"
                >
                    <div style={{display: 'flex'}}>
                        <Card
                            style={{flex: '0 0 320px', marginRight: 16}}
                            hoverable
                            cover={<img alt="example" src="/images/lc.png"/>}
                            actions={[
                                <div style={{lineHeight:'28px'}}  onClick={() => {this.onSettingLayout('layout-lc')}}>
                                    <Switch loading={isSaving||isLoading} checked={layout === 'layout-lc'}/>
                                    &nbsp;主菜单位于页面左侧
                                </div>
                            ]}
                        />
                        <Card
                            style={{flex: '0 0 320px'}}
                            hoverable
                            cover={<img alt="example" src="/images/tc.png"/>}
                            actions={[
                                <div style={{lineHeight:'28px'}}  onClick={() => {this.onSettingLayout('layout-tc')}}>
                                    <Switch loading={isSaving||isLoading} checked={layout === 'layout-tc'}/>
                                    &nbsp;主菜单位于页面顶部
                                </div>
                            ]}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(state=>({
    isSaving:state.system_user.isSaving,
    isLoading:state.global.isLoading
}))(SettingIndex)