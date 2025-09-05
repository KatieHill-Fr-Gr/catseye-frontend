
import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL

export const getTranslations = () => {
    return axios.get(`${BASE_URL}/translations/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const translationShow = (translationId) => {
    return axios.get(`${BASE_URL}/translations/${translationId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const translationCreate = (formData) => {
    return axios.post(`${BASE_URL}/translations/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const translationUpdate = (translationId, formData) => {
    const token = getToken()
    return axios.put(`${BASE_URL}/translations/${translationId}/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const translationDelete = (translationId) => {
    return axios.delete(`${BASE_URL}/translations/${translationId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}