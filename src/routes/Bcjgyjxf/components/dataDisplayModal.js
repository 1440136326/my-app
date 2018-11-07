import React from 'react';
import {Modal} from 'antd';
import {actions} from 'mirrorx';

const DataDisplayModal=({data,isDetailOpen})=>{

    return (
        data?<Modal title="告警详情" visible={isDetailOpen} onOk={()=>actions.bcjgyjxf.CloseAlarmDetail()} onCancel={()=>actions.bcjgyjxf.CloseAlarmDetail()}>
            <p><span>告警级别：</span><span>{data.alarmLevel}</span></p>
            <p><span>告警发生时间：</span><span>{data.occurTime}</span></p>
            <p><span>告警名称：</span><span>{data.alarmName}</span></p>
            <p><span>专线名称：</span><span>{data.lineName}</span></p>
        </Modal>:null
    )
}

export default DataDisplayModal