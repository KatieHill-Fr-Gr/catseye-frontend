import { toCamelCase } from './cases.js'

const tokenName = 'catseye-token'

export const setToken = (tokenData) => {
    const token = tokenData.access || tokenData
    localStorage.setItem(tokenName, token)
}

export const getToken = () => {
    return localStorage.getItem(tokenName)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
}

export const getUser = () => {
    const token = getToken()
    if (!token) return null

    try {
        const payloadString = token.split('.')[1]
        const payload = JSON.parse(atob(payloadString))

        const user = payload.user || payload.user?.id || payload
        const exp = payload.exp

        const today = Date.now() / 1000
        if (today > exp) {
            removeToken()
            return null
        }
        return toCamelCase(user)
    } catch (error) {
        console.log('Token decode error')
        removeToken()
        return null
    }
}