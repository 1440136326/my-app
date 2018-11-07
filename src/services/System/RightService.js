import {GET,POST,DELETE,PUT} from '../../utils/http'

export default {

    /**
     * 查询指定菜单的所有权限配置情况
     * @param menuId
     * @returns {Promise.<*>}
     * @constructor
     */
    async QueryByMenuId(menuId) {
        return GET({
            url: '/api/system/right',
            params: {menuId}
        })
    },

    /**
     * 新增权限
     * @param name
     * @param menuId
     * @param type
     * @param code
     * @param description
     * @returns {Promise}
     * @constructor
     */
    async Add({name='',menuId='',type=1,code='',description=''}) {
        return POST({
            url: '/api/system/right',
            data: {
                name,
                menuId,
                type,
                code,
                description
            }
        })
    },

    /**
     * 更新权限
     * @param id
     * @param name
     * @param menuId
     * @param type
     * @param code
     * @param description
     * @returns {Promise}
     * @constructor
     */
    async Update({id='',name='',menuId='',type=1,code='',description=''}){
        return PUT({
            url: '/api/system/right/{id}',
            params: {id},
            data: {
                name,
                menuId,
                type,
                code,
                description
            }
        })
    },

    /**
     * 删除权限
     * @param id
     * @returns {Promise}
     * @constructor
     */
    async Delete(id) {
        return DELETE({
            url: '/api/system/right/{id}',
            params: {id},
        })
    },

    /**
     * 启用或停用指定角色的指定权限
     * @param rightId
     * @param roleId
     * @returns {Promise}
     * @constructor
     */
    async ToggleRightOfRole({rightId='',roleId=''}) {
        return PUT({
            url: '/api/system/right/{rightId}/role/{roleId}',
            params: {roleId, rightId},
        })
    },

    /**
     * 启用或停用所有角色的指定权限
     * @param rightId
     * @param toggle
     * @returns {Promise}
     * @constructor
     */
    async ToggleRightOfAll({rightId='',toggle=1}) {
        return PUT({
            url: '/api/system/right/{rightId}/role',
            params: {rightId},
            data:{toggle}
        })
    },



}