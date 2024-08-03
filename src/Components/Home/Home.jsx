import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from 'axios';
import { Button, Table } from 'antd';
const Home = () => {
    const [cities,setCities] = useState([]);
    const getCities = () =>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
        .then(res=>setCities(res.data.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getCities()
     },[])
    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
        },
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
        },
        {
            title:'Action',
            dataIndex:'action',
        }
    ]
    const data = cities.map((city,index)=>(
        {
            number:index+1,
            key:index,
            name:city.name,
            text:city.text,
            images: (
                <img width={150}
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`} 
                    alt={city.name} 
                />),
                action: (
                    <>
                        <Button type='primary'>Edit</Button> 
                        <Button type='primary' danger>Delete</Button>
                    </>
                )
        }
    ))
  return (
    <div className='home'>
        <div className='container home-container'>
            <ul className='home-list'>
                <Button type='primary' className='home-btn'>Add</Button>
            </ul>
                <Table columns={columns} dataSource={data}/>
        </div>        
    </div>
  )
}

export default Home
