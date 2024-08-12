import React, { useState } from 'react'
import "./Brands.css"
import axios from 'axios'
const Brands = () => {
    const [brands, setBrands] = useState([])
    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
        .then(res=>setBrands(res.data.data))
    }
  return (
    <div>

    </div>
  )
}

export default Brands
