import React, { useEffect, useState } from 'react'
import "./Brands.css"
import axios from 'axios'
import Item from 'antd/es/list/Item'
const Brands = () => {
    const [brands, setBrands] = useState([])
    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
        .then(res=>setBrands(res.data.data))
    }
    useEffect(()=>{
        getBrands()
    },[])
  return (
    <div>
       <h1>Brands</h1>
       {
        brands && brands.map((Item,index)=>({
            
        }
        ))
       }
    </div>
  )
}

export default Brands
