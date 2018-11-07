import React from 'react'
import {connect,actions} from 'mirrorx'

import {Form,Cascader,Input,Button,Checkbox,Spin,message,Icon,Modal} from 'antd'

import * as Helper from '../../../utils/utils'

class SystemMenuEdit extends React.Component {

    state = {
        isLoading: false,
        isLoadComplete: false,
        menu: null,
    }

    componentWillMount = () => {
        const {menus, isEdit} = this.props
        if (menus.length === 0)
            actions.system_menu.query()

        if (isEdit)
            this.onQuery()
    }

    onQuery = () => {
        this.setState({isLoading: true})
        actions.system_menu.queryById(this.props.menuId).then(result => {
            this.setState({isLoading: false, isLoadComplete: true})
            if (result.status === 1 && result.data.length > 0) {
                this.setState({menu: result.data[0]})
            }
        })
    }

    onSave = (e) => {
        e.preventDefault()

        const {form: {validateFields}, isEdit} = this.props
        const {menu} = this.state

        validateFields((err, values) => {
            if (err)
                return

            const parentId = values.parentId[values.parentId.length - 1]
            const show = values.show ? 1 : 0

            let params = Object.assign({}, values, {parentId, show})
            if (isEdit)
                params = Object.assign(params, {id: menu.id})

            actions.system_menu.save(params).then(result => {
                if (result.status === 1) {
                    message.success(result.message)
                    actions.system_menu.query()

                    if (isEdit) {
                        actions.routing.push('/system/menu')
                    } else {
                        Modal.confirm({
                            title: '新增菜单成功，是否前往权限配置页面配置该菜单的权限？',
                            onOk: () => {
                                actions.routing.push(`/system/menu/right/${result.data[0]}`)
                            },
                            onCancel: () => {
                                actions.routing.push('/system/menu')
                            },
                        })
                    }
                } else {
                    message.error(result.message)
                }
            })

        })
    }

    render() {
        const {isInitializing, menus, isEdit, form} = this.props
        const {menu, isLoadComplete, isLoading} = this.state

        const {getFieldDecorator} = form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        }

        const menuOptions = [{label: '根节点', value: '', children: Helper.buildCascaderOptions(menus)}]
        const menuValues = Helper.buildCascaderValue(menu ? menu.parentId : '', menus)


        return (
            <Spin spinning={isInitializing || isLoading}>
                {
                    (isEdit && isLoadComplete && !menu) ?
                        <div style={{textAlign: 'center', paddingTop: 60}}>
                            <Icon type="close-circle" style={{fontSize: 72, color: '#f00'}}/>
                            <h2 style={{padding: '40px 0 0 0'}}>菜单不存在</h2>
                            <div style={{padding: '0 0 40px 0'}}>请确认是否通过正确的途径进入页面，建议点击返回，重新选取菜单进行编辑</div>
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
                        <Form style={{marginTop: 40}} onSubmit={this.onSave}>
                            <Form.Item {...formItemLayout} label="上级菜单">
                                {getFieldDecorator('parentId', {
                                    rules: [{type: 'array', required: true, message: '请选择上级菜单'}],
                                    initialValue: [...menuValues]
                                })(
                                    <Cascader options={menuOptions} placeholder="请选择" changeOnSelect/>
                                )}
                            </Form.Item>
                            <Form.Item  {...formItemLayout} label="菜单名称">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请填写用菜单名称'}],
                                    initialValue: menu ? menu.name : ''
                                })(
                                    <Input placeholder="填写菜单名称"/>
                                )}
                            </Form.Item>
                            <Form.Item  {...formItemLayout} label="图标">
                                {getFieldDecorator('icon', {
                                    rules: [{type: 'string', required: true, message: '请填写图标代码'}],
                                    initialValue: menu ? menu.icon : ''
                                })(
                                    <Input placeholder="请填写图标代码"/>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="菜单代码">
                                {getFieldDecorator('code', {
                                    rules: [{required: true, message: '请填写菜单代码'}],
                                    initialValue: menu ? menu.code : ''
                                })(
                                    <Input placeholder="请填写菜单代码，作为菜单唯一标识，不可重复"/>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="菜单地址">
                                {getFieldDecorator('url', {
                                    initialValue: menu ? menu.url : ''
                                })(
                                    <Input placeholder="请填写菜单地址"/>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="描述">
                                {getFieldDecorator('description', {
                                    initialValue: menu ? menu.description : ''
                                })(
                                    <Input.TextArea rows={4} placeholder="请填写描述信息"/>
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                {getFieldDecorator('show', {
                                    initialValue: menu ? menu.show === 1 : true,
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>在导航菜单中显示</Checkbox>
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button disabled={this.props.isSaving} onClick={() => {
                                    actions.routing.push('/system/menu')
                                }}>取消</Button> &nbsp;
                                <Button loading={this.props.isSaving} type="primary" htmlType="submit">保存</Button>
                            </Form.Item>
                        </Form>
                }
            </Spin>
        )
    }
}

export default connect((state,{match:{params}})=> {
    return {
        isInitializing: state.system_menu.isLoading,
        isSaving: state.system_menu.isSaving,
        menus: state.system_menu.data,
        menuId: params.id || null,
        isEdit: !!params.id
    }
})(Form.create()(SystemMenuEdit))