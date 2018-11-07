import React from 'react'
import {connect,actions} from 'mirrorx'

import {Card,Switch,message,Slider,Badge,Collapse,Alert} from 'antd'

import TableACL from './components/Table'
import TableLockedUser from './components/TableLockedUser'
import ModalAcl from './components/Modal'

import './index.css'

class SafetyIndex extends React.Component {

    state= {
        isFirstLoading: true,
        isEditAclOpen: false,
        editAclItem: null,

        isLoadingLocked: false,
        lockedUser: []
    }

    componentWillMount = () => {
        this.onQuery()
        this.onQueryLockedUser()
    }

    onQuery = () => {
        actions.system_safety.query().then(result=>{
            if(result.status === 1)
                this.setState({isFirstLoading:false})
        })
    }

    onQueryLockedUser = ()=> {
        this.setState({isLoadingLocked: true})
        actions.system_user.queryLocked().then(result => {
            this.setState({isLoadingLocked: false})
            if (result.status === 1) {
                this.setState({lockedUser: result.data})
            }
        })
    }

    onSave = (name,value)=> {
        const params = {}
        params[name] = value
        actions.system_safety.save(params).then(result => {
            if (result.status === 1) {
                //message.success(result.message)
                this.onQuery()
            } else {
                message.error(result.message)
            }
        })
    }
    onSaveAcl = ({userId,ipRule}) => {
        actions.system_safety.saveAcl({userId, ip: ipRule}).then(result => {
            if (result.status === 1) {
                message.success(result.message)
                this.onQuery()
                this.setState({
                    isEditAclOpen: false,
                })
            } else {
                message.error(result.message)
            }
        })
    }

    onEditAclOpen = (acl) => {
        this.setState({
            isEditAclOpen: true,
            editAclItem: acl,
            isSavingAcl: false
        })
    }

