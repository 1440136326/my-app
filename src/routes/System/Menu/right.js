import React from 'react'
import {connect,actions} from 'mirrorx'

import FormModal from  './components/Modal.right'

import {Form,Button,Checkbox,Spin,List,Popconfirm,Card,message,Icon} from 'antd'


class SystemMenuRightConfig extends React.Component {

    state= {
        isLoadComplete: false
    }

    componentWillMount = () => {
        this.onQuery()
    }

    onQuery = ()=> {
        actions.system_right.queryByMenuId(this.props.menuId).then(result => {
            this.setState({isLoadComplete:true})
            if (result.status !== 1)
                message.error(result.message)
        })
    }

    onSwitch = ({rightId, roleId}) => {
        actions.system_right.switch({rightId, roleId}).then(result => {
            if (result.status === 1) {
                this.onQuery()
            } else {
                message.error(result.message)
            }
        })
    }

    onSwitchAll = ({rightId, toggle}) => {
        actions.system_right.switchAll({rightId, toggle}).then(result => {
            if (result.status === 1) {
                this.onQuery()
            } else {
                message.error(result.message)
            }
        })
    }

    onDelete = (id) => {
        actions.system_right.delete(id).then(result => {
            if (result.status === 1) {
                this.onQuery()
                message.success(result.message)
            }
            else
                message.error(result.message)
        })
    }

    renderSwitches = ({right, roles}) => {
        const isSwitching = this.props.switching.find(rightId => rightId === right.id)
        const checkedCount = roles.filter(({hasRight}) => hasRight === true).length
        return (
            <div>
                <Checkbox
                    indeterminate={checkedCount > 0 && checkedCount < roles.length}
                    checked={checkedCount === roles.length}
                    onChange={({target}) => {
                        this.onSwitchAll({rightId: right.id, toggle: target.checked ? 1 : 0})
                    }}
                >
                    所有角色
                </Checkbox>
                {isSwitching ? <Icon type="loading"/> : null}
                <div style={{ marginTop: 8}}>
                    {
                        roles.map(({role, hasRight}) => (
                            <Checkbox
                                key={role.id}
                                checked={hasRight}
                                onChange={() => {
                                    this.onSwitch({roleId: role.id, rightId: right.id})
                                }}
                            >
                                {role.name}
                            </Checkbox>
                        ))
                    }
                </div>
            </div>
        )
    }

    renderRightOfView = () => {

        const item = this.props.rights.find(item => item.right.type === 0)

        if (!item)
            return null
        return (
            <div>
                <h3>
                    访问权限配置:
                </h3>
                {this.renderSwitches(item)}
            </div>
        )
    }

    renderRightOfOperation = ({right, roles}) => {

        return (
            <List.Item
                key={right.id}
            >
                <List.Item.Meta
                    title={
                        <span>
                            {right.name}
                            &nbsp;
                            &nbsp;
                            <Button shape="circle" size="small" icon="edit" onClick={()=>{actions.system_right.openEdit(right)}}/>
                            &nbsp;
                            <Popconfirm title="确认删除权限?" onConfirm={()=>{this.onDelete(right.id)}}>
                                <Button shape="circle" size="small" icon="delete" />
                            </Popconfirm>
                        </span>
                    }
                    description={<div>
                        <div>权限代码:{right.code}</div>
                        <div>权限描述:{right.description || '-'}</div>

                    </div>}
                />
                {this.renderSwitches({right, roles})}
            </List.Item>
        )
    }


    render() {
        const {isLoading,isDeleting,menu,rights} = this.props

        const rightsOfOperations = rights.filter(item => item.right.type === 1)

        return (
            <Spin spinning={isLoading || isDeleting}>
                {
                    (this.state.isLoadComplete && !menu) ?
                        <div style={{textAlign: 'center', paddingTop: 60}}>
                            <Icon type="close-circle" style={{fontSize: 72, color: '#f00'}}/>
                            <h2 style={{padding: '40px 0 0 0'}}>菜单不存在</h2>
                            <div style={{padding: '0 0 40px 0'}}>请确认是否通过正确的途径进入页面，建议点击返回，重新选取菜单进行权限配置</div>
                            <div>
                                <Button onClick={() => {
                                    actions.routing.push('/system/menu')
                                }}>返回</Button>
                                &nbsp;
                                <Button type="primary" onClick={() => {
                                    this.onQuery()
                                }}>重试</Button>
                            </div>
                        </div> :
                        <div>
                            <Card>
                                <div style={{paddingBottom: 20}}>
                                    <h3>
                                        <Button shape="circle" icon="arrow-left" onClick={() => {
                                            actions.routing.push('/system/menu')
                                        }}/>
                                        &nbsp;
                                        {menu ? menu.fullName : '-'}
                                    </h3>
                                    菜单描述:{menu ? (menu.description || '-') : '-'}<br/>
                                    菜单代码:{menu ? (menu.code || '-') : '-'}
                                </div>
                                {this.renderRightOfView()}
                            </Card>
                            <br/>


                            <Card
                                title="菜单操作权限"
                                type="inner"
                            >
                                <div className="toolbar">
                                    <Button type="primary" icon="plus"
                                            onClick={actions.system_right.openAdd}>新增权限</Button>
                                </div>
                                <List
                                    itemLayout="vertical"
                                    dataSource={rightsOfOperations}
                                    renderItem={this.renderRightOfOperation}
                                />

                            </Card>
                            <FormModal/>
                        </div>
                }
            </Spin>
        )
    }

}

export default connect((state,{match:{params}})=> {
    return {
        isLoading: state.system_right.isLoading,
        isSaving: state.system_right.isSaving,
        isSwitching: state.system_right.isSwitching,
        isDeleting: state.system_right.isSwitching,
        switching:state.system_right.switching,
        menu:state.system_right.menu,
        rights:state.system_right.rights,

        menuId: params.id || null,
    }
})(Form.create()(SystemMenuRightConfig))