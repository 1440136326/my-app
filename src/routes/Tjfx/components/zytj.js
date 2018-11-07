import React from 'react';
import ZytjModel from './ZytjModel';
import ReactHighcharts from 'react-highcharts';
import 'ant-design-pro/dist/ant-design-pro.css'

class ZytjIndex extends React.Component{

    state={
        data:null
    }
    componentDidMount(){
        fetch('./data/news.json').then(res=>res.json()).then(result=>this.setState({data:result.newsList}))
    }

    render(){

        return (<div>
            {this.state.data?this.state.data.map((val,index)=><ZytjModel key={index}  data={val}/>):null}
            <div>
                {/*<ReactHighcharts config={}/>*/}
            </div>
        </div>)
    }
}

export default ZytjIndex