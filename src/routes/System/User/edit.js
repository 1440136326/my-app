import React from 'react'
import {connect,actions} from 'mirrorx'

import {Form,Input,Button,Select,Spin,message,Icon} from 'antd'


class SystemUserEdit extends React.Component {

    state = {
        isLoading: false,
        isLoadComplete: false,
        user: null,
    }


    componentWillMount = () => {
        const {roles, isEdit} = this.props
        if (roles.length === 0)
            this.onInit();
        if (isEdit)
            this.onQuery()
    }

    onInit = () => {
        actions.system_role.query()
        actions.system_dept.query()
    }

    onQuery = () => {
        this.setState({isLoading: true})
        actions.system_user.queryById(this.props.userId).then(result => {
            this.setState({isLoading: false, isLoadComplete: true})
            if (result.status === 1 && result.data.length > 0) {
                this.setState({user: result.data[0]})
            }
        })
    }

    onSave = (e) => {
        e.preventDefault()

        const {form: {validateFields}, isEdit} = this.props
        const {user} = this.state

        validateFields((err, values) => {
            if (err)
                return

            const roleId = values.roleId.join(',')

            let params = Object.assign({}, values, {roleId})

            if (isEdit)
                params = Object.assign(params, {id: user.id})

            actions.system_user.save(params).then(result => {
                if (result.status === 1) {
                    message.success(result.message)
                    actions.system_user.query()
                    actions.routing.push('/system/user')
                } else {
                    message.error(result.message)
                }
            })

        })
    }

    render() {
        const {isInitializing, roles,depts, isEdit, form} = this.props
        const {user, isLoadComplete, isLoading} = this.state

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

        return (
            <Spin spinning={isInitializing || isLoading}>
                {
                    (isEdit && isLoadComplete && !user) ?
                        <div style={{textAlign: 'center', paddingTop: 60}}>
                            <Icon type="close-circle" style={{fontSize: 72, color: '#f00'}}/>
                            <h2 style={{padding: '40px 0 0 0'}}>用户不存在</h2>
                            <div style={{padding: '0 0 40px 0'}}>请确认是否通过正确的途径进入页面，建议点击返回，重新选取用户进行编辑</div>
                            <div>
                                <Button onClick={() => {
                                    actions.routing.push('/system/user')
                                }}>返回</Button>
                                &nbsp;
                                <Button type="primary" onClick={() => {
                                    this.onQuery()
                                }}>重试</Button>
                            </div>
                        </div> :
                        <Form style={{marginTop:40}} onSubmit={this.onSave}>
                            <Form.Item label="用户名" extra={user?null:"用户名填写后不可修改，请认真填写"} {...formItemLayout}>
                                {getFieldDecorator('uid', {
                                    rules: [{required: true, message: '请填写用户名'}],
                                    initialValue: user ? user.uid : '',
                                })(
                                    <Input placeholder="请填写用户名" disabled={!!user}/>
                                )}
                            </Form.Item>
                            <Form.Item label="姓名" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请填写姓名'}],
                                    initialValue: user ? user.name : '',
                                })(
                                    <Input placeholder="请填写用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item label="角色" {...formItemLayout}>
                                {getFieldDecorator('roleId', {
                                    rules: [{required: true, message: '请选择用户角色'}],
                                    initialValue: user ? user.roles.map(role=> role.id) : [],
                                })(
                                    <Select mode="multiple"  placeholder="请选择用户角色">
                                        {roles.map(item => <Select.Option key={item.id}
                                                                          value={item.id}>{item.name}</Select.Option>)}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="部门" {...formItemLayout}>
                                {getFieldDecorator('deptId', {
                                    rules: [{required: true, message: '请选择用户部门'}],
                                    initialValue: user ? user.deptId : ''
                                })(
                                    <Select>
                                        <Select.Option value="">请选择</Select.Option>
                                        {depts.map(item => <Select.Option key={item.id}
                                                                          value={item.id}>{item.name}</Select.Option>)}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="电话" {...formItemLayout}>
                                {getFieldDecorator('phone', {
                                    initialValue: user ? user.phone : ''
                                })(
                                    <Input placeholder="请填写电话"/>
                                )}
                            </Form.Item>
                            <Form.Item label="邮箱" {...formItemLayout}>
                                {getFieldDecorator('email', {
                                    initialValue: user ? user.email : ''
                                })(
                                    <Input placeholder="请填写邮箱"/>
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button disabled={this.props.isSaving} onClick={() => {
                                    actions.routing.push('/system/user')
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
        isInitializing: state.system_role.isLoading || state.system_dept.isLoading,
        isSaving: state.system_user.isSaving,
        roles: state.system_role.data,
        depts: state.system_dept.data,
        userId: params.id || null,
        isEdit: !!params.id
    }
})(Form.create()(SystemUserEdit))