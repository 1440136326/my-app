import React from 'react';
import {Table,Button} from 'antd';

const ConsoleTable=({data})=>{
    const columns=[
        {
            title:'告警来源',
            dataIndex:'source',
            render:(val)=>{
                switch(val){
                    case 'Trap告警':
                         return <Button style={{backgroundColor:'#2DB7F5'}} size="small"><span style={{fontSize:12,color:'white'}}>{val}</span></Button>
                    break;
                    case '日志告警':
                        return <Button style={{backgroundColor:'#87D068'}} size="small"><span style={{fontSize:12,color:'white'}}>{val}</span></Button>
                    break;
                    case '设备告警':
                        return <Button style={{backgroundColor:'#FF5500'}} size="small"><span style={{fontSize:12,color:'white'}}>{val}</span></Button>
                        break;
                    default:break;
                }
            }
        },{
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
            dataIndex:'level'
        },{
            title:'告警信息',
            dataIndex:'message'
        },{
            title:'告警触发时间',
            dataIndex:'time'
        }

    ]
    return(
        <Table rowKey="id" columns={columns} dataSource={data}/>
    )
}
export default ConsoleTable