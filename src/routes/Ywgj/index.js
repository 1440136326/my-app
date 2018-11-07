import React from 'react';
import {Tabs,Icon,Row,Col} from 'antd';
import ReactHighCharts from 'react-highcharts';

import ConsoleTable from './components/ConsoleTable';
import ConfirmToolbar from './components/confirmToolbar';
import ConfirmTable from './components/confirmTable';
import HistoryTable from './components/historyTable';

class Index extends React.Component{

    state={
        consoleData:[]
    }
    componentWillMount(){
        this.getConsoleData();
    }
    getConsoleData=()=>{
        fetch('./data/Console.json').then(res=>res.json()).then(result=>this.setState({consoleData:result.data}))
    }
    render(){

        const data1={
            chart:{
                type:'column'
            },
            title:{
                text:'告警次数Top10'
            },
            xAxis:{
                categories:(function () {
                    var data=[]
                    for (var i=10;i<=20;i++){
                        data.push('OTT-'+i.toString(36))
                    }
                    return data
                })(),
                crosshair:true
            },
            yAxis:{
                min:0,
                title:{
                    text:'次数'
                }
            },
            series:[
                {
                    name:'告警次数',
                    data:[99,95,89,80,75,70,66,60,55,50],
                    dataLabels:{
                        enabled:true
                    }
                }
            ]
        }
        const data2={
            chart:{
                type:'column'
            },
            title:{
                text:'告警汇总统计'
            },
            xAxis:{
                categories:['虚拟机','主机','存储','交换机','其他']
            },
            yAxis:{
                min:0,
                title:{
                    text:'次数'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color:'gray'
                    }
                }
            },
            plotOptions:{
              column:{
                  stacking:'normal',
                  dataLabels:{
                      enabled:true
                  }
              }
            },
            legend:{
                align:'right',
                x:-30,
                verticalAlign:'top',
                y:25,
                floating:true,
                borderColor:'#CCC',
                borderWidth:1
            },
            series:[
                {
                    name:'紧急',
                    data:[30,49,30,18,19]
                },{
                    name:'警告',
                    data:[305,18,18,22,20]
                }
            ]
        }
        const data3={
            chart:{
                type:'pie'
            },
            title:{
                text:'告警数量统计'
            },
            plotOptions:{
              pie:{
                  allowPointSelect:true,
                  cursor:'point',
                  showInLegend:true,
                  dataLabels:{
                      format:'{point.name}:{point.percentage:.1f}%'
                  }
              }
            },
            series:[
                {
                    data:[
                        ['虚拟机',37.2],
                        ['交换机',4.3],
                        ['存储',41.5],
                        ['主机',16.0],
                        ['其他',1.1]
                    ]
                }
            ]
        }
        const data4={
            chart:{
                type:'line'
            },
            title:{
                text:'告警趋势'
            },
            xAxis:{
                categories:['一月','二月','三月','四月','五月','六月','七月']
            },
            yAxis:{
                min:0,
                title:{
                    text:'个数'
                }
            },
            series:[
                {
                    name:'总数',
                    data:[777,500,600,610,620,2000,900]
                },{
                    name:'告警',
                    data:[720,490,550,570,590,1910,880]
                },{
                    name:'紧急',
                    data:[57,10,30,40,30,90,20]
                }
            ]
        }

        return(
            <Tabs type="card">
                <Tabs.TabPane key="0" tab={<span><Icon type="warning" />概要</span>}>
                    <Row>
                        <Col sm={24} md={12}><ReactHighCharts config={data1}/></Col>
                        <Col sm={24} md={12}><ReactHighCharts config={data2}/></Col>
                    </Row>
                    <Row>
                        <Col sm={24} md={12}><ReactHighCharts config={data3}/></Col>
                        <Col sm={24} md={12}><ReactHighCharts config={data4}/></Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane key="1" tab={<span><Icon type="desktop" />告警控制台</span>}>
                    <ConsoleTable data={this.state.consoleData}/>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab={<span><Icon type="check" />已确认告警</span>}>
                    <ConfirmToolbar/>
                    <ConfirmTable data={this.state.consoleData}/>
                </Tabs.TabPane>
                <Tabs.TabPane key="3" tab={<span><Icon type="cloud" />历史告警</span>}>
                    <HistoryTable data={this.state.consoleData}/>
                </Tabs.TabPane>
            </Tabs>
        )
    }
}

export default Index