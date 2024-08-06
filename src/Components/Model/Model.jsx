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
            <h1>Models</h1>
                <table>
                    <tr>
                        <th>Model</th>
                        <th>Brand</th>
                    </tr>
                </table>
            {
                models && models.map((item, index) => (
                    <div key={index}>
                    </div>
                ))
            }
        </div>
    );
};

export default Model;

