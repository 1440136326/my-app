import {GET} from '../../utils/http'

export default {

    /**
     * 查询所有部门
     * @returns {Promise.<*>}
     * @constructor
     */
    async QueryAll() {
        return GET({
            url: '/api/system/dept'
        })
    }

}