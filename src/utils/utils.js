/**
 * 构建树形数据源
 * @param items
 */
export const buildTreeData = (items)=> {
    const buildChildren = (parent, items) => {
        const children = items.filter(item => parent.id === item.parentId)
        if (children.length > 0) {
            parent.children = children
            parent.children.map(child => buildChildren(child, items))
        }
    }

    const root = {id: ''}
    buildChildren(root, items)

    return root.children || []
}


/**
 * 构建级联选项
 * @param items<{id,name,parentId}>
 * @returns {Array}
 */
export const buildCascaderOptions = (items) => {
    const buildChildren = (parent,items) => {
        const children = items.filter(item => parent.value === item.parentId).map(item => ({
            value: item.id,
            label: item.name
        }))
        if (children.length > 0) {
            parent.children = children
            parent.children.map(item => buildChildren(item, items))
        }
    }

    const root = {value:''}
    buildChildren(root,items)
    return root.children || []
}

/**
 * 构建级联完整值
 * @param value
 * @param items<{id,name,parentId}>
 * @returns {Array}
 */
export const buildCascaderValue = (value,items) => {
    let values = [value]
    const buildParent = (value, items) => {
        const item = items.find(item => item.id === value)
        if (item) {
            values = [item.parentId, ...values]
            buildParent(item.parentId, items)
        }
    }
    buildParent(value, items)
    // if (values.length === 1 && values[0] === '')
    //     values = []
    return values
}


export const isIP = (ip) => {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip);
}

export const isIPList = (ips)=> {
    const ipList = ips.split(',')
    return ipList.length > 0 && ipList.filter(ip => !isIP(ip)).length === 0
}

export const isIPRange=(ipRange)=> {
    const ips = ipRange.split('-')
    if (ips.length !== 2)
        return false

    const [start, end] = ips

    if (!isIP(start) || !isIP(end))
        return false

    const [s1, s2, s3, s4] = start.split('.')
    const [e1, e2, e3, e4] = end.split('.')

    if (s1 !== e1 || s2 !== e2 || s3 !== e3)
        return false

    if (parseInt(s4,0) > parseInt(e4,0))
        return false

    return true

}