import React, { useEffect, useState } from 'react';
import "./Brands.css";
import axios from 'axios';

const Brands = () => {
    const [brands, setBrands] = useState([]);

    const getBrands = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
        .then(res => setBrands(res.data.data))
        .catch(error => console.error('Error fetching brands:', error));
    };

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <div>
            <h1>Brands</h1>
            {
                brands && brands.map((brand, index) => (
                    <div key={index} className="brand-item">
                        <h2>{brand.id}</h2>
                    </div>
                ))
            }
        </div>
    );
};

export default Brands;





