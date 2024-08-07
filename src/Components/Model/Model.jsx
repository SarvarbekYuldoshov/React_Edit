import React, { useEffect, useState } from 'react';
import "./Model.css";
import axios from 'axios';
import { message, Button } from 'antd';

const Model = () => {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]); 
    const [name, setName] = useState('');
    const [brandid, setBrandid] = useState('');
    const [hover, setHover] = useState(null);

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

        const url = hover ? `https://autoapi.dezinfeksiyatashkent.uz/api/models/${hover.id}` : `https://autoapi.dezinfeksiyatashkent.uz/api/models`;
        const method = hover ? 'PUT' : 'POST';

        axios({
            url,
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData,
        })
        .then(res => {
            if (res.data.success) {
                hover ? message.success("Updated successfully") : message.success("Added successfully");
                setHover(null); 
                setName(''); 
                setBrandid(''); 
                getModels();
            }
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const deleteModel = (id) => {
        axios({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(res => {
            message.success("Deleted successfully");
            getModels();
        })
        .catch(err => {
            message.error("Error occurred");
        });
    };

    const showModal = (item) => {
        setHover(item);
        setName(item.name);
        setBrandid(item.brand_id);
    };

    return (
        <div className='model'>
            <input 
                className='model-input' 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <select 
                className='model-select' 
                value={brandid} 
                onChange={(e) => setBrandid(e.target.value)}
            >
                <option value="">Select Brand</option>
                {
                    brands && brands.map((brand, index) => (
                        <option key={index} value={brand.id}>{brand.title}</option>
                    ))
                }
            </select>
            <button className='model-btn' onClick={addModel}>
                {hover ? 'Update' : 'Add'}
            </button>
            <table>
                <thead>
                    <tr>
                        <th className='th-a'>Model</th>
                        <th className='th-b'>Brand</th>
                        <th className='th-c'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models && models.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.brand_title}</td>
                                <td className='td'>
                                    <Button className='model-btn-a'onClick={() => showModal(item)}>Edit</Button> 
                                    <Button 
                                        className='model-btn-b' 
                                        onClick={() => deleteModel(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Model;





