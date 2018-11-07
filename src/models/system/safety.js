import {actions} from 'mirrorx'
import Service from '../../services/System/SafetyService'

export default {
    name: 'system_safety',
    initialState: {
        isLoading: false,
        isSaving: false,
        safety: null,
        acls: []
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

            actions.system_safety.set({isLoading: true})
            var result = await Service.Query()

            actions.system_safety.set({
                isLoading: false
            })

            if (result.status === 1) {
                actions.system_safety.set({
                    safety: result.data[0].safety,
                    acls: result.data[0].acls
                })
            }
            return result
        },


        async save(params) {
            actions.system_safety.set({isSaving: true})
            let result = await Service.Update(params)
            actions.system_safety.set({isSaving: false})
            return result
        },


        async saveAcl(params) {
            actions.system_safety.set({isSaving: true})
            const result = await Service.UpdateACL(params)
            actions.system_safety.set({isSaving: false})
            return result
        },
    }
}