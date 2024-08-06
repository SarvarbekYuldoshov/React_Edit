import React, { useEffect, useState } from 'react';
import "./Model.css";
import axios from 'axios';

const Model = () => {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]); 
    const [name,setName] = useState(' ');
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

    const addModel = (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('brandid', brandid)
        axios({
            url:`https://autoapi.dezinfeksiyatashkent.uz/api/models`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data:formData,
        })
    }

    return (
        <div>
            <input type="text" onChange={(e)=>setName(e.target.value)} />
            <select name="" id="" onChange={(e)=>setBrandid(e.target.value)}>
                {
                    brands && brands.map((brand, index) => (
                        <option key={index} value={brand.id}>{brand.title}</option> // Added return statement and key attribute
                    ))
                }
            </select>
            <button>Add</button>
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
                            <tr key={index}> {}
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


