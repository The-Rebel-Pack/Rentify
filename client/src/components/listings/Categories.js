import React, { useContext, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import qs from 'qs';
import { ListingsContext } from '../../context/ListingsContext';
import './style/Categories.css';

const Categories = () => {
    let location = useLocation();

    const {
        categories,
        setCategories
    } = useContext(ListingsContext);

    const fetchData = useCallback(
        async () => {
            const searchParams = qs.parse(location.search.replace(/[?]/, ''));

            const categoriesParam = searchParams.categories
                ? searchParams.categories.split(',').map(c => parseInt(c))
                : null;

            const res = await axios.get('http://localhost:5000/api/listings/categories');
            const withCheckStatus = res.data.map((c) => (
                {
                    ...c,
                    checked: false
                }
            ));
            let newStatusCategories = withCheckStatus;

            if (categoriesParam) {
                newStatusCategories = withCheckStatus.map((c) => {
                    if (categoriesParam.includes(c.c_id)) {
                        return ({
                            ...c,
                            checked: true
                        })
                    }
                    return c;
                })
            }
            setCategories(newStatusCategories);
        },
        [setCategories, location],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (idx) => {
        const updatedCheckValues = categories.map((c) => c);
        updatedCheckValues[idx] = {
            ...updatedCheckValues[idx],
            checked: !updatedCheckValues[idx].checked
        }
        setCategories(updatedCheckValues);
    };

    return (
        <>
            {categories &&
                <div className='categories'>
                    {categories.map((c, idx) => (
                        <span key={c.c_id}>
                            <input
                                type="checkbox"
                                name={c.category}
                                onChange={() => handleChange(idx)}
                                checked={c.checked || false}
                                className='categories__checkbox'
                            />
                            <label
                                htmlFor={c.category}
                                onClick={() => handleChange(idx)}
                                className='categories__label'
                            >
                                {c.category}
                            </label>
                        </span>
                    )
                    )}
                </div>
            }
        </>
    )
}

export default Categories
