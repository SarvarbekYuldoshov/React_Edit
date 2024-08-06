import React, { useEffect, useState } from 'react';
import "./Model.css";
import axios from 'axios';
import { message } from 'antd';

const Model = () => {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]); 
    const [name, setName] = useState('');
    const [brandid, setBrandid] = useState('');

    const getModels = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
            .then(res => setModels(res.data.data))
            .catch(err => console.error(err));
    };

    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
            .then(res => setBrands(res.data.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getModels();
        getBrands();
    }, []);

    const addModel = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand_id', brandid);
        axios({
            url: 'https://autoapi.dezinfeksiyatashkent.uz/api/models',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData,
        })
        .then(res => {
            if (res.data.success) {
                message.success("Qushildi");
                getModels();
            }
        })
        .catch(err => {
            message.error("Xatolik");
        });
    };
    const deleteModel = (id) =>{
        axios:({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                },
        })
    }

    return (
        <div className='model'>
            <input className='model-input' type="text" onChange={(e) => setName(e.target.value)} />
            <select className='model-select' onChange={(e) => setBrandid(e.target.value)}>
                <option value="">Select Brand</option>
                {
                    brands && brands.map((brand, index) => (
                        <option key={index} value={brand.id}>{brand.title}</option>
                    ))
                }
            </select>
            <button className='model-btn' onClick={addModel}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models && models.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.brand_title}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Model;


