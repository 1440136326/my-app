import React from 'react';

import Toolbar from './components/Toolbar';
import Table from './components/Table';


class Index extends React.Component{

    componentWillMount(){
        this.getData();
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextState);
        console.log(this.state);
        return true
    }
    state={
        MonitorData:[]
    }
    getData=()=>{
        fetch('./data/Monitor.json').then(res=>res.json()).then(result=>this.setState({MonitorData:result.data}))
    }
    render(){

        return(
            <div>
                <Toolbar/>
                <Table data={this.state.MonitorData}/>
            </div>
        )
    }
}
export default Index