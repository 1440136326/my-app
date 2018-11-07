import React from 'react'

import {Modal,Form,Input} from 'antd'

import {isIP,isIPList,isIPRange} from '../../../../utils/utils'

const AclModal = ({form,editItem,show=false,onSave,onCancel,isSaving}) => {

    const {getFieldDecorator, validateFields,resetFields} = form

    const onSubmit = () => {
        validateFields((err, values) => {
            if (err)
                return
            onSave(Object.assign({}, editItem, values))
        })
    }

    const onCheckIP = (rule,value,callback)=> {

        if (value === '*' || isIP(value) || isIPList(value) || isIPRange(value))
            callback()
        else
            callback('IP规则不符合规范')
    }

    return (
        <Modal
            title={`编辑 [${editItem ? editItem.name : '-'}] 的IP规则`}
            visible={show}
            closable={false}
            maskClosable={false}
            onCancel={()=>{
                if(!isSaving)
                    onCancel()
            }}
            onOk={onSubmit}
            afterClose={() => {
                resetFields()
            }}
            confirmLoading={isSaving}
        >
            <Form>
                <Form.Item label="IP规则">
                    {getFieldDecorator('ipRule', {
                        rules: [
                            {required: true, message: '请填写IP规则'},
                            {validator: onCheckIP}
                        ],
                        initialValue: editItem ? editItem.ipRule : ''
                    })(
                        <Input placeholder="请填写IP规则"/>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )

}

export default Form.create()(AclModal)