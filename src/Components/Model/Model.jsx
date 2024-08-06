import React, { useEffect, useState } from 'react'
import "./Model.css"
import axios from 'axios'
const Model = () => {
    const [models,setModels] = useState([])
    const [category,setCategory] = useState([])
    const getModels = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
        .then(res=>setModels(res.data.data))
    }
    useEffect(()=>{
        getModels()
    },[])
  return (
    <div>
        <h1>Models</h1>
      {
        models && models.map((item,index)=>{
            <div key={index}>
                <h2>{item.name}</h2>
                <h3>{item.brand_title}</h3>
            </div>
        })
      }
    </div>
  )
}

export default Model
