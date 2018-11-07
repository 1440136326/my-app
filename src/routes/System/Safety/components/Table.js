import React from 'react'
import PropType from  'prop-types'

import {Table,Tooltip,Button} from 'antd'


const AclTable  = ({data,onEdit})=> {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 160,
        }, {
            title: 'IP白名单规则',
            dataIndex: 'ipRule',
            key: 'ipRule',
        }, {
            title: '操作',
            key: 'action',
            width: 80,
            className: 'ant-table-tool-td',
            render: (val, record) => (
                <Tooltip title="编辑IP规则">
                    <Button size="small" shape="circle" icon="edit" onClick={() => {
                        onEdit(record)
                    }}/>
                </Tooltip>
            )
        },
    ]
    return (
        <Table
            rowKey="userId"
            size="middle"
            //loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={{pageSize: 20}}
        />
    )
}


AclTable.propTypes = {
    data:PropType.array
}

export default AclTable