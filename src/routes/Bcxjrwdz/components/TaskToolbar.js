import React from 'react';
import {Form,Button,Input,Select} from 'antd';

const TaskToolbar=({form})=>{

    const {getFieldDecorator}=form
    return(
        <Form layout="inline">
            <Form.Item>
                {
                    getFieldDecorator('name',{

                    })(
                       <Input placeholder="任务名称" />
                    )
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('type',{
                        initialValue:"TestType"
                    })(
                        <Select style={{width:160}}>
                            <Select.Option value="TestType">测试类型</Select.Option>
                            <Select.Option value="ping">Ping测试</Select.Option>
                            <Select.Option value="dns">DNS测试</Select.Option>
                            <Select.Option value="web">网页测试</Select.Option>
                            <Select.Option value="download">下载测试</Select.Option>
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" icon="search" type="primary">查询</Button>
            </Form.Item>
        </Form>
    )
}

export default Form.create()(TaskToolbar)