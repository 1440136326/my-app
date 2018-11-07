import React from 'react';
import {Form,Button,Input} from 'antd';

const LogToolbar=({form})=>{

    const {getFieldDecorator}=form
    return (
        <Form layout="inline">
            <Form.Item>
                {
                    getFieldDecorator('name',{

                    })(
                        <Input placeholder="网元名称" />
                    )
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" icon="search">查询</Button>
            </Form.Item>
        </Form>
    )
}

export default Form.create()(LogToolbar)