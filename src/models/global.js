import {actions} from 'mirrorx'
import Service from '../services/TokenService'

export default {
    name: 'global',
    initialState: {
        isLogging: false,
        user: null,
        rights: [],
        currentMenu: null,
        menus: [],

    },
    reducers: {
        set(state, data) {
            return {
                ...state,
                ...data
            }
        },
    },
    effects: {
        async login({uid, pwd}) {
            actions.global.set({isLogging: true})
            const result = await Service.CreateToken({uid, pwd});
            actions.global.set({isLogging: false})
            if (result.status === 1) {
                actions.global.set({
                    ...result.data[0],
                })
                actions.routing.push('/home')
            }
            return result
        },
        async logout(){
            Service.ClearToken()
            actions.global.set({
                user: null,
                menus: [],
                rights: []
            })
            actions.routing.push('/')
        },
        async getTokenUser() {
            actions.global.set({isLoading: true})
            const result = await Service.GetTokenUser()
            actions.global.set({isLoading: false})
            if (result.status === 1) {
                actions.global.set({
                    ...result.data[0],
                })
            }
            return result
        },
    }
}