import React from 'react'
import PropTypes from 'prop-types'
import {actions} from 'mirrorx'

import {Layout,Menu,Icon,Popover,Modal,message,Tooltip,Tag} from 'antd'
import moment from 'moment'
import groupBy from 'lodash/groupBy'

import MainMenu from './components/Menu.main'
import BreadcrumbMenu from './components/Menu.breadcrumb'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon'

import {APP_NAME} from '../constant'
import Storage from '../utils/storage'

import './index.css'


/**
 *
 * @param menus
 * @param menu
 * @param user
 * @param children
 * @param hasContentBg
 * @param layout   layout-lc layout-tc
 * @returns {XML}
 * @constructor
 */
const BasicLayout = ({menus,menu,user,children,hasContentBg=true,layout='layout-lc'}) => {
/**通知消息数据*/
    const data = [{
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: '通知',
    }, {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: '通知',
    },
    {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: '通知',
    }, {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: '通知',
    }, {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: '通知',
    }, {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: '消息',
    }, {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: '消息',
    }, {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: '消息',
    }, {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: '待办',
    }, {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: '待办',
    }, {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: '待办',
    }, {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: '待办',
    }];

    function getNoticeData(notices) {
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map((notice) => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = ({
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                })[newNotice.status];
                newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }
    const noticeData = getNoticeData(data);

    const onToolbarItemClick = ({key}) => {
        if (key === 'logout') {
            Modal.confirm({
                content: '确认退出系统?',
                onOk: () => {
                    message.success('已安全退出')
                    Storage.clearToken()
                    actions.global.logout()
                }
            })
        } else if (key === 'changePwd') {
            actions.routing.push('/changePwd')
        } else if (key === 'setting') {
            actions.routing.push('/setting')
        }

    }

    const classes = [layout]

    if (hasContentBg === false)
        classes.push('noContentBg')
    return (
        <div>
            {
                layout === 'layout-lc' ?
                    (

                        <Layout className={classes.join(' ')} style={{minHeight: '100vh'}}>
                            <Layout.Sider
                                collapsible={true}
                                width={240}
                            >
                                <div className='logo'>
                                    <span>{APP_NAME}</span>
                                </div>
                                <MainMenu
                                    menu={menu}
                                    menus={menus}
                                />
                            </Layout.Sider>
                            <Layout>
                                <Layout.Header>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        {
                                            menu ?
                                                <div className="pager-title">
                                                    <Icon type={menu.icon || 'file-text'}/>
                                                    <span className="title">{menu.name}</span>
                                                    <span className="subtitle">{menu.description || '-'}</span>
                                                </div> :
                                                null
                                        }
                                        {
                                            user ?
                                                <Menu
                                                    className="pager-toolbar"
                                                    mode="horizontal"
                                                    style={{display: 'inline-block'}}
                                                    onClick={onToolbarItemClick}
                                                >
                                                    <Menu.SubMenu
                                                        title={<span><Icon
                                                            type="user"/><span>欢迎，{user.name}</span></span>}>
                                                        <Menu.Item key="changePwd"><span><Icon
                                                            type="setting"/>修改密码</span></Menu.Item>
                                                        <Menu.Item key="setting"><span><Icon type="setting"/>个人设置</span></Menu.Item>
                                                    </Menu.SubMenu>
                                                    <Menu.Item>
                                                        <Popover title='导出清单' content={<div>1</div>}
                                                                 placement='bottomRight'>
                                                <span style={{
                                                    lineHeight: '64px',
                                                    height: '64px',
                                                    display: 'block'
                                                }}><Icon type="download"/></span>
                                                        </Popover>
                                                    </Menu.Item>
                                                    <Menu.Item key="logout">
                                                        <Tooltip title="退出系统" placement="left">
                                            <span>
                                                <Icon type="poweroff"/>
                                            </span>
                                                        </Tooltip>
                                                    </Menu.Item>
                                                    <Menu.Item key="notice">
                                                        <NoticeIcon count={5}>
                                                            <NoticeIcon.Tab title="通知" list={noticeData['通知']} />
                                                            <NoticeIcon.Tab title="消息" list={noticeData['消息']} />
                                                            <NoticeIcon.Tab title="待办" list={noticeData['待办']} />
                                                        </NoticeIcon>
                                                    </Menu.Item>
                                                </Menu>
                                                : null
                                        }

                                    </div>
                                </Layout.Header>
                                <Layout.Content>
                                    {
                                        menu ? <BreadcrumbMenu menu={menu} menus={menus}/> : null
                                    }

                                    <div className="main-content">
                                        {children || null}
                                    </div>
                                </Layout.Content>
                                <Layout.Footer>
                                    <i>Powered By TechQuick.Heifei</i>
                                </Layout.Footer>
                            </Layout>

                        </Layout>
                    ) :
                    null
            }

            {
                layout === 'layout-tc' ?
                    (
                        <Layout className={classes.join(' ')} style={{minHeight: '100vh'}}>
                            <Layout.Header>
                                <div className='logo'>
                                    <span>{APP_NAME}</span>
                                </div>
                                <MainMenu
                                    mode='horizontal'
                                    menu={menu}
                                    menus={menus}
                                />
                                {
                                    user ?
                                        <Menu
                                            className="pager-toolbar"
                                            mode="horizontal"
                                            theme='dark'
                                            onClick={onToolbarItemClick}
                                        >
                                            <Menu.SubMenu
                                                title={<span><Icon
                                                    type="user"/><span>欢迎，{user.name}</span></span>}>
                                                <Menu.Item key="changePwd"><span><Icon
                                                    type="setting"/>修改密码</span></Menu.Item>
                                                <Menu.Item key="setting"><span><Icon type="setting"/>个人设置</span></Menu.Item>
                                            </Menu.SubMenu>
                                            <Menu.Item>
                                                <Popover title='导出清单' content={<div>1</div>}
                                                         placement='bottomRight'>
                                        <span style={{
                                            lineHeight: '64px',
                                            height: '64px',
                                            display: 'block'
                                        }}><Icon type="download"/></span>
                                                </Popover>
                                            </Menu.Item>
                                            <Menu.Item key="logout">
                                                <Tooltip title="退出系统" placement="left">
                                                    <span>
                                                        <Icon type="poweroff"/>
                                                    </span>
                                                </Tooltip>
                                            </Menu.Item>
                                            <Menu.Item key="notice">
                                                <NoticeIcon count={5}>
                                                    <NoticeIcon.Tab title="通知" list={noticeData['通知']} />
                                                    <NoticeIcon.Tab title="消息" list={noticeData['消息']} />
                                                    <NoticeIcon.Tab title="待办" list={noticeData['待办']} />
                                                </NoticeIcon>
                                            </Menu.Item>
                                        </Menu>
                                        : null
                                }
                            </Layout.Header>
                            <Layout.Content>
                                {
                                    menu ? <BreadcrumbMenu menu={menu} menus={menus}/> : null
                                }
                                {
                                    menu ?
                                        <div className="pager-title">
                                            <Icon type={menu.icon || 'file-text'}/>
                                            <span className="title">{menu.name}</span>
                                            <span className="subtitle">{menu.description || '-'}</span>
                                        </div> :
                                        null
                                }
                                <div className="main-content">
                                    {children || null}
                                </div>
                            </Layout.Content>
                            <Layout.Footer>
                                <i>Powered By TechQuick.Hefei</i>
                            </Layout.Footer>
                        </Layout>
                    ) :
                    null
            }

        </div>
    )
}

BasicLayout.propTypes = {
    menus: PropTypes.array,
    menu: PropTypes.object,
    user: PropTypes.object,
    children: PropTypes.any,
    hasContentBg: PropTypes.bool,
    layout: PropTypes.string,
}



export default BasicLayout
