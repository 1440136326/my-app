import React from 'react'
import {connect,actions} from 'mirrorx'
import {message,Spin} from 'antd'

import Toolbar from './components/Toolbar'
import Table from './components/Table'

class SystemUserIndex extends React.Component {

    componentWillMount() {
        const {roles, data} = this.props
        if (roles.length === 0)
            this.onInit()
        if (data.length === 0)
            this.onQuery()
    }

    onInit = () => {
        actions.system_role.query()
        actions.system_dept.query()
    }

    onQuery = (params) => {
        actions.system_user.query(params).then(result => {
            if (result.status !== 1)
                message.error(result.message)
        })
    }

    onDelete = (id) => {
        actions.system_user.delete(id).then(result => {
            if (result.status === 1) {
                this.onQuery()
                message.success(result.message)
            }
            else
                message.error(result.message)
        })
    }

    onResetPwd = (id) => {
        actions.system_user.resetPwd(id).then(result => {
            if (result.status === 1)
                message.success(result.message)
            else
                message.error(result.message)
        })
    }

    onToggleEnabled = (id) => {
        actions.system_user.toggleEnabeld(id).then(result => {
            if (result.status === 1) {
                this.onQuery()
                message.success(result.message)
            } else {
                message.error(result.message)
            }
        })
    }

    render() {

        const toolbarProps = {
            isLoading: this.props.isLoading,
            filter: this.props.filter,
            roles: this.props.roles,
            depts: this.props.depts,
            onQuery: this.onQuery,
            onAdd: () => {
                actions.routing.push('/system/user/add')
            }
        }

        const tableProps = {
            data: this.props.data,
            isLoading: this.props.isLoading,
            onDelete: this.onDelete,
            onResetPwd: this.onResetPwd,
            onToggleEnabled: this.onToggleEnabled,
        }

        return (
            <Spin spinning={
                this.props.isInitializing ||
                this.props.isLoading ||
                this.props.isSaving ||
                this.props.isDeleting
            }>
                <Toolbar {...toolbarProps}/>
                <Table {...tableProps}/>
            </Spin>
        )
    }
}

export default connect(state=> {
    return {
        isInitializing: state.system_dept.isLoading || state.system_role.isLoading,
        isLoading: state.system_user.isLoading,
        isSaving: state.system_user.isSaving,
        isDeleting: state.system_user.isDeleting,
        data: state.system_user.data,
        filter: state.system_user.filter,
        roles: state.system_role.data,
        depts: state.system_dept.data,
    }
})(SystemUserIndex)
