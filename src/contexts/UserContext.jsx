import { createContext, useState } from 'react'
import { getUser } from '../utils/auth'
import { removeToken } from '../utils/auth'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser())

  const signOut = () => {
      removeToken()
      setUser(null)
    }

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }