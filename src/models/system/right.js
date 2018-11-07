import {actions} from 'mirrorx'
import Service from '../../services/System/RightService'

export default {
    name: 'system_right',
    initialState: {

        isLoading: false,
        isSaving: false,
        isDeleting:false,

        menu: null,
        rights: [],

        isSwitching: false,
        switching:[],

        isEditOpen: false,
        editItem: null,
    },
    reducers: {
        set(state, data) {
            return {
                ...state,
                ...data
            }
        },
        openEdit(state, right) {
            return {
                ...state,
                isEditOpen: true,
                editItem: right
            }
        },
        closeEdit(state){
            return {
                ...state,
                isEditOpen: false,
                editItem: null
            }
        },
        openAdd(state){
            return {
                ...state,
                isEditOpen: true,
                editItem: {menuId: state.menu.id}
            }
        },
        toSwitch(state,id) {
            return {
                ...state,
                isSwitching: true,
                switching: [...state.switching, id]
            }
        },
        endSwitch(state,id){
            return {
                ...state,
                isSwitching: false,
                switching: state.switching.filter(roleId => roleId !== id)
            }
        }

    },
    effects: {
        async queryByMenuId(id) {
            actions.system_right.set({isLoading: true})
            var result = await Service.QueryByMenuId(id)
            actions.system_right.set({isLoading: false})
            if(result.status === 1 && result.data.length >0)
                actions.system_right.set({
                    menu:result.data[0].menu,
                    rights:result.data[0].rights
                })
            return result
        },

        async save(params) {
            actions.system_right.set({isSaving: true})
            let result = null
            if (params.id)
                result = await Service.Update(params)
            else
                result = await Service.Add(params)
            actions.system_right.set({isSaving: false})
            return result
        },

        async 'delete'(id) {
            actions.system_right.set({isDeleting: true})
            let result = await Service.Delete(id)
            actions.system_right.set({isDeleting: false})
            return result
        },

        async switch({rightId,roleId}) {
            actions.system_right.toSwitch(rightId)
            let result = await Service.ToggleRightOfRole({rightId, roleId})
            actions.system_right.endSwitch(rightId)
            return result
        },

        async switchAll({rightId,toggle}) {
            actions.system_right.toSwitch(rightId)
            let result = await Service.ToggleRightOfAll({rightId,toggle})
            actions.system_right.endSwitch(rightId)
            return result
        }
    }
}