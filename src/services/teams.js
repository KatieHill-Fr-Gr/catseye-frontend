import axios from 'axios';

export const getTeams = async () => {
  try {
    const response = await axios.get('/teams/')
    return response.data
  } catch (error) {
    console.error('Error fetching teams:', error)
    throw error
  }
}