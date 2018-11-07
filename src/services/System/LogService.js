import {GET} from '../../utils/http'

export default {

    /**
     * 查询日志
     * @param logType
     * @param logLevel
     * @param userName
     * @param address
     * @param keywords
     * @param startTime
     * @param endTime
     * @param start
     * @param limit
     * @returns {Promise<*>}
     * @constructor
     */
    async Query({logType='', logLevel='', userName='',address='',keywords='',startTime='',endTime='',start=0,limit=50}) {
        return GET({
            url: '/api/system/log',
            params: {logType, logLevel, userName, address, keywords, startTime, endTime, start, limit}
        })
    },

    /**
     * 查询日志类型
     * @returns {Promise<*>}
     * @constructor
     */
    async QueryTypes() {
        return GET({
            url: '/api/system/log/type',
        })
    },

}