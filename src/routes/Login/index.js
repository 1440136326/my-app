import React from 'react'
import {connect,actions,Link} from 'mirrorx'
import moment from 'moment'

import {Form,Input,Checkbox,Button,Icon,Slider,Tooltip,Card,message} from 'antd'

import {APP_NAME} from '../../constant'
import Storage from '../../utils/storage'

import './index.css'

class Index extends React.Component {

    state = {
        isNeedSliderVerify: Math.random() > 0.5,
        isSliderVerified: false,
    }

    onLogin = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err)
                return
            const {uid, remember} = values
            actions.global.login(values).then(result => {
                if (result.status === 1) {
                    message.success('登陆成功')
                    Storage.setToken({...result.data[0].token, insertTime: moment().valueOf()})
                    Storage.setRememberUid(remember ? uid : null)
                }
                else {
                    message.error(result.message, 5)
                }

            })
        })
    }

    onSliderVerifying = (val) => {
        if (val < 100)
            this.props.form.setFieldsValue({captcha: 0})
        else
            this.setState({isSliderVerified: true})
    }

    render = () => {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login-pager">
                <Card className="login-card">
                    <img className="logo" alt={APP_NAME} src="/images/logo.svg"/>
                    <div className="header">{APP_NAME}</div>
                    <Form onSubmit={this.onLogin}>
                        <Form.Item>
                            {getFieldDecorator('uid', {
                                rules: [{required: true, message: '请填写用户名'}],
                                initialValue: 'tkwh'
                            })(
                                <Input
                                    prefix={<Icon type="user"/>}
                                    placeholder="请填写用户名"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('pwd', {
                                rules: [{required: true, message: '请填写密码'}],
                                initialValue: 'Abcd#1234'
                            })(
                                <Input
                                    type="password"
                                    prefix={<Icon type="lock"/>}
                                    placeholder="请填写密码"/>
                            )}
                        </Form.Item>
                        <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>记住用户名</Checkbox>
                            )}
                            <Link className="changePwd" to="/changePwd">修改密码</Link>
                        </Form.Item>
                        <Form.Item>
                            {
                                (this.state.isNeedSliderVerify && !this.state.isSliderVerified) ?
                                    <div className='captcha'>
                                        {getFieldDecorator('captcha', {
                                            initialValue: 0
                                        })(
                                            <Slider tipFormatter={null}
                                                    onAfterChange={this.onSliderVerifying}/>
                                        )}
                                    </div> : null
                            }

                            <Button type="primary" htmlType="submit" className="login-btn"
                                    disabled={this.state.isNeedSliderVerify && !this.state.isSliderVerified}
                                    loading={this.props.isLogging}
                            >
                                {this.props.isLogging ? '正在登录' : '登录'}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="powered">
                        Powered By TechQuick.Hefei
                        <br/>
                        推荐使用浏览器&nbsp;
                        <Tooltip overlay={<div>谷歌浏览器，点击下载 </div>}>
                            <a href="/software/Chrome.exe"><Icon type="chrome"/></a>
                        </Tooltip>
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(state=>({
    isLogging: state.global.isLogging,
}))(Form.create()(Index))