import {GET} from '../../utils/http'

export default {

    /**
     * 查询所有角色
     * @returns {Promise.<*>}
     * @constructor
     */
    async QueryAll() {
        return GET({
            url: '/api/system/role'
        })
    }

}