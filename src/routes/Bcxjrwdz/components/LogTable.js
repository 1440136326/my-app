import React from 'react';
import {Table} from 'antd';

const LogTable=({data})=>{

    const columns=[
        {
            title:'网元名称',
            dataIndex:'netName'
        },{
            title:'测试时间',
            dataIndex:'testTime'
        },{
            title:'专线实数实例',
            dataIndex:'lineCountCase'
        },{
            title:'巡检任务',
            dataIndex:'task'
        },{
            title:'域名/IP',
            dataIndex:'domainName'
        },{
            title:'ICM网络时延(ms)',
            dataIndex:'ICMDelay'
        },{
            title:'ICM网络丢包率(%)',
            dataIndex:'ICMLost'
        },{
            title:'慢速路由节点',
            dataIndex:'routeNode'
        },{
            title:'测试类型',
            dataIndex:'testType',
            filters:[
                {text:'Ping',value:'Ping'},
                {text:'网页',value:'网页'}
            ],
            onFilter:(value,record)=>{
                record.testType.includes(value)
            }
        }
    ]
    const handleChange=(pagination,filters,sorter)=>{
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
    }
    return <Table rowKey="id" columns={columns} dataSource={data} onChange={handleChange}  />
}
export default LogTable