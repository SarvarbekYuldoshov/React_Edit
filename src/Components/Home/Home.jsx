import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from 'axios';
import { Table } from 'antd';
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
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Text',
            dataIndex: 'text',
        },
        {
            title: 'Images',
            dataIndex: 'images',
        }
    ]
  return (
    <div>
        <Table columns={columns} dataSource={data}/>
    </div>
  )
}

export default Home
