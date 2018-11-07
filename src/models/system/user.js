import {actions} from 'mirrorx'
import Service from '../../services/System/UserService'

export default {
    name: 'system_user',
    initialState: {
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        filter: {
            name:'',
            deptId:'',
            roleId:'',
            enabled:'',
        },
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
        async query(params, getState) {

            actions.system_user.set({isLoading: true})
            const filter = Object.assign({}, getState().system_user.filter, params)

            var result = await Service.Query(filter)

            actions.system_user.set({
                isLoading: false,
                filter
            })

            if (result.status === 1) {
                actions.system_user.set({
                    data: result.data,
                })
            }
            return result
        },

        async queryLocked() {
            var result = await Service.QueryLocked()
            return result
        },

        async queryById(id) {
            actions.system_user.set({isLoading: true})
            var result = await Service.QueryById(id)
            actions.system_user.set({isLoading: false})
            return result
        },

        async save(params) {
            actions.system_user.set({isSaving: true})
            let result = null
            if (params.id)
                result = await Service.Update(params)
            else
                result = await Service.Add(params)
            actions.system_user.set({isSaving: false})
            return result
        },

        async 'delete'(id) {
            actions.system_user.set({isDeleting: true})
            let result = await Service.Delete(id)
            actions.system_user.set({isDeleting: false})
            return result
        },

        async deleteLocked(uid) {
            let result = await Service.DeleteLocked(uid)
            return result
        },

        async changePwd({uid, oldPwd, newPwd}) {
            return await Service.ChangePwd({uid, oldPwd, newPwd})
        },

        async resetPwd(id) {
            actions.system_user.set({isSaving: true})
            let result = await Service.ResetPwd(id)
            actions.system_user.set({isSaving: false})
            return result
        },

        async toggleEnabeld(id) {
            actions.system_user.set({isSaving: true})
            let result = await Service.ToggleEnabled(id)
            actions.system_user.set({isSaving: false})
            return result
        },

        async setting(params) {
            actions.system_user.set({isSaving: true})
            const result = await Service.UpdateSetting(params)
            actions.system_user.set({isSaving: false})
            return result
        },
    }
}