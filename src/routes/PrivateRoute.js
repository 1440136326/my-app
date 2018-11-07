import React from 'react'
import PropTypes from 'prop-types'

import {Spin} from 'antd'
import {connect,actions} from 'mirrorx'

import BasicLayout from './../layouts'

import PageNoPermission from  './Error/PageNoPermission'
import PageNoToken from './Error/PageNoToken'


class PrivateRoute extends React.Component {
    state = {
        isLoading: true
    }

    componentWillMount() {

        const {user} = this.props
        //页面刷新后，global 中的menus，rights会重置，此时重新获取登录用户信息
        if (!user) {
            actions.global.getTokenUser().then(result => {
                this.setState({isLoading: false})
            })
        } else {
            //console.log(user)
            this.setState({isLoading: false})
        }
    }

    render() {

        const {user, menus, rights: allRights, code, component: Component, match} = this.props
        if (this.state.isLoading)
            return <div
                style={{paddingTop: 50, display: 'flex', justifyContent: 'center'}}>
                <Spin spinning={true}></Spin>
            </div>

        if (!user) {
            return (
                <BasicLayout
                    user={user}
                    menu={{name: '403', description: '尚未登录或登录超时', id: '403'}}
                    menus={menus}
                    layout='layout-tc'
                    hasContentBg={false}
                >
                    <PageNoToken/>
                </BasicLayout>
            )
        }

        const layoutSetting = user.settings.find(item=> item.name === 'ui-layout')
        const layout = layoutSetting ? layoutSetting.value : 'layout-lc'

        if (code === '404') {
            return (
                <BasicLayout
                    user={user}
                    menu={{name: '404', description: '找不到页面', id: '404'}}
                    menus={menus}
                    layout={layout}
                    hasContentBg={false}
                >
                    <Component/>
                </BasicLayout>
            )
        }

        const menu = menus.find(item => item.code === code)

        if (!menu || !allRights.find(item => item.menuId === menu.id && item.type === 0)) {
            return (
                <BasicLayout
                    user={user}
                    menu={{name: '403', description: '没有该页面的访问权限，返回首页', id: '403'}}
                    menus={menus}
                    layout={layout}
                    hasContentBg={false}
                >
                    <PageNoPermission/>
                </BasicLayout>
            )
        }
        const rights = allRights.filter(item => item.menuId === menu.id && item.type === 1)

        return (
            <BasicLayout
                menu={menu}
                user={user}
                menus={menus}
                layout={layout}
            >
                <Component rights={rights} user={user} match={match}/>
            </BasicLayout>
        )
    }
}

PrivateRoute.propTypes = {
    user: PropTypes.object,
    menus: PropTypes.array,
    rights: PropTypes.array,

    layout: PropTypes.string,
    match: PropTypes.any,
    code: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
}


export default connect(state => {
    return {
        user: state.global.user,
        menus: state.global.menus,
        rights: state.global.rights,
    }
})(PrivateRoute)