import React from 'react'
import {Table,Popconfirm,Tooltip,Icon,Button} from 'antd'
import {actions} from 'mirrorx'

import * as Helper from '../../../../utils/utils'

const MenuTable = ({data,isLoading,onDelete,onMove})=> {

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 360,
            render: (text, record) => (
                <span>
                    <Icon type={record.icon || "file"}/>
                    {' '}
                    {text}
                </span>)
        },
        {
            title: '代码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '地址',
            dataIndex: 'url',
            key: 'url'
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text || '-'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            className: 'ant-table-tool-td',
            render: (val, record) => (
                <div>
                    <Tooltip title="向上移动">
                        <Button size="small" shape="circle" icon="arrow-up" onClick={()=>{
                            onMove(record.id, -1)
                        }} />
                    </Tooltip>
                    <Tooltip title="向下移动">
                        <Button size="small" shape="circle" icon="arrow-down" onClick={()=>{
                            onMove(record.id, 1)
                        }} />
                    </Tooltip>
                    <Tooltip title="编辑菜单">
                        <Button size="small" shape="circle" icon="edit" onClick={()=>{
                            actions.routing.push(`/system/menu/edit/${record.id}`)
                        }} />
                    </Tooltip>
                    <Tooltip title="配置权限">
                        <Button size="small" shape="circle" icon="setting" onClick={()=>{
                            actions.routing.push(`/system/menu/right/${record.id}`)
                        }} />
                    </Tooltip>
                    <Tooltip title="删除菜单">
                        <Popconfirm
                            placement="left"
                            title={
                                <div style={{width: 280}}>
                                    确认删除菜单 <strong>{record.name}</strong>?<br/><br/>
                                    <strong className="text-danger">此操作不可逆，请谨慎操作!!!</strong>
                                </div>
                            }
                            onConfirm={() => {
                                onDelete(record.id)
                            }}
                        >
                            <Button size="small" shape="circle" icon="delete"/>
                        </Popconfirm>
                    </Tooltip>
                </div>
            )
        }
    ]

    const treeData = Helper.buildTreeData(data)

    return (
        <Table
            rowKey="id"
            size="middle"
            //loading={isLoading}
            columns={columns}
            dataSource={treeData}
            pagination={false}
        />
    )
}

export default MenuTable