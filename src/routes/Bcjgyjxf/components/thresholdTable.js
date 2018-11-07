import React from 'react';
import {Table,Button,Tooltip} from 'antd';

const ThresholdTable=({data})=>{

    const columns=[
        {
            title:'告警名称',
            dataIndex:'alarmName'
        },{
            title:'单位',
            dataIndex:'unit'
        },{
            title:'告警阈值',
            dataIndex:'threshold'
        },{
            title:'有效任务',
            dataIndex:'task'
        },{
            title:'有效专线',
            dataIndex:'line'
        },{
            title:'告警负责人',
            dataIndex:'person'
        },{
            title:'通知发送方式',
            dataIndex:'send'
        },{
            title:'是否启用',
            dataIndex:'enabled',
            render:()=><span className="text-color-success">启用</span>
        },{
            title:'操作',
            dataIndex:'operation',
            render:()=>{
                return <div>
                    <Tooltip title="删除">
                        <Button icon="delete" shape="circle" size="small"></Button>
                    </Tooltip>
                    <Tooltip>
                        <Button icon="edit" shape="circle" size="small"></Button>
                    </Tooltip>
                </div>
            }
        }
    ]
    return (
        <Table rowKey="id" columns={columns} dataSource={data} />
    )
}

export default ThresholdTable