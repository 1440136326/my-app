import React from 'react';
import {Table,Icon,Tooltip,Button} from 'antd';


const TaskTable=({data})=>{

    const columns=[
        {
          title:<Icon type="smile-o" />,
          key:'id',
          dataIndex:'id',
        },
        {
            title:'任务名称',
            key:'taskName',
            dataIndex:'taskName',
        },
        {
            title:'测试类型',
            key:'testType',
            dataIndex:'testType',
        },{
            title:'状态',
            key:'Status',
            dataIndex:'Status',
            render:()=>{
                return <span className="text-color-success">启用</span>
            }
        },{
            title:'最新结果上报时间',
            key:'uTime',
            dataIndex:'uTime',
        },
        {
            title:'任务失效时间',
            key:'expiryDate',
            dataIndex:'expiryDate',
        },{
            title:'测试轮数',
            key:'testCount',
            dataIndex:'testCount',
        },{
            title:'测试时间点',
            key:'testTime',
            dataIndex:'testTime',
        },{
            title:'备注',
            key:'Remarks',
            dataIndex:'Remarks',
        },{
            title:'操作',
            key:'operation',
            dataIndex:'operation',
            render:()=>{
                return <div>
                    <Tooltip title="删除任务">
                        <Button size="small" shape="circle" icon="delete"></Button>
                    </Tooltip>
                    <Tooltip title="编辑任务">
                        <Button size="small" shape="circle" icon="edit"></Button>
                    </Tooltip>
                </div>
            }
        }
    ]
    return (
        <Table rowKey="id" columns={columns} dataSource={data} />
    )
}

export default TaskTable