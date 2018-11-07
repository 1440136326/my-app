import {GET,POST,DELETE,PUT} from '../../utils/http'

export default {

    /**
     * 查询用户
     * @param name
     * @param deptId
     * @param roleId
     * @param enabled
     * @returns {Promise.<*>}
     * @constructor
     */
    async Query({name='',deptId='',roleId='',enabled=''}) {
        return GET({
            url: '/api/system/user',
            params: {name, deptId, roleId, enabled}
        })
    },

    /**
     * 查询所有锁定账号
     * @returns {Promise<*>}
     * @constructor
     */
    async QueryLocked() {
        return GET({
            url: '/api/system/user/locked'
        })
    },

    /**
     * 根据ID查询用户
     * @param id
     * @returns {Promise.<*>}
     * @constructor
     */
    async QueryById(id) {
        return GET({
            url: '/api/system/user/{id}',
            params: {id}
        })
    },


    /**
     * 新增用户
     * @param name
     * @param uid
     * @param deptId
     * @param roleId
     * @param email
     * @param phone
     * @returns {Promise<*>}
     * @constructor
     */
    async Add({name='',uid='',deptId='',roleId='',email='',phone=''}) {
        return POST({
            url: '/api/system/user',
            data: {name, uid, deptId, roleId, email, phone}
        })
    },

    /**
     * 编辑用户
     * @param id
     * @param name
     * @param uid
     * @param deptId
     * @param roleId
     * @param email
     * @param phone
     * @returns {Promise<*>}
     * @constructor
     */
    async Update({id='',name='',uid='',deptId='',roleId='',email='',phone=''}) {
        return PUT({
            url: '/api/system/user/{id}',
            params: {id},
            data: {name, uid, deptId, roleId, email, phone}
        })
    },

    /**
     * 删除用户
     * @param id
     * @returns {Promise<*>}
     * @constructor
     */
    async Delete(id) {
        return DELETE({
            url: '/api/system/user/{id}',
            params: {id},
        })
    },

    /**
     * 清除锁定
     * @param uid
     * @returns {Promise<*>}
     * @constructor
     */
    async DeleteLocked(uid) {
        return DELETE({
            url: '/api/system/user/locked/{uid}',
            params: {uid},
        })
    },

    /**
     * 重置用户密码
     * @param id
     * @returns {Promise<*>}
     * @constructor
     */
    async ResetPwd(id) {
        return PUT({
            url: '/api/system/user/{id}/password',
            params: {id},
        })
    },

    /**
     * 修改密码
     * @param uid
     * @param oldPwd
     * @param newPwd
     * @returns {Promise}
     * @constructor
     */
    async ChangePwd({uid, oldPwd, newPwd}) {
        return PUT({
            url: '/api/system/user/password',
            data: {uid, oldPwd, newPwd}
        })
    },

    /**
     * 切换用户可用权限
     * @param id
     * @returns {Promise<*>}
     * @constructor
     */
    async ToggleEnabled(id) {
        return PUT({
            url: '/api/system/user/{id}/enabled',
            params: {id},
        })
    },

    /**
     * 更新用户设置
     * @param id
     * @param name
     * @param value
     * @returns {Promise<*>}
     * @constructor
     */
    async UpdateSetting({id,name,value}){
        return PUT({
            url: '/api/system/user/{id}/setting',
            params: {id},
            data: {name,value}
        })
    }
}