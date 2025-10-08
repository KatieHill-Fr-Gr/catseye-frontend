import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL

export const projectsIndex = () => {
    return axios.get(`${BASE_URL}/projects/`)
}


export const projectShow = (projectId) => {
    return axios.get(`${BASE_URL}/projects/${projectId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const projectCreate = (formData) => {
    return axios.post(`${BASE_URL}/projects/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const projectUpdate = (projectId, formData) => {
    const token = getToken()
    return axios.put(`${BASE_URL}/projects/${projectId}/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const projectDelete = (projectId) => {
    return axios.delete(`${BASE_URL}/projects/${projectId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const getUserTeamProjects = () => {
    return axios.get(`${BASE_URL}/projects/user-team-projects/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const getProjectTeamUsers = (projectId) => {
    return axios.get(`${BASE_URL}/projects/${projectId}/team-users/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const getProjectTasks = (projectId) => {
    return axios.get(`${BASE_URL}/projects/${projectId}/tasks/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const getUserTasks = () => {
    return axios.get(`${BASE_URL}/projects/user-tasks/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const taskShow = (projectId, taskId) => {
    return axios.get(`${BASE_URL}/projects/${projectId}/tasks/${taskId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const taskCreate = (projectId, formData) => {
    return axios.post(`${BASE_URL}/projects/${projectId}/tasks/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const taskUpdate = (projectId, taskId, formData) => {
    return axios.put(`${BASE_URL}/projects/${projectId}/tasks/${taskId}/`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const taskUpdateStatus = (projectId, taskId, status) => {
    return axios.patch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}/`, { status },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    )
}

export const taskDelete = (projectId, taskId) => {
    return axios.delete(`${BASE_URL}/projects/${projectId}/tasks/${taskId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}