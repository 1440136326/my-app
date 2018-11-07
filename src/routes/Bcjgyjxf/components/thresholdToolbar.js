import React from 'react';
import {Form,Input,Button} from 'antd';
import {actions} from 'mirrorx';
import ThresholdModal from './thresholdModal';

const ThresholdToolbar=({form})=>{

    const handleOpen=()=>{
        actions.bcjgyjxf.OpenThreshold()
    }
    const {getFieldDecorator}=form
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Form layout="inline">
                <Form.Item>
                    {
                        getFieldDecorator('name',{

                        })(
                            <Input placeholder="告警名称" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon="search">查询</Button>
                </Form.Item>
            </Form>
            <div>
                <Button type="primary" onClick={handleOpen}>添加告警配置</Button>
                <ThresholdModal />
            </div>
        </div>
    )
}

export default Form.create()(ThresholdToolbar)