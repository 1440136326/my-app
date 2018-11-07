import {actions} from 'mirrorx'
import Service from '../../services/System/MenuService'

export default {
    name: 'system_menu',
    initialState: {
        isLoading: false,
        isSaving: false,
        isDeleting:false,
        isMoving:false,
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
            actions.system_menu.set({isLoading: true})
            var result = await Service.QueryAll()
            actions.system_menu.set({isLoading: false})

            if (result.status === 1) {
                actions.system_menu.set({
                    data: result.data,
                })
            }
            return result
        },

        async queryById(id) {
            actions.system_menu.set({isLoading: true})
            var result = await Service.QueryById(id)
            actions.system_menu.set({isLoading: false})
            return result
        },

        async save(params) {
            actions.system_menu.set({isSaving: true})
            let result = null
            if (params.id)
                result = await Service.Update(params)
            else
                result = await Service.Add(params)
            actions.system_menu.set({isSaving: false})
            return result
        },

        async 'delete'(id) {
            actions.system_menu.set({isDeleting: true})
            let result = await Service.Delete(id)
            actions.system_menu.set({isDeleting: false})
            return result
        },

        async move({id,direction}) {
            actions.system_menu.set({isMoving: true})
            let result = await Service.UpdatePosition({id, direction})
            actions.system_menu.set({isMoving: false})
            return result
        },
    }
}