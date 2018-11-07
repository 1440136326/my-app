import React from 'react'
import {Table,Tooltip,Popconfirm,Button} from 'antd'
import {actions} from "mirrorx";

const UserTable = ({data=[],isLoading,onDelete,onToggleEnabled,onResetPwd})=> {

    const columns = [
        {
            title: '#',
            key: 'rowNumber',
            width: 40,
            render: (val, record, index) => index + 1
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 120,
        }, {
            title: '账号',
            dataIndex: 'uid',
            key: 'uid',
            width: 120,
        }, {
            title: '角色',
            dataIndex: 'roleName',
            key: 'roleName',
            render: (val, record) => {
                if (record.roles.length > 1) {
                    return <Tooltip title={
                        <div>
                            {record.roles.map(role => <div key={role.id}>{role.code}_{role.name}</div>)}
                        </div>
                    }
                    >
                        {val}
                    </Tooltip>
                }
                return val
            }
        }, {
            title: '部门',
            dataIndex: 'deptName',
            key: 'deptName'
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone'
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 60,
            render: val => <span className={val ? 'text-color-success' : 'text-color-danger'}>{val ? '在用' : '停用'}</span>
        }, {
            title: '操作',
            key: 'action',
            width: 120,
            className: 'ant-table-tool-td',
            render: (val, record) => (
                <div>
                    <Tooltip title="删除账号">
                        <Popconfirm
                            placement="left"
                            title={
                                <div style={{width: 280}}>
                                    确认删除用户 <strong>{record.name}</strong> 的账号?<br/><br/>
                                    <strong className="text-danger">此操作不可逆，请谨慎操作!!!</strong>
                                </div>
                            }
                            onConfirm={() => {
                                onDelete(record.id)
                            }}
                        >
                            <Button size="small" shape="circle" icon="delete" />
                    </Popconfirm>
                    </Tooltip>
                    <Tooltip title="编辑账号">
                        <Button size="small" shape="circle" icon="edit" onClick={()=>{
                            actions.routing.push(`/system/user/edit/${record.id}`)
                        }} />
                    </Tooltip>
                    <Tooltip title={record.enabled === 1 ? '停用账号' : '启用账号'}>
                        <Popconfirm
                            placement="left"
                            title={
                                <div style={{width: 280}}>
                                    确认{record.enabled === 1 ? '停用' : '启用'}用户 <strong>{record.name}</strong> 的账号?
                                </div>
                            }
                            onConfirm={() => {
                                onToggleEnabled(record.id)
                            }}
                        >
                            <Button size="small" shape="circle" icon={record.enabled === 1 ? 'lock' : 'unlock'} />
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="重置密码">
                        <Popconfirm
                            placement="left"
                            title={
                                <div style={{width: 280}}>
                                    确认将用户 <strong>{record.name}</strong> 的密码重置为 <strong>Tk_ab@101</strong>?
                                </div>
                            }
                            onConfirm={() => {
                                onResetPwd(record.id)
                            }}
                        >
                            <Button size="small" shape="circle" icon="key" />
                        </Popconfirm>
                    </Tooltip>
                </div>
            )
        }
    ]

    return (
        <Table
            rowKey="id"
            size="middle"
            //loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={{pageSize: 20}}
        />
    )
}

export default UserTable