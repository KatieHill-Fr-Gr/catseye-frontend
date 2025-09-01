import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'


const UserProfile = ({ user }) => (
  <div>
    <img src={user.profileImg} alt="Profile" />
    <h3>{user.name}</h3>
    {/* User-specific content */}
  </div>
);