import React from 'react';
import {Table} from 'antd';

const IndexTable=({data})=>{
    const columns=[
        {
            title:'端口名称',
            dataIndex:'portName'
        },{
            title:'物理状态',
            dataIndex:'physicalState',
            render:val=><span style={{color:'#00FF00'}}>{val}</span>
        },{
            title:'操作状态',
            dataIndex:'operationState',
            render:val=><span style={{color:'red'}}>{val}</span>
        },{
            title:'实时流入流量(Mbps)',
            dataIndex:'inflow'
        },{
            title:'实时流出流量(Mbps)',
            dataIndex:'outflow'
        },{
            title:'流入峰值(Mbps)',
            dataIndex:'inflowPeak'
        },{
            title:'流出峰值',
            dataIndex:'outflowPeak'
        }
    ]
    const rowSelection={
        selectedRowKeys:[1],
        type:'radio'
    }
    return(
        <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={data}/>
    )
}

export default IndexTable