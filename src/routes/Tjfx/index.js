import React from 'react';
import {Tabs,Icon,Row,Col,Tooltip,Progress} from 'antd';
import ReactHighcharts from 'react-highcharts';
import exporting from 'highcharts-exporting'

import './index.css';
const xdata=[]
var timer=null;
for(let i=5;i<23;i++){
    xdata.push('2018-06-'+i)
}
const rankingListData=[]
for(let i=0;i<7;i++){
    rankingListData.push({
        title:`告警专线${i}`,
        total:323232
    })
}
class Index extends React.Component{

    componentDidMount(){
        ReactHighcharts.Highcharts.setOptions({global:{useUTC:false}});
    }
    componentWillUnmount(){
        clearInterval(timer)
    }
    render(){
        const activeLastPointToolip=(chart)=>{
            var points = chart.series[0].points;
            chart.tooltip.refresh(points[points.length -1]);
        }
        const data1={
            chart:{
                type:'areaspline',
                height:46,
                margin:0
            },
            credits:{
                enabled:false
            },
            title:{
                text:null
            },
            legend:{
                enabled:false
            },
            xAxis:{
                labels:{
                    enabled:false
                },
                visible:false,
                categories:xdata

            },
            tooltip:{
                backgroundColor:'rgba(0,0,0,.85)',
                style:{'color':'white'},
                headerFormat:null,
                pointFormat:'{point.category}: {point.y}'
            },
            yAxis:{
                title:{
                    text:null
                },
                labels:{
                    enabled:false
                }
            },
            series:[
                {
                    marker:{
                        enabled:false,
                        radius:2
                    },
                    color:'#975FE4',
                    data:[7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
                }
            ]
        }
        const data2={
            chart:{
                type:'column',
                height:46,
                margin:0
            },
            credits:{
                enabled:false
            },
            legend:{
                enabled:false
            },
            title:{
                text:null
            },
            tooltip:{
                backgroundColor:'rgba(0,0,0,.85)',
                style:{'color':'white'},
                headerFormat:null,
                pointFormat:'{point.category}: {point.y}'
            },
            xAxis:{
                labels:{
                    enabled:false
                },
                visible:false,
                categories:xdata
            },
            series:[
                {
                    data:[7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
                }
            ]
        }
        const data3={
            chart:{
                type:'column',
                height:295
            },
            title:{
                text:'告警趋势图',
                align:'left',
                style:{'fontSize':'14px'}
            },
            legend:{
                enabled:false
            },
            credits:{
                enabled:false
            },
            xAxis:{
                tickLength:5,
                categories:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
            yAxis:{
                endOnTick:true,
                title:{
                    enabled:false
                }
            },
            series:[{
                color:'#3AA1FF',
                data:[978,782,526,1086,1150,1162,347,575,566,1026,569,857]
            }]
        }
        const data4={
            chart:{
              type:'spline',
              height:300,
                events:{
                    load:function () {
                        clearInterval(timer)
                        var series=this.series[0],chart=this
                        activeLastPointToolip(chart)
                        var t=setInterval(function () {
                            var x=(new Date()).getTime()
                            var y=Math.random()
                            series.addPoint([x,y],true,true)
                            activeLastPointToolip(chart)
                        },1000)
                        timer=t
                    }
                }
            },
            title:{
                text:null
            },
            tooltip:{
                formatter:function () {
                    return '<b>'+this.series.name+'</b><br />'+
                        ReactHighcharts.Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',this.x)+'<br />'+
                        ReactHighcharts.Highcharts.numberFormat(this.y,2);
                }

            },
            legend:{
              enabled:false
            },
            xAxis:{
                type:'datetime',
                tickPixelInterval:150
            },
            yAxis:{
                title:{
                    text:null
                }
            },
            series:[{
                name:'实时数据',
                data:(function () {
                    var data=[],time=(new Date()).getTime(),i;
                    for(i=-19;i<=0;i++){
                        data.push({
                            x:time+i*1000,
                            y:Math.random()
                        })
                    }
                    return data
                })()

            }]
        }
        return(
            <Tabs defaultActiveKey="0">
                <Tabs.TabPane key="0" tab={<span><Icon type="warning" />专线维度统计</span>}>
                        <Row gutter={15} style={{backgroundColor:'#F0F2F5'}}>
                            <Col lg={12} xl={6}>
                                <div style={{width:'100%',backgroundColor:'white',padding:'20px 24px 8px 24px'}}>
                                    <div>互联网专线<Tooltip title="指标说明"><Icon style={{float:'right'}} type="info-circle-o"/></Tooltip></div>
                                    <div style={{fontSize:30,lineHeight:'38px',height:38}}>1260</div>
                                    <div style={{height:46,marginBottom:'12px',position:'relative'}}>
                                        <div style={{position:'absolute',left:0,bottom:0}}>
                                            <div style={{display:'inline-block',marginRight:16}}><span>周同比</span><span style={{marginLeft:8}}>12%</span><Icon style={{color:'red',fontSize:12,marginLeft:4}} type='caret-up'/></div>
                                            <div style={{display:'inline-block'}}><span>日环比</span><span style={{marginLeft:8}}>11%</span><Icon style={{color:'green',fontSize:12,marginLeft:4}} type='caret-down'/></div>
                                        </div>
                                    </div>
                                    <div style={{borderTop:'1px solid #e8e8e8'}}>
                                        <div style={{marginTop:8}}>
                                            <span>日均告警</span><span style={{color:'black',marginLeft:8}}>122</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} xl={6}>
                                <div style={{width:'100%',backgroundColor:'white',padding:'20px 24px 8px 24px'}}>
                                    <div>语音专线<Tooltip title="指标说明"><Icon style={{float:'right'}} type="info-circle-o"/></Tooltip></div>
                                    <div style={{fontSize:30,lineHeight:'38px',height:38}}>1260</div>
                                    <div style={{height:46,marginBottom:'12px',position:'relative'}}>
                                        <div style={{position:'absolute',left:0,bottom:0,height:'100%',width:'100%'}}>
                                            <ReactHighcharts config={data1}/>
                                        </div>
                                    </div>
                                    <div style={{borderTop:'1px solid #e8e8e8'}}>
                                        <div style={{marginTop:8}}>
                                            <span>日均告警</span><span style={{color:'black',marginLeft:8}}>122</span>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <Col lg={12} xl={6}>
                                <div style={{width:'100%',backgroundColor:'white',padding:'20px 24px 8px 24px'}}>
                                    <div>短彩专线<Tooltip title="指标说明"><Icon style={{float:'right'}} type="info-circle-o"/></Tooltip></div>
                                    <div style={{fontSize:30,lineHeight:'38px',height:38}}>1260</div>
                                    <div style={{height:46,marginBottom:'12px',position:'relative'}}>
                                        <div style={{position:'absolute',left:0,bottom:0,height:'100%',width:'100%'}}>
                                            <ReactHighcharts config={data2}/>
                                        </div>
                                    </div>
                                    <div style={{borderTop:'1px solid #e8e8e8'}}>
                                        <div style={{marginTop:8}}>
                                            <span>日均告警</span><span style={{color:'black',marginLeft:8}}>122</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} xl={6}>
                                <div style={{width:'100%',backgroundColor:'white',padding:'20px 24px 8px 24px'}}>
                                    <div>数据专线<Tooltip title="指标说明"><Icon style={{float:'right'}} type="info-circle-o"/></Tooltip></div>
                                    <div style={{fontSize:30,lineHeight:'38px',height:38}}>1260</div>
                                    <div style={{height:46,marginBottom:'12px',position:'relative'}}>
                                        <div style={{position:'absolute',left:0,bottom:0,width:'100%'}}>
                                            <Progress percent={78} showInfo={false} strokeWidth={11}/>
                                        </div>
                                    </div>
                                    <div style={{borderTop:'1px solid #e8e8e8'}}>
                                        <div style={{marginTop:8}}>
                                            <span>日均告警</span><span style={{color:'black',marginLeft:8}}>122</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    <Row>
                        <div style={{width:'100%'}}>
                            <ReactHighcharts config={data4}/>
                        </div>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane key="1" tab={<span><Icon type="desktop" />时间维度统计</span>}>
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                            <ReactHighcharts config={data3}/>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                            <h4 style={{marginTop:5}}>告警数量排名</h4>
                            <ul className='rankingListData'>
                                {
                                    rankingListData.map((item,i)=>(
                                        <li key={i}>
                                            <span className={i<3?'active':''}>{i+1}</span>
                                            <span>{item.title}</span>
                                            <span>{item.total}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        )
    }
}

export default Index