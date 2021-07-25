import React, { useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';

const Categories = () => {
    const {
        categories,
        setCategories
    } = useContext(ListingsContext);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get('http://localhost:5000/api/listings/categories');
            const withCheckStatus = res.data.map((c) => (
                {
                    ...c,
                    checked: false
                }
            ));
            setCategories(withCheckStatus);
        },
        [setCategories],
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
                <ul>
                    {categories.map((c, idx) => (
                        <label key={c.id} htmlFor={c.names}>
                            <input type="checkbox" id={c.name} name={c.name} checked={c.checked} onChange={() => handleChange(idx)} />
                            {c.name}
                        </label>
                    )
                    )}
                </ul>
            }
        </>
    )
}

export default Categories
