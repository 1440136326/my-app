import {GET,POST,DELETE,PUT} from '../../utils/http'

export default {

    /**
     * 查询所有菜单
     * @returns {Promise<*>}
     * @constructor
     */
    async QueryAll() {
        return GET({
            url: '/api/system/menu',
        })
    },

    /**
     * 根据ID查询菜单
     * @param id
     * @returns {Promise.<*>}
     * @constructor
     */
    async QueryById(id) {
        return GET({
            url: '/api/system/menu/{id}',
            params: {id}
        })
    },

    /**
     * 新增菜单
     * @param name
     * @param parentId
     * @param code
     * @param url
     * @param icon
     * @param description
     * @returns {Promise<*>}
     * @constructor
     */
    async Add({name='',parentId='',code='',url='',icon='',description='',show=1}) {
        return POST({
            url: '/api/system/menu',
            data: {name, parentId, code, url, icon, description, show}
        })
    },

    /**
     * 编辑菜单
     * @param id
     * @param name
     * @param parentId
     * @param code
     * @param url
     * @param icon
     * @param description
     * @returns {Promise<*>}
     * @constructor
     */
    async Update({id='',name='',parentId='',code='',url='',icon='',description='',show=1}) {
        return PUT({
            url: '/api/system/menu/{id}',
            params: {id},
            data: {name, parentId, code, url, icon, description,show}
        })
    },

    /**
     * 删除菜单
     * @param id
     * @returns {Promise<*>}
     * @constructor
     */
    async Delete(id) {
        return DELETE({
            url: '/api/system/menu/{id}',
            params: {id},
        })
    },

    /**
     * 修改菜单位置
     * @param id
     * @param direction -1上移，1下移
     * @returns {Promise<*>}
     * @constructor
     */
    async UpdatePosition({id='',direction=1}) {
        return PUT({
            url: '/api/system/menu/{id}/position',
            params: {id},
            data:{direction}
        })
    },


}