import {GET,PUT} from '../../utils/http'

export default {

    /**
     * 查询规则和ACL白名单
     * @returns {Promise<*>}
     * @constructor
     */
    async Query() {
        return GET({
            url: '/api/system/safety'
        })
    },


    /**
     * 更新安全策略
     * 可指定更新单个或多个项
     * @param obj
     * @returns {Promise<*>}
     * @constructor
     */
    async Update(obj) {
        return PUT({
            url: '/api/system/safety',
            data: obj
        })
    },

    /**
     * 更新ACL白名单
     * @param userId
     * @param ip
     * @returns {Promise<*>}
     * @constructor
     */
    async UpdateACL({userId,ip}) {
        return PUT({
            url: '/api/system/safety/acl',
            data: {userId, ip}
        })
    },

}