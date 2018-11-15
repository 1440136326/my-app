import React from 'react';
import {Modal,Form,Input,Checkbox} from 'antd';
import {connect,actions} from 'mirrorx';


class ThresholdModal extends React.Component{

    handleOk=()=>{
        actions.bcjgyjxf.CloseThreshold()
    }
    handleCancel=()=>{
        actions.bcjgyjxf.CloseThreshold()
    }
    handleSubmit=(val)=>{
        console.log(val);
        this.handleOk();
    }
    render(){
        const {getFieldDecorator,validateFields,resetFields}=this.props.form
        const formItemLayout={
            labelCol:{
                span:6
            },
            wrapperCol:{
                span:15
            }
        }
        return <Modal title="告警配置---添加" visible={this.props.isOpen} onOk={()=>{
            validateFields((err,value)=>{
                if(err) return
                this.handleSubmit(value)
            })
        }} onCancel={this.handleCancel} afterClose={()=>resetFields()}>
            <Form>
                <Form.Item label="单位" {...formItemLayout}>
                    {
                        getFieldDecorator('unit',{
                            rules:[{required:true,message:'请填写单位'}]
                        })(
                            <Input placeholder="单位" />
                        )
                    }
                </Form.Item>
                <Form.Item label="告警名称" {...formItemLayout}>
                    {
                        getFieldDecorator('alarmName',{
                            rules:[{required:true,message:'请填写告警名称'}]
                        })(
                            <Input placeholder="告警名称" />
                        )
                    }
                </Form.Item>
                <Form.Item label="告警阈值" {...formItemLayout}>
                    {
                        getFieldDecorator('threshold',{
                            rules:[{required:true,message:'请填写告警阈值'}]
                        })(
                            <Input placeholder="告警阈值" />
                        )
                    }
                </Form.Item>
                <Form.Item label="通知发送方式" {...formItemLayout}>
                    {
                        getFieldDecorator('send',{
                            rules:[{required:true,message:'请填写发送方式'}]
                        })(
                            <Input placeholder="通知发送方式" />
                        )
                    }
                </Form.Item>
                <Form.Item label="告警负责人" {...formItemLayout}>
                    {
                        getFieldDecorator('person', {
                            initialValue: ['张三']
                        })(
                                <Checkbox.Group options={['张三','李四']} />
                        )
                    }
                </Form.Item>
            </Form>
        </Modal>
    }

}
export default connect(state=>{
    return {
        isOpen:state.bcjgyjxf.isOpen
    }
})(Form.create()(ThresholdModal))