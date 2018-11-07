import React from 'react'
import {actions} from 'mirrorx'

import {Form,Input,Button,message,Icon,Alert} from 'antd'

import Layout from  '../../layouts'


class ChangePwdIndex extends React.Component {

    state = {
        isSaving: false
    }

    componentWillMount = () => {

    }

    onSave = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err)
                return

            this.setState({
                isSaving: true
            })

            actions.system_user.changePwd(values).then(result => {
                this.setState({
                    isSaving: false
                })

                if (result.status === 1) {
                    message.success(result.message)
                    actions.routing.goBack()
                } else {
                    message.error(result.message)
                }
            })
        })

    }

    render =() =>{
        const {form} = this.props
        const {isSaving} = this.state

        const {getFieldDecorator,getFieldValue} = form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
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
                    offset: 8,
                },
            },
        }

        return (
            <Layout layout="layout-tc" menu={{id:'changePwd',name:'修改密码',description:'修改密码',icon:'edit'}}>
                <Alert message='定期修改密码有利于提高账户的安全性' showIcon/>
                <Form style={{marginTop: 40}} onSubmit={this.onSave}>
                <Form.Item label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator('uid', {
                            rules: [
                                {required: true, message: '请填写用户名'}
                            ],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请填写用户名"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="原密码" {...formItemLayout}>
                    {
                        getFieldDecorator('oldPwd', {
                            rules: [{required: true, message: '请填写原密码'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="请填写原密码"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="新密码" {...formItemLayout}
                           extra={'密码要求长度不少于6位，且包含数字、字母和符号(~!@#$%^&*()_+`-={}:";\'<>?,.)'}>
                    {
                        getFieldDecorator('newPwd', {
                            rules: [
                                {required: true, message: '请填写新密码'},
                                {min: 6, message: '密码长度不能小于6位'},
                                {max: 30, message: '密码太长了'},
                                {
                                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.]).{6,18}$/,
                                    message: '密码强度不符合要求'
                                }
                            ],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="请填写新密码"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="重复新密码" {...formItemLayout}>
                    {
                        getFieldDecorator('newPwdConfirm', {
                            rules: [
                                {required: true, message: '请再次填写新密码'},
                                {
                                    validator: (rule, value, callback) => {
                                        if (value && value !== getFieldValue('newPwd')) {
                                            callback('两次输入的密码不一致');
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                            ],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="请再次填写新密码"/>
                        )
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button disabled={isSaving} onClick={() => {
                        actions.routing.push('/')
                    }}>取消</Button> &nbsp;
                    <Button loading={isSaving} type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
            </Layout>
        )
    }
}

export default Form.create()(ChangePwdIndex)