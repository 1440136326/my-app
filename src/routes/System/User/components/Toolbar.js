import React from 'react'
import PropTypes from 'prop-types'

import {Form,Input,Select,Button} from 'antd'

const UserToolbar = ({form,isLoading,filter,depts=[],roles=[],onQuery,onAdd})=> {

    const {getFieldDecorator} = form
    const onSubmit = (e) => {
        e.preventDefault()
        onQuery(form.getFieldsValue())
    }
    return (
        <div className="page-toolbar">
            <Form layout="inline" onSubmit={onSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('name', {
                            initialValue: filter.name || ''
                        })(
                            <Input placeholder="姓名"/>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('deptId', {
                            initialValue: filter.deptId || ''
                        })(
                            <Select style={{width: 120}}>
                                <Select.Option value="">请选择部门</Select.Option>
                                {depts.map(item => <Select.Option key={item.id}
                                                                  value={item.id}>{item.name}</Select.Option>)}
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('roleId', {
                            initialValue: filter.roleId || ''
                        })(
                            <Select style={{width: 120}}>
                                <Select.Option value="">请选择角色</Select.Option>
                                {roles.map(item => <Select.Option key={item.id}
                                                                  value={item.id}>{item.name}</Select.Option>)}
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('enabled', {
                            initialValue: filter.enabled || ''
                        })(
                            <Select style={{width: 120}}>
                                <Select.Option value="">请选择状态</Select.Option>
                                <Select.Option value="1">在用</Select.Option>
                                <Select.Option value="0">停用</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" icon="search" loading={isLoading}>查询</Button>
                </Form.Item>

            </Form>
            <Form layout="inline">
                <Form.Item>
                    <Button type="primary" icon="plus" onClick={() => {
                        onAdd()
                    }}>新增</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

UserToolbar.propTypes = {
    isLoading: PropTypes.bool,
    filter: PropTypes.object,
    depts: PropTypes.array,
    roles: PropTypes.array,
    onQuery: PropTypes.func,
    onAdd: PropTypes.func,
}



export default Form.create()(UserToolbar)