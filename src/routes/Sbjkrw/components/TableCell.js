import React from 'react';
import {Icon,Input,Form} from 'antd';

class TableCell extends React.Component{

    state={
        editable:false,
        defaultValue:this.props.value
    }
    handleEditable=()=>{
        this.setState({editable:true})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        var value=this.props.form.getFieldsValue();
        this.setState({editable:false,defaultValue:value.input})
    }
    render(){
        const {getFieldDecorator}=this.props.form
        return !this.state.editable?<div><span>{this.state.defaultValue}</span><Icon type="edit" onClick={this.handleEditable} /></div>
            :<Form layout='inline'>
                    <Form.Item>
                        {
                            getFieldDecorator('input',{
                                    initialValue:this.state.defaultValue
                                }
                            )(
                                <Input style={{width:200}} suffix={<Icon type="check" onClick={this.handleSubmit} />} />
                            )
                        }
                    </Form.Item>
            </Form>

    }
}

export default Form.create()(TableCell)