import {actions} from 'mirrorx'
import Service from '../../services/System/LogService'
import moment from 'moment'

import {PAGE_SIZE} from "../../constant"

export default {
    name: 'system_log',
    initialState: {
        isLoading: false,
        filter: {
            logType: '',
            logLevel: '',
            userName: '',
            address: '',
            keywords: '',
            startTime: moment().format('YYYY-MM-DD'),
            endTime: moment().format('YYYY-MM-DD'),
            start: 0,
            limit: PAGE_SIZE
        },
        count:0,
        data: [],
        dataTypes:[]
    },
    reducers: {
        set(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects: {
        async query(params,getState) {
            actions.system_log.set({isLoading: true})
            const filter = Object.assign({}, getState().system_log.filter, params)
            var result = await Service.Query(filter)

            actions.system_log.set({
                isLoading: false,
                filter
            })

            if (result.status === 1) {
                actions.system_log.set({
                    data: result.data,
                    count:result.count,
                })
            }
            return result
        },

        async queryTypes() {
            actions.system_log.set({isLoading: true})
            var result = await Service.QueryTypes()

            actions.system_log.set({
                isLoading: false,
            })

            if (result.status === 1) {
                actions.system_log.set({
                    dataTypes: result.data,
                })
            }
            return result
        },

    }
}