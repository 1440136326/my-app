import React from 'react';
import {Table,Button,Icon} from 'antd';

import TableCell from './TableCell';
class Index extends React.Component{

    columns=[
        {
            title:'任务名称',
            dataIndex:'name',
            render:(val)=>{
                return <TableCell value={val} />
            }
        },{
            title:'任务描述',
            dataIndex:'description'
        },{
            title:'cron表达式',
            dataIndex:'expression'
        },{
            title:'是否生效',
            dataIndex:'enabled'
        },{
            title:'运行状态',
            dataIndex:'status'
        },{
            title:'操作',
            dataIndex:'operation',
            render:()=>{
                return <div>
                    <Button size="small" shape="circle" icon="play-circle-o" />
                    <Button size="small" shape="circle" icon="delete" />
                </div>
            }
        }
    ]
    render(){
        const rowSelection={

        }
        return(
            <Table rowKey="id" rowSelection={rowSelection} columns={this.columns} dataSource={this.props.data}/>
        )
    }
}

export default Index
