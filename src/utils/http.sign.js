import moment from 'moment'
import {APP_ID} from '../constant'
import {md5,encrypt} from './crypto'
import Storage from './storage'

/**
 * 生成6位随机字符串
 * @returns {string}
 */
const getNonce = () => {
    const seeds = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    const selected = []
    while (selected.length < 6) {
        selected.push(seeds[Math.floor(Math.random() * seeds.length)])
    }
    return selected.join('')
}



export default function httpSign() {
    const token = Storage.getToken();
    const header = btoa(JSON.stringify({
        typ: 'JWT',
        alg: 'MD5'
    }))

    const payload = btoa(JSON.stringify({
        iss: APP_ID,
        iat: moment().valueOf(),
        jti: getNonce(),
        token: (token && token.id) ? token.id : ''
    }))

    const sign = md5(encrypt(`${header}.${payload}`))

    return btoa(`${header}.${payload}.${sign}`)
}