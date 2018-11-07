import {GET,POST,DELETE} from '../utils/http'

export default {

    /**
     * 获取用户会话(登陆)
     * @param uid
     * @param pwd
     * @returns {Promise}
     * @constructor
     */
    async CreateToken({uid, pwd}) {
        return POST({
            url: '/api/token',
            data: {uid, pwd}
        })
    },

    /**
     * 查询当前会话用户
     * @returns {Promise.<*>}
     * @constructor
     */
    async GetTokenUser() {
        return GET({
            url: '/api/token/user',
        })
    },

    /**
     * 清除会话(登出)
     * @returns {Promise.<*>}
     * @constructor
     */
    async ClearToken() {
        return DELETE({
            url: '/api/token'
        })
    }
}