import {actions} from 'mirrorx'
import Service from '../../services/System/RoleService'

export default {
    name: 'system_role',
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
            actions.system_role.set({isLoading: true})
            var result = await Service.QueryAll()
            actions.system_role.set({isLoading: false})
            if (result.status === 1) {
                actions.system_role.set({
                    data: result.data,
                })
            }
            return result
        }

    }
}