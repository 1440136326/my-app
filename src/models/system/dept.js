import {actions} from 'mirrorx'
import Service from '../../services/System/DeptService'

export default {
    name: 'system_dept',
    initialState: {
        isLoading: false,
        data: [],
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
        async query() {
            actions.system_dept.set({isLoading: true})
            var result = await Service.QueryAll()
            actions.system_dept.set({isLoading: false})
            if (result.status === 1) {
                actions.system_dept.set({
                    data: result.data,
                })
            }
            return result
        }

    }
}