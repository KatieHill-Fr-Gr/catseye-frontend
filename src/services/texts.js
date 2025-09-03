
import axios from 'axios'


export const getSourceTexts = () => {
    return axios.get(`${BASE_URL}texts/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const textShow = (sourceId) => {
    return axios.get(`${BASE_URL}texts/${sourceId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const textCreate = (formData) => {
    return axios.post(`${BASE_URL}texts/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const textUpdate = (sourceId, formData) => {
    const token = getToken()
    return axios.put(`${BASE_URL}texts/${sourceId}/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const textDelete = (sourceId) => {
    return axios.delete(`${BASE_URL}texts/${sourceId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}