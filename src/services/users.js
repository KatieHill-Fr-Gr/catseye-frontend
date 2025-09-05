import axios from 'axios'

export const signUp = async (formData) => {
  return axios.post(import.meta.env.VITE_API_URL + '/users/sign-up/', formData)
}

export const signIn = async (formData) => {
  return axios.post(import.meta.env.VITE_API_URL + '/users/sign-in/', formData)
}

export const updateUserProfile = async (userId, formData) => {
  const url = import.meta.env.VITE_API_URL + `/users/${userId}/`
  
  const token = localStorage.getItem('catseye-token')
  
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}