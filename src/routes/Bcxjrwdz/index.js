import React from 'react';
import {connect,actions} from 'mirrorx';
import {Spin,Tabs,Icon} from 'antd';

import TaskToolbar from './components/TaskToolbar';
import TaskTable from './components/TaskTable';
import LogToolbar from './components/LogToolbar';
import LogTable from './components/LogTable';

class Bcxjrwdz extends React.Component{

    componentWillMount(){
        this.getTaskData();
        this.getLogData();
    }
    state={
        taskData:[],
        logData:[]
    }
    getTaskData=()=>{
        fetch('./data/Task.json').then(res=>res.json()).then(result=>this.setState({taskData:result.data}))
    }
    getLogData=()=>{
        fetch('./data/Log.json').then(res=>res.json()).then(result=>this.setState({logData:result.data}))
    }

    render(){
        const {isLoading}=this.props
        return <Spin spinning={isLoading}>
            <Tabs type="card">
                <Tabs.TabPane key="0" tab={<span><Icon type="warning" />巡检任务管理</span>}>
                    <TaskToolbar/>
                    <TaskTable data={this.state.taskData}/>
                </Tabs.TabPane>
                <Tabs.TabPane key="1" tab={<span><Icon type="desktop" />巡检日志查询</span>}>
                    <LogToolbar/>
                    <LogTable data={this.state.logData}/>
                </Tabs.TabPane>
            </Tabs>
        </Spin>
    }
}

export default connect(state=>{
   return{isLoading:state.bcxjrwdz.isLoading}
})(Bcxjrwdz)