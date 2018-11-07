import React from 'react';
import {Spin,Tabs,Icon} from 'antd';
import {connect} from 'mirrorx';

import ThresholdToolbar from './components/thresholdToolbar';
import ThresholdTable from './components/thresholdTable';
import DataDisplayTable from './components/dataDisplayTable';

class Bcjgyjxf extends React.Component{

    state={
        thresholdData:[],
        dataDisplay:[],
        tab:''
    }
    componentWillMount(){
        this.getthresholdData();
        this.getdataDisplay();
    }
    getthresholdData=()=>{
        fetch('./data/threshold.json').then(res=>res.json()).then(result=>this.setState({thresholdData:result.data}))
    }
    getdataDisplay=()=>{
        fetch('./data/dataDisplay.json').then(res=>res.json()).then(result=>this.setState({dataDisplay:result.data}))
    }
    render(){

        return(
            <Spin spinning={false}>
                <Tabs>
                    <Tabs.TabPane key="1"  tab={<span><Icon type="warning"/>告警阈值设定</span>}>
                        <ThresholdToolbar />
                        <ThresholdTable data={this.state.thresholdData}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2" tab={<span><Icon type="desktop" />告警数据显示</span>}>
                        <DataDisplayTable data={this.state.dataDisplay}/>
                    </Tabs.TabPane>
                </Tabs>
            </Spin>
        )
    }
}
export default connect(state=>{
    return {
        isOpen:state.bcjgyjxf.isOpen
    }
})(Bcjgyjxf)