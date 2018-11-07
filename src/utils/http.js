import httpSign from './http.sign'
import {encrypt} from './crypto'



/**
 * 默认响应内容
 * @type {{status: 0, message: string, count: number, result: Array}}
 * status 0 失败 1 成功 -1 无效会话 -2 非法请求
 */
const RESULT_DEFAULT = {
    status: 0,
    message: null,
    count: 0,
    data: []
}


/**
 * HTTP请求头
 * @returns {{Content-Type: string, Authorization: string}}
 */
const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': httpSign()
    }
}

/**
 * 处理请求URL
 * @param url
 * @param params
 * @returns {*}
 */
const formatUrl = (url,params) => {

    const placeholderParams = (url.match(/{[\S\s]+?}/g) || [])

    //替换URL的花括号占位符
    placeholderParams.forEach(placeholder => {
        const name = placeholder.replace('{', '').replace('}', '')
        const value = (params[name] === undefined ? '' : params[name].toString())
        url = url.replace(new RegExp(placeholder, 'g'), encrypt(value))
    })

    //其他参数追加为URL参数
    const urlParams = []
    for (const name in params) {
        if (placeholderParams.indexOf(name) === -1)
            urlParams.push(`${name}=${encrypt(params[name].toString())}`)
    }

    if (urlParams.length > 0) {
        if (url.indexOf('?') > 0)
            url = `${url}&${urlParams.join('&')}`
        else
            url = `${url}?${urlParams.join('&')}`
    }

    return url
}

/**
 * 处理响应内容
 * @param response
 * @returns {*}
 */
async function formatResponse(response) {
    let result = null
    if (response.status === 200) {
        result = await response.json()
    } else {
        result = {message: response.statusText}
    }

    return Object.assign({}, RESULT_DEFAULT, result)
}

/**
 * GET
 * @param url
 * @param params
 * @returns {*}
 * @constructor
 */
export async function GET({url,params = {}}) {
    url = formatUrl(url, params)

    try {
        const response = await fetch(url, {
            headers: getHeaders()
        })
        return await formatResponse(response)
    } catch (e) {
        return Object.assign({}, RESULT_DEFAULT, {message: '发生未知的网络错误'})
    }


}

/**
 * POST
 * @param url
 * @param params
 * @param data
 * @constructor
 */
export async function POST({url,params={},data={}}) {
    url = formatUrl(url, params)
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: encrypt(JSON.stringify(data))
    })
    return await formatResponse(response)
}

/**
 * PUT
 * @param url
 * @param params
 * @param data
 * @constructor
 */
export async function PUT({url,params={},data={}}) {
    url = formatUrl(url, params)
    const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: encrypt(JSON.stringify(data))
    })
    return await formatResponse(response)
}

/**
 * DELETE
 * @param url
 * @param params
 * @returns {*}
 * @constructor
 */
export async function DELETE({url,params = {}}) {
    url = formatUrl(url, params)
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders()
    })
    return await formatResponse(response)
}


export function GetUploadProps(callback) {
    return {
        name: 'file',
        action: '/api/file',
        headers: {
            'Authorization': httpSign()
        },
        onChange(info) {
            if (info.file.status === 'done') {
                callback(info.file.response)
            }
            if (info.file.status === 'error') {
                callback({success:false,message:'上传时发生错误'})
            }
        }
    }
}






