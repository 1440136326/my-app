import React from 'react'
import {connect,actions} from 'mirrorx'
import {message,Button,Spin} from 'antd'

import Table from './components/Table'

class SystemMenuIndex extends React.Component {

    componentWillMount() {
        if (this.props.data.length === 0)
            this.onQuery()
    }

    onQuery = ()=> {
        actions.system_menu.query().then(result => {
            if (result.status !== 1)
                message.error(result.message)
        })
    }

    onDelete = (id) => {
        actions.system_menu.delete(id).then(result => {
            if (result.status === 1) {
                this.onQuery()
                message.success(result.message)
            }
            else
                message.error(result.message)
        })
    }

    onMove = (id, direction) => {
        actions.system_menu.move({id, direction}).then(result => {
            if (result.status === 1) {
                this.onQuery()
            } else {
                message.error(result.message)
            }
        })
    }

    render() {
        const tableProps = {
            data: this.props.data,
            isLoading: this.props.isLoading,
            onDelete:this.onDelete,
            onMove:this.onMove
        }

        return (
            <Spin spinning={this.props.isLoading || this.props.isDeleting || this.props.isMoving}>
                <div className="page-toolbar">
                    <Button type="primary" icon="plus" onClick={() => {
                        actions.routing.push('/system/menu/add')
                    }}>新增</Button>
                </div>
                <Table {...tableProps}/>
            </Spin>
        )
    }
}

export default connect(state=> {
    return {
        isLoading: state.system_menu.isLoading,
        isMoving: state.system_menu.isMoving,
        isDeleting: state.system_menu.isDeleting,
        data: state.system_menu.data,
    }
})(SystemMenuIndex)
