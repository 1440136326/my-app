import React from 'react'
import {connect,actions} from 'mirrorx'
import {message,Spin} from 'antd'
import Pagination from '../../../components/Pagination'


import Table from './components/Table'
import Toolbar from './components/Toolbar'


class LogIndex extends React.Component {
    componentWillMount() {
        const {data, dataTypes} = this.props
        if (dataTypes.length === 0)
            this.onInit()
        if (data.length === 0)
            this.onQuery()

    }
    onInit = ()=>{
        actions.system_log.queryTypes()
    }

    onQuery = (params) => {
        actions.system_log.query(params).then(result => {
            if (result.status !== 1)
                message.error(result.message)
        })
    }

    render() {
        const {data,dataTypes,pagination,isLoading,filter} = this.props

        const tableProps = {
            data,
            isLoading
        }
        const toolbarProps = {
            isLoading,
            filter,
            types: dataTypes,
            onQuery:this.onQuery,
        }
        const paginationProps = {
            ...pagination,
            onChange: this.onQuery,
        }

        return (
            <Spin spinning={isLoading}>
                <Toolbar {...toolbarProps}/>

                <Pagination {...paginationProps}/>
                <Table {...tableProps}/>
                <Pagination {...paginationProps}/>

            </Spin>
        )
    }
}



export default connect((state) => {
    return {
        isLoading: state.system_log.isLoading,
        filter: state.system_log.filter,
        data: state.system_log.data,
        dataTypes: state.system_log.dataTypes,
        pagination: {
            start: state.system_log.filter.start,
            limit: state.system_log.filter.limit,
            count: state.system_log.count
        }
    }
})(LogIndex)