    render = () => {

        const {isLoading, isSaving, safety, acls} = this.props
        const {isFirstLoading} = this.state
        const {
            loginErrorRuleEnabled,
            loginErrorNumber,
            loginErrorLockMinutes,
            tokenExpireEnabled,
            tokenExpireMinutes,
            passwordExpireEnabled,
            passwordExpireDay,
            aclEnabled,
            passwordDefaultCheckEnabled,
        } = safety


        const tableAclProps = {
            data: acls,
            onEdit: this.onEditAclOpen
        }

        const tableLockedUserProps = {
            isLoading: this.state.isLoadingLocked,
            data: this.state.lockedUser,
            onClear: (uid) => {
                this.setState({isLoadingLocked: true})
                actions.system_user.deleteLocked(uid).then(result => {
                    this.setState({isLoadingLocked: false})
                    if (result.status === 1) {
                        this.onQueryLockedUser()
                        message.success(result.message)
                    } else {
                        message.error(result.message)
                    }
                })
            }
        }

        const modalAclProps= {
            show: this.state.isEditAclOpen,
            editItem: this.state.editAclItem,
            onCancel: () => {
                this.setState({
                    isEditAclOpen: false
                })
            },
            onSave: this.onSaveAcl,
            isSaving: this.props.isSaving
        }


        return (
            <div>
                <Collapse accordion bordered={true} defaultActiveKey={['1']} className='safety-collapse'>
                    <Collapse.Panel
                        header={<span><Badge status={loginErrorRuleEnabled?'processing':'default'}/>登陆错误策略</span>}
                        key="1"
                    >
                        <Card
                            loading={isFirstLoading}
                            bordered={false}
                        >
                            <div style={{marginBottom:12}}>
                                <Switch
                                    checkedChildren="已启用"
                                    unCheckedChildren="已关闭"
                                    loading={isSaving || isLoading}
                                    checked={loginErrorRuleEnabled}
                                    onClick={() => {
                                        this.onSave('loginErrorRuleEnabled', !loginErrorRuleEnabled)
                                    }}
                                />
                            </div>

                            <Badge
                                status={loginErrorRuleEnabled?'processing':'default'}
                                text={<span>连续登陆错误达到 <b>{loginErrorNumber || '-'}</b> 次，锁定账号</span>}
                            />
                            <Slider
                                style={{width: 500, padding: '4px 0 20px 0'}}
                                min={3}
                                max={10}
                                step={1}
                                marks={{
                                    3: '3次',
                                    5: '5次',
                                    10: '10次'
                                }}
                                tipFormatter={val => `${val}次`}
                                defaultValue={loginErrorNumber}
                                disabled={!loginErrorRuleEnabled}
                                onAfterChange={(value) => {
                                    this.onSave('loginErrorNumber', value)
                                }}
                            />

                            <Badge
                                status={loginErrorRuleEnabled?'processing':'default'}
                                text={<span>达到最大错误次数后，锁定账号 <b>{loginErrorLockMinutes || '-'}</b> 分钟</span>}
                            />
                            <Slider
                                style={{width: 500, padding: '4px 0 20px 0'}}
                                min={5}
                                max={180}
                                step={5}
                                marks={{
                                    5: '5分钟',
                                    30: '30分钟',
                                    60: '1小时',
                                    120: '2小时',
                                    180: '3小时'
                                }}
                                tipFormatter={val => `${val}分钟`}
                                defaultValue={loginErrorLockMinutes}
                                disabled={!loginErrorRuleEnabled}
                                onAfterChange={(value) => {
                                    this.onSave('loginErrorLockMinutes', value)
                                }}
                            />

                            <div style={{margin:'32px 0 0 0'}}>
                                <Badge style={{margin:'6px 0 '}}
                                    status={loginErrorRuleEnabled?'processing':'default'}
                                    text={<span>当前锁定账号清单</span>}
                                />
                                <TableLockedUser {...tableLockedUserProps}/>
                            </div>

                        </Card>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header={<span><Badge status={tokenExpireEnabled?'processing':'default'}/>会话超时策略</span>}
                        key="2"
                    >
                        <Card
                            loading={isFirstLoading}
                            bordered={false}
                        >

                            <div style={{marginBottom:12}}>
                                <Switch
                                    style={{marginBottom:12}}
                                    checkedChildren="已启用"
                                    unCheckedChildren="已关闭"
                                    loading={isSaving || isLoading}
                                    checked={tokenExpireEnabled}
                                    onClick={() => {
                                        this.onSave('tokenExpireEnabled', !tokenExpireEnabled)
                                    }}
                                />
                            </div>


                            <Badge
                                status={tokenExpireEnabled?'processing':'default'}
                                text={<span>会话有效期 <b>{tokenExpireMinutes || '-'}</b> 分钟，超过后需要重新登陆</span>}
                            />

                            <Slider
                                style={{width: 500, padding: '4px 0 20px 0'}}
                                min={60}
                                max={600}
                                step={30}
                                marks={{
                                    60: '1小时',
                                    180: '3小时',
                                    600: '10小时'
                                }}
                                tipFormatter={val => `${val}分钟`}
                                defaultValue={tokenExpireMinutes}
                                disabled={!tokenExpireEnabled}
                                onAfterChange={(value) => {
                                    this.onSave('tokenExpireMinutes', value)
                                }}
                            />


                        </Card>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header={<span><Badge status={passwordExpireEnabled?'processing':'default'}/>密码过期策略</span>}
                        key="3"
                    >
                        <Card
                            loading={isFirstLoading}
                            bordered={false}
                        >

                            <div style={{marginBottom:12}}>
                                <Switch
                                    style={{marginBottom:12}}
                                    checkedChildren="已启用"
                                    unCheckedChildren="已关闭"
                                    loading={isSaving || isLoading}
                                    checked={passwordExpireEnabled}
                                    onClick={() => {
                                        this.onSave('passwordExpireEnabled', !passwordExpireEnabled)
                                    }}
                                />
                            </div>

                            <Badge
                                status={passwordExpireEnabled?'processing':'default'}
                                text={<span>用户需要在 <b>{passwordExpireDay||'-'}</b> 天内更新密码，否则会被要求强制修改</span>}
                            />

                            <Slider
                                style={{width: 500, padding: '4px 0 20px 0'}}
                                min={30}
                                max={365}
                                step={5}
                                marks={{
                                    30: '30天',
                                    90: '90天',
                                    180: '180天',
                                    365: '365天',
                                }}
                                tipFormatter={val => `${val}天`}
                                defaultValue={passwordExpireDay}
                                disabled={!passwordExpireEnabled}
                                onAfterChange={(value) => {
                                    this.onSave('passwordExpireDay', value)
                                }}
                            />
                        </Card>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header={<span><Badge status={passwordDefaultCheckEnabled?'processing':'default'}/>强制修改初始密码</span>}
                        key="4"
                    >
                        <Card
                            loading={isFirstLoading}
                            bordered={false}
                        >

                            <div style={{marginBottom:12}}>
                                <Switch
                                    style={{marginBottom:12}}
                                    checkedChildren="已启用"
                                    unCheckedChildren="已关闭"
                                    loading={isSaving || isLoading}
                                    checked={passwordDefaultCheckEnabled}
                                    onClick={() => {
                                        this.onSave('passwordDefaultCheckEnabled', !passwordDefaultCheckEnabled)
                                    }}
                                />
                            </div>

                            <Badge
                                status={passwordDefaultCheckEnabled?'processing':'default'}
                                text={<span>用户使用初始密码登录时，强制用户修改密码</span>}
                            />

                        </Card>
                    </Collapse.Panel>
                    <Collapse.Panel
                        header={<span><Badge status={aclEnabled?'processing':'default'}/>ACL白名单</span>}
                        key="5"
                    >
                        <Card
                            loading={isFirstLoading}
                            bordered={false}
                        >
                            <div style={{marginBottom:12}}>
                                <Switch
                                    style={{marginBottom:12}}
                                    checkedChildren="已启用"
                                    unCheckedChildren="已关闭"
                                    loading={isSaving || isLoading}
                                    checked={aclEnabled}
                                    onClick={() => {
                                        this.onSave('aclEnabled', !aclEnabled)
                                    }}
                                />
                            </div>

                            <Badge
                                status={aclEnabled?'processing':'default'}
                                text={<span>启用ACL白名单后，<b>系统管理员</b>必须通过符合绑定IP地址规则的IP才可以登录系统，IP地址规则可以是指定地址，多个地址，地址段，或者所有地址</span>}
                            />

                            <Alert
                                style={{margin:'10px 0 ',paddingBottom:0}}
                                message="IP地址规则示例"
                                description={<ul style={{marginLeft:-20}}>
                                    <li>10.0.0.1 单个地址</li>
                                    <li>10.0.0.1,10.0.0.2 多个地址</li>
                                    <li>10.0.0.1-10.0.0.10 地址段</li>
                                    <li>* 所有地址</li>
                                </ul>}
                                type="info"
                            />

                            <TableACL {...tableAclProps} />

                        </Card>
                    </Collapse.Panel>
                </Collapse>

                <ModalAcl {...modalAclProps}/>
            </div>
        )
    }
}


export default connect(state=>({
    isLoading: state.system_safety.isLoading,
    isSaving: state.system_safety.isSaving,
    safety: state.system_safety.safety || {},
    acls: state.system_safety.acls
}))(SafetyIndex)