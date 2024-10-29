import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReview } from '../services/newServices';

const createReview = () => {
  const navigate = useNavigate ();
  const [formData, setFormData] = useState (
    
  )
  return (
    <div>
      <p>crea una review</p>
    </div>
  )
}

export default createReview
