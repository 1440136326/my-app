import React from 'react';
import {Form,Select,Input,Button,Icon,DatePicker} from 'antd';
import moment from 'moment';

const ConfirmToolbar=({form})=>{

    const {getFieldDecorator}=form
    const onSubmit=(e)=>{
        e.preventDefault();
        var value=form.getFieldsValue();
        console.log(value);
    }
    return(
        <div className="page-toolbar">
            <Form layout="inline" onSubmit={onSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('condition',{
                            initialValue:'0'
                        })(
                            <Select style={{width:100}}>
                                <Select.Option value="0">筛选条件</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('keyWords',{

                        })(
                            <Input style={{width:100}} placeholder="关键字" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('target',{

                        })(
                            <Input style={{width:100}} placeholder="告警对象" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('alarmType',{
                            initialValue:'0'
                        })(
                            <Select style={{width:100}}>
                                <Select.Option value="0">告警类型</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('alarmLevel',{
                            initialValue:'0'
                        })(
                            <Select style={{width:100}}>
                                <Select.Option value="0">告警级别</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('time',{
                            initialValue:[moment(),moment()]
                        })(
                            <DatePicker.RangePicker style={{width:250}} ranges={{
                                '今天':[moment(),moment()],
                                '昨天':[moment().add(-1,'day'),moment().add(-1,'day')],
                                '本月':[moment().startOf('month'),moment().endOf('month')]
                            }} />
                        )
                    }
                </Form.Item>
                <Button type="primary" htmlType="submit" shape="circle" icon="search" />
                <Button type="primary" shape="circle" icon="reload" />
            </Form>
            <div><Button.Group>
                <Button><Icon type="check-square-o" />确认</Button>
                <Button><Icon type="download" />下载</Button>
                <Button><Icon type="retweet" />刷新</Button>
            </Button.Group></div>
        </div>
    )
}
export default Form.create()(ConfirmToolbar)