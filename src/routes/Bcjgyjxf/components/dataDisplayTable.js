import React from 'react';
import {connect,actions} from 'mirrorx';
import {Table,Button} from 'antd';

import DataDisplayModal from './dataDisplayModal';

class dataDisplayTable extends React.Component{

    state={
        data:null
    }
    handleClick=(val)=>{
        actions.bcjgyjxf.OpenAlarmDetail()
        this.setState({data:val})
    }
    render(){
        const columns=[
            {
                title:'清除告警',
                dataIndex:'clearAlarm',
                render:(val)=>{return <Button size="small" style={{backgroundColor:"rgb(45, 183, 245)"}}><span style={{color:"white",fontSize:12}}>{val}</span></Button>}

            },{
                title:'告警级别',
                dataIndex:'alarmLevel',
                render:(val)=>{
                    return val==='紧急告警'?<Button size="small" style={{backgroundColor:"rgb(255, 85, 0)"}}><span style={{color:"white",fontSize:12}}>{val}</span></Button>
                        :<Button size="small" style={{backgroundColor:"rgb(245,247,3)"}}><span style={{color:"white",fontSize:12}}>{val}</span></Button>
                }
            },{
                title:'告警接收时间',
                dataIndex:'acceptTime'
            },{
                title:'告警发生时间',
                dataIndex:'occurTime'
            },{
                title:'告警名称',
                dataIndex:'alarmName'
            },{
                title:'专线名称',
                dataIndex:'lineName'
            },{
                title:'告警详情',
                dataIndex:'alarmDetail',
                render:(val,record)=>{
                    return <a onClick={()=>this.handleClick(record)}>{val}</a>
                }
            }
        ]
        return(
            <div>
                <Table rowKey="id" columns={columns} dataSource={this.props.data} />
                <DataDisplayModal data={this.state.data} isDetailOpen={this.props.isDetailOpen}/>
            </div>
        )
    }
}

export default connect(state=>{
    return {isDetailOpen:state.bcjgyjxf.isDetailOpen}
})(dataDisplayTable)