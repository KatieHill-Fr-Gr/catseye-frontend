import './FormModal.css'
import { useState } from 'react';
import { X, Edit, Plus } from 'lucide-react';


const FormModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <button
            onClick={onClose}
            className='modal-close-button'>
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default FormModal