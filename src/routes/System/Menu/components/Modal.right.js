import React from 'react'
import PropTypes from 'prop-types'

import {connect,actions} from 'mirrorx'

import {Modal,Form,Input,message} from 'antd'


class RightForm extends React.Component {

    onSave = (values) => {
        const right = this.props.right
        const params = Object.assign({}, right, values)
        actions.system_right.save(params).then(result => {
            if (result.status === 1) {
                actions.system_right.queryByMenuId(right.menuId)
                actions.system_right.closeEdit()
                message.success(result.message)
            } else {
                message.error(result.message)
            }
        })
    }

    render() {
        const {isOpen, isSaving, right, form} = this.props
        const {getFieldDecorator, validateFields, resetFields} = form
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
        }

        return (
            <Modal
                title={right.id ? '编辑权限' : '新增权限'}
                visible={isOpen}
                closable={false}
                width={400}
                onCancel={actions.system_right.closeEdit}
                onOk={() => {
                    validateFields((err, values) => {
                        if (err)
                            return
                        this.onSave(values)
                    })
                }}
                confirmLoading={isSaving}
                afterClose={() => {
                    resetFields()
                }}
            >
                <Form>
                    <Form.Item label="权限名称" {...formItemLayout}>
                        {
                            getFieldDecorator('name', {
                                rules: [{required: true, message: '请填写权限名称'}],
                                initialValue:right.name || ''
                            })(
                                <Input placeholder="eg:删除用户权限"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="权限代码" {...formItemLayout}>
                        {
                            getFieldDecorator('code', {
                                rules: [{required: true, message: '请填写权限代码'}],
                                initialValue:right.code || ''
                            })(
                                <Input placeholder="eg:system.user.add"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="权限说明" {...formItemLayout}>
                        {
                            getFieldDecorator('description', {
                                rules: [{message: '请填写权限说明'}],
                                initialValue:right.description || ''
                            })(
                                <Input.TextArea rows={2}/>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

RightForm.propTypes = {
    isOpen: PropTypes.bool,
    isSaving:PropTypes.bool,
    right: PropTypes.object
}

export default connect(state => ({
    isOpen: state.system_right.isEditOpen,
    isSaving: state.system_right.isSaving,
    right: state.system_right.editItem || {},
}))(Form.create()(RightForm))