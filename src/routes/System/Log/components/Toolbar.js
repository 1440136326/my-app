import React from 'react'
import {Form,Input,Select,Button,DatePicker,Upload,Icon} from 'antd'
import moment from 'moment'

const LogFilter = ({form,isLoading,filter,types=[],onQuery})=> {


    const {getFieldDecorator} = form
    const onSubmit = (e) => {
        e.preventDefault()
        const values = form.getFieldsValue()

        onQuery(Object.assign({}, values, {
            start: 0,
            startTime: values.time[0].format('YYYY-MM-DD'),
            endTime: values.time[1].format('YYYY-MM-DD')
        }))
    }
    return (
        <div className="page-toolbar">
            <Form layout="inline" onSubmit={onSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('time',{
                            initialValue: [moment(filter.startTime),moment(filter.endTime)]
                        })(
                            <DatePicker.RangePicker
                                style={{width:220}}
                                allowClear={false}
                                ranges={{
                                    '今天': [moment(), moment()],
                                    '昨天': [moment().add(-1,'day'), moment().add(-1,'day')],
                                    '本月': [moment().startOf('month'), moment().endOf('month')] ,
                                    '上月': [moment().add(-1,'month').startOf('month'),moment().add(-1,'month').endOf('month')]
                                }}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('logType', {
                            initialValue: filter.logType
                        })(
                            <Select style={{width: 100}}>
                                <Select.Option value="">日志类型</Select.Option>
                                {types.map(item => <Select.Option key={item.name}
                                                                   value={item.name}>{item.name}</Select.Option>)}
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('logLevel', {
                            initialValue: filter.logLevel
                        })(
                            <Select style={{width: 100}}>
                                <Select.Option value="">日志级别</Select.Option>
                                <Select.Option value="0">DEBUG</Select.Option>
                                <Select.Option value="1">INFO</Select.Option>
                                <Select.Option value="2">WARN</Select.Option>
                                <Select.Option value="3">ERROR</Select.Option>
                                <Select.Option value="4">FATAL</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('keywords', {
                            initialValue: filter.keywords
                        })(
                            <Input placeholder="关键字" style={{width: 90}}/>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('address', {
                            initialValue: filter.address
                        })(
                            <Input placeholder="IP地址" style={{width: 90}}/>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('userName', {
                            initialValue: filter.userName
                        })(
                            <Input placeholder="操作人" style={{width: 70}}/>
                        )
                    }
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" icon="search" loading={isLoading}>查询</Button>
                </Form.Item>

            </Form>
            <Upload action="/api">
                <Button ><Icon type="upload"/>上传</Button>
            </Upload>
        </div>
    )
}

export default Form.create()(LogFilter)