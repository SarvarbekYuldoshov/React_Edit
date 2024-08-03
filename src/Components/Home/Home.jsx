import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from 'axios';
const Home = () => {
    const [cities,setCities] = useState([]);
    const getCities = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
        .then(res=setCities(res.data.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>[
        getCities()
    ],[])
  return (
    <div>
     
    </div>
  )
}

export default Home
