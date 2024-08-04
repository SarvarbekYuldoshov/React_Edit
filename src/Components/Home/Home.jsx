import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import { useNavigate } from 'react-router';

const Home = () => {
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const getCities = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
            .then(res => setCities(res.data.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if(!token){
            navigate('/')
        }
        getCities();
    }, []);

    const showModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

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
            title: 'Action',
            dataIndex: 'action',
        }
    ];

    const data = cities.map((city, index) => ({
        number: index + 1,
        key: index,
        name: city.name,
        text: city.text,
        images: (
            <img 
                width={150}
                src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`} 
                alt={city.name} 
            />
        ),
        action: (
            <>
                <Button type='primary'>Edit</Button> 
                <Button type='primary' danger>Delete</Button>
            </>
        )
    }));

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        formData.append('images', image);

        axios({
            url: 'https://autoapi.dezinfeksiyatashkent.uz/api/cities',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData
        })
        .then(res => {
            if (res.data.success) {
                message.success("Qo'shildi");
                setOpen(false);
                getCities();
            }
        })
        .catch(err => console.log(err));
    }
    
    const deleteCities = (id) =>{
        axios()
    }
    return (
        <div className='home'>
            <div className='container home-container'>
                <ul className='home-list'>
                    <Button type='primary' className='home-btn' onClick={showModal}>Add</Button>
                </ul>
                <Table columns={columns} dataSource={data} />
                <Modal open={open} footer={null} onCancel={closeModal}>
                    <Form className='home-form' onFinish={handleSubmit}>
                        <Form.Item 
                            className='home-item-a' 
                            label="Name" 
                            name='name'
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <Input className='home-input-a' width={50} placeholder='Name' />
                        </Form.Item>
                        <Form.Item 
                            className='home-item' 
                            label="Text" 
                            name='text'
                            rules={[{ required: true, message: 'Please input the text!' }]}
                        >
                            <Input className='home-input' width={50} placeholder='Text' />
                        </Form.Item>
                        <Form.Item 
                            className='home-item-a' 
                            label="Images" 
                            name='images'
                            rules={[{ required: true, message: 'Please upload an image!' }]}
                        >
                            <Input 
                                onChange={(e) => setImage(e.target.files[0])} 
                                type='file' 
                                width={50} 
                                placeholder='Images' 
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button className='home-btn-a' type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>        
        </div>
    );
}

export default Home;

