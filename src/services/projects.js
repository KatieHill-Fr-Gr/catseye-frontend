import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL

export const projectsIndex = () => {
    return axios.get(`${BASE_URL}projects/`)
}

export const getUserTeamProjects = () => {
    return axios.get(`${BASE_URL}projects/user-team-projects/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const projectShow = (projectId) => {
    return axios.get(`${BASE_URL}projects/${projectId}`)
}

export const projectCreate = (formData) => {
    return axios.post(`${BASE_URL}projects/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const projectUpdate = (projectId, formData) => {
    const token = getToken()
    return axios.put(`${BASE_URL}projects/${projectId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const projectDelete = (projectId) => {
    return axios.delete(`${BASE_URL}projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}