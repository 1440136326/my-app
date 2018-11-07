import React from 'react';
import {Input,Form,Button,Spin} from 'antd';

class Toolbar extends React.Component{

    onSubmit=(e)=>{
        e.preventDefault();
        const value=this.props.form.getFieldsValue();
        console.log(value);
    }
    render(){
        const {getFieldDecorator}=this.props.form
        return(
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <Form.Item>
                        {
                            getFieldDecorator('id',{

                            })(
                                <Input placeholder="监控任务ID" style={{width:100}} />
                            )
                        }
                    </Form.Item>
                    <Button type="primary" shape="circle" icon="search" htmlType="submit" />
                    <Button type="primary" shape="circle" icon="reload" />
                </Form>
                <Button type="primary">监控任务添加</Button>
            </div>
        )
    }
}

export default Form.create()(Toolbar)