import React from 'react';
import {Table,Button,Icon} from 'antd';

class ConfirmTable extends React.Component{
    state={
        selectedRowKeys:[]
    }
    columns=[
        {
            title:'告警对象',
            dataIndex:'target'
        }, {
            title: '对象名称',
            dataIndex: 'name'
        },{
            title:'所属业务',
            dataIndex:'business'
        },{
            title:'对象IP',
            dataIndex:'ip'
        },{
            title:'告警类型',
            dataIndex:'type'
        },{
            title:'告警等级',
            dataIndex:'level',
            render:val=>{
                if(val==='紧急'){
                    return <Button size="small" style={{color:'red'}}>{val}</Button>
                }else{
                    return <Button size="small" style={{color:'blue'}}>{val}</Button>
                }
            }
        },{
            title:'告警信息',
            dataIndex:'message'
        },{
            title:'告警触发时间',
            dataIndex:'time'
        },{
            title:'操作',
            dataIndex:'operation',
            render:()=>{
                return <Button icon="close" shape="circle" />
            }
        }
    ]
    selectChange=(selectedRowKeys)=>{
        console.log(selectedRowKeys);
        this.setState({selectedRowKeys})
    }
    render(){
        const {selectedRowKeys}=this.state
        const rowSelection={
            selectedRowKeys,
            onChange:this.selectChange
        }
        return (
            <Table rowKey="id" rowSelection={rowSelection} columns={this.columns} dataSource={this.props.data} />
        )
    }
}

export default ConfirmTable