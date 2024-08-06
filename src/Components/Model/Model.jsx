import React, { useState } from 'react'
import "./Model.css"
import axios from 'axios'
const Model = () => {
    const [models,setModels] = useState([])
    const [category,setCategory] = useState([])
    const getModels = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
        .then(res=setModels(res.data))
    }
  return (
    <div>
      
    </div>
  )
}

export default Model
