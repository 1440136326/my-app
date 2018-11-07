import React from 'react'
import {Table} from 'antd'

const LogTable = ({data=[],isLoading})=> {

    const columns = [
        {
            title:'#',
            dataIndex: 'rowNumber',
            key: 'rowNumber',
            width: 50,
        }, {
            title: '日志时间',
            dataIndex: 'logTime',
            key: 'logTime',
            width: 130,
        },
        {
            title: '日志类型',
            dataIndex: 'logType',
            key: 'logType',
            width: 90,
        }, {
            title: '日志级别',
            dataIndex: 'logLevel',
            key: 'logLevel',
            width: 70,
            render:val => {
                switch(val) {
                    case 0:
                        return <span className="text-color-disabled">DEBUG</span>
                    case 1:
                        return <span className="text-color-primary">INFO</span>
                    case 2:
                        return <span className="text-color-warning">WARN</span>
                    case 3:
                        return <span className="text-color-danger">ERROR</span>
                    case 4:
                        return <span className="text-color-danger">FATAL</span>
                    default:
                        return val
                }
            }
        }, {
            title: '日志内容',
            dataIndex: 'logContent',
            key: 'logContent',
            width: 400,
        }, {
            title: '操作人',
            dataIndex: 'userName',
            key: 'userName',
            width: 70,
        }, {
            title: '操作地址',
            dataIndex: 'address',
            key: 'address',
            width: 100,
        }
    ]

    return (
        <Table
            rowKey="id"
            pagination={false}
            size="middle"
            columns={columns}
            dataSource={data}
            scroll={{x:900,y:450}}
        />
    )
}

export default LogTable