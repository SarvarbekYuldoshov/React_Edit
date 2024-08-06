import React, { useEffect, useState } from 'react';
import "./Model.css";
import axios from 'axios';

const Model = () => {
    const [models, setModels] = useState([]);
    const [category, setCategory] = useState([]);

    const getModels = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
            .then(res => setModels(res.data.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getModels();
    }, []);

    return (
        <div>
                <table>
                    <tr>
                        <th className='model-th'>Model</th>
                        <th className='model-th'>Brand</th>
                    </tr>
                    {
                models && models.map((item, index) => (
                    <div key={index}>
                        <tr>
                            <td className='model-td'>{item.name}</td>
                            <td className='model-td'>{item.brand_title}</td>
                        </tr>
                    </div>
                ))
            }
                </table>
        </div>
    );
};

export default Model;

