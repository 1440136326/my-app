import {TOKEN_STORAGE_NAME,TOKEN_USER_STORAGE_NAME,UID_STORAGE_NAME} from '../constant'
import cookie from 'react-cookie'
import moment from 'moment'
import {encrypt,decrypt} from './crypto'

/**
 * 新增本地数据
 * @param name
 * @param value
 */
const set = (name, value) => {
    name = encrypt(name)
    value = encrypt(value)
    if (localStorage)
        localStorage[name] = value
    else
        cookie.save(name, value)
}

/**
 * 获取本地数据
 * @param name
 * @returns {null}
 */
const get = (name) => {
    name = encrypt(name)
    let value = null
    if (localStorage)
        value = localStorage[name] || null
    else
        value = cookie.load(name) || null

    if (!value)
        return null

    try {
        return decrypt(value)
    } catch (e) {
        return null
    }

}

/**
 * 清除本地数据
 * @param name
 */
const clear = (name) => {
    name = encrypt(name)
    if (localStorage) {
        localStorage[name] && (delete localStorage[name])
    } else
        cookie.remove(name)
}


export default {
    /**
     * 获取会话
     * @returns {null}
     */
    getToken() {
        const temp = get(TOKEN_STORAGE_NAME)

        if (temp == null)
            return null
        try {
            const token = JSON.parse(temp);
            const {insertTime, expireInterval} = token

            if (insertTime + expireInterval * 1000 >= moment().valueOf())
                return token
            return null
        } catch (e) {
            return null
        }
    },
    /**
     * 保存会话
     * @param token
     */
    setToken(token) {
        set(TOKEN_STORAGE_NAME, JSON.stringify(token))
    },
    /**
     * 清除会话
     */
    clearToken(){
        clear(TOKEN_STORAGE_NAME)
    },

    /**
     * 获取用户信息
     * @returns {null}
     */
    getUser() {
        const temp = get(TOKEN_USER_STORAGE_NAME)
        try {
            const user = JSON.parse(temp)
            if (user)
                return user
            return null
        } catch (e) {
            return null
        }
    },
    /**
     * 保存用户信息
     * @param user
     */
    setUser(user) {
        set(TOKEN_USER_STORAGE_NAME, JSON.stringify(user))
    },

    /**
     * 清除用户信息
     */
    clearUser(){
        clear(TOKEN_USER_STORAGE_NAME)
    },

    /**
     * 获取记住的用户名
     * @returns {*}
     */
    getRememberUid(){
        return get(UID_STORAGE_NAME)
    },
    /**
     * 保存记住的用户名
     * @param uid
     */
    setRememberUid(uid){
        set(UID_STORAGE_NAME, uid)
    },

    /**
     * 清除记住的用户名
     */
    clearRememberUid(){
        clear(UID_STORAGE_NAME)
    },


}


