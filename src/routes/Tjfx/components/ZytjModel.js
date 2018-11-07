import React from 'react'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
class ZytjModel extends React.Component{
    state={
        showLength:"90"
    }
    handleOpen=()=>{
        this.setState({showLength:""})
    }
    handleClose=()=>{
        this.setState({showLength:"90"});
    }
    render(){

        const {data}=this.props
        return(<div style={{width:500,margin:'10px auto'}}>
            <h2>{data.title}</h2>
            <div>
                <img style={{width:20,marginTop:-5}} src="/images/cook.png" alt="icon.cook"/>
                <span style={{fontWeight:'bolder',fontSize:'16px',margin:'auto 10px'}}>{data.user}</span>
                <span>{data.time}</span>
            </div>
            <div style={{marginTop:10}}>
                <img src={data.icon} align="left" alt="image"/>
                <div className="text" style={{width:'55%',float:'right'}}>
                    <Ellipsis style={{display:'inline'}} length={this.state.showLength}>{data.content}</Ellipsis>
                    <a href="javascript:void(0)" onClick={this.handleOpen}>阅读全文</a>&nbsp;&nbsp;
                    <a href="javascript:void(0)" onClick={this.handleClose}>收起</a>
                </div>
            </div>
            <div style={{clear:'both',paddingTop:20}}>
                <span><img style={{width:16,marginTop:-2}} src="/images/i1.png" alt=""/>&nbsp;5条评论</span>
                <span style={{margin:'15px'}}><img style={{width:10,marginTop:-5}} src="/images/i2.png" alt=""/>&nbsp;分享</span>
                <span><img style={{width:14,marginTop:-5}} src="/images/i3.png" alt=""/>&nbsp;收藏</span>
            </div>
        </div>)
    }
}
export default ZytjModel