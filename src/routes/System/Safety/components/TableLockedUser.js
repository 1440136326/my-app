import React from 'react'
import PropType from  'prop-types'
import moment  from 'moment'

import {Table,Tooltip,Button} from 'antd'


const LockUserTable  = ({isLoading = false,data,onClear})=> {
    const columns = [
        {
            title: '锁定账号',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '角色',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '部门',
            dataIndex: 'deptName',
            key: 'deptName',
        },{
            title: '自动解锁时间',
            dataIndex: 'freeTime',
            key: 'freeTime',
            render:(val,record)=> {
                return moment().add(val, 'second').format('YYYY-MM-DD HH:mm:ss')
            }
        }, {
            title: '解锁',
            key: 'action',
            width: 60,
            className: 'ant-table-tool-td',
            render: (val, record) => (
                <Tooltip title="解锁用户">
                    <Button size="small" shape="circle" icon="close" onClick={() => {
                        onClear(record.uid)
                    }}/>
                </Tooltip>
            )
        },
    ]
    return (
        <Table
            rowKey="uid"
            size="middle"
            loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={{pageSize: 20}}
        />
    )
}


LockUserTable.propTypes = {
    data:PropType.array
}

export default LockUserTable