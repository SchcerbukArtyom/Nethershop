import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetProductsQuery } from '../../features/api/apiSlice';
import Products from '../Products/Products';

const defaultValues = {
    title: "",
    price_min: "",
    price_max: "",
};

const Category = () => {
    const { id } = useParams();
    const list = useSelector(state => state.categories.list);
    const categoriesLoading = useSelector(state => state.categories.isLoading);
    const [values, setValues] = useState(defaultValues);
    const [params, setParams] = useState();
    const [isEnd, setEnd] = useState(false);
    const [items, setItems] = useState([]);
    const [cat, setCat] = useState(null);
    const [errors, setErrors] = useState({}); 
    const { data, isLoading, isSuccess } = useGetProductsQuery(params);

    useEffect(() => {
        if (!id) return;

        setValues(defaultValues);
        setItems([]);
        setEnd(false);
        setErrors({}); 

        const filteredDefault = Object.fromEntries(
            Object.entries({
                categoryId: id,
                limit: 5,
                offset: 0,
                ...defaultValues,
            }).filter(([_, v]) => v !== undefined)
        );
        setParams(filteredDefault);
    }, [id]);

    useEffect(() => {
        if (!id || !list || !list.length) return;
        const category = list.find((item) => item.id === id * 1);
        setCat(category);
    }, [id, list]);

    useEffect(() => {
        if (isLoading || !data) return;

        if (!data.length) return setEnd(true);

        setItems((_items) => [..._items, ...data]);
    }, [data, isLoading]);

    const handleChange = ({ target: { value, name } }) => {
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const min = values.price_min ? parseFloat(values.price_min) : null;
        const max = values.price_max ? parseFloat(values.price_max) : null;
        const newErrors = {};

        if (min !== null && isNaN(min)) newErrors.price_min = "Input the correct number";
        if (max !== null && isNaN(max)) newErrors.price_max = "Input the correct number";
        if (min !== null && max !== null && min > max) newErrors.price_max = "The max. price must be more than the min.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        }

        const defaultParams = {
            categoryId: id,
            limit: 5,
            offset: 0,
            ...defaultValues,
        };
   
        const rawParams = {
            ...defaultParams, 
            title: values.title.trim() || undefined,
            price_min: min !== null ? min : undefined,
            price_max: max !== null ? max : undefined,
        };

        const filteredParams = Object.fromEntries(
            Object.entries(rawParams).filter(([_, v]) => v !== undefined)
        );

        setItems([]);
        setEnd(false);
        setParams(filteredParams);
    };

    const handleReset = () => {
        setValues(defaultValues);

        const defaultParams = {
            categoryId: id,
            limit: 5,
            offset: 0,
            ...defaultValues,
        };
        
        const filteredDefault = Object.fromEntries(
            Object.entries(defaultParams).filter(([_, v]) => v !== undefined)
        );
        setParams(filteredDefault);
        setItems([]);
        setEnd(false);
        setErrors({});
    };

    const filteredItems = useMemo(() => {
        let filtered = items;

        if (values.title.trim()) {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(values.title.toLowerCase())
            );
        }

        const min = values.price_min ? parseFloat(values.price_min) : null;
        const max = values.price_max ? parseFloat(values.price_max) : null;

        if (min !== null) {
            filtered = filtered.filter(item => item.price >= min);
        }
        if (max !== null) {
            filtered = filtered.filter(item => item.price <= max);
        }

        return filtered;
    }, [items, values]);

    
    const renderProductsSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
            {Array.from({ length: 5 }).map((_, i) => ( 
                <div key={i} className="flex flex-col w-full aspect-square bg-white rounded-lg shadow-md p-4">
                    Image
                    <div className="bg-gray-300 animate-pulse h-48 w-full rounded mb-4"></div>
                    Title
                    <div className="bg-gray-300 animate-pulse h-6 rounded mb-2"></div>
                    Price
                    <div className="bg-gray-300 animate-pulse h-5 w-1/3 rounded mb-4"></div>
                    Buttons
                    <div className="flex justify-between">
                        <div className="bg-gray-300 animate-pulse h-10 w-2/5 rounded"></div>
                        <div className="bg-gray-300 animate-pulse h-10 w-2/5 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section className='col-span-4 flex flex-col flex-wrap items-center bg-main-color rounded mb-4 pb-3'>          
            <h2 className='text-3xl font-semibold text-white custom-shadow my-5'>
                {categoriesLoading ? (
                    <div className="bg-gray-300 animate-pulse h-8 w-48 rounded inline-block"></div>
                ) : cat?.name ? cat.name : (
                    <span>No category found</span>
                )}
            </h2>

            <form className='flex flex-wrap justify-around gap-4 items-center' onSubmit={handleSubmit}>
                <div className="filter">
                    <label className='text-xl text-white font-semibold'>Enter the product name</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Product name"
                        value={values.title}
                        className='w-full p-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                </div>
                <div className="filter">
                    <label className='text-xl text-white font-semibold'>Price from</label>
                    <input
                        type="number"
                        name="price_min"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_min}
                        className='w-full p-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                    {errors.price_min && <p className="text-red-500 text-sm">{errors.price_min}</p>}
                </div>
                <div className="filter">
                    <label className='text-xl text-white font-semibold'>Price to</label>
                    <input
                        type="number"
                        name="price_max"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_max}
                        className='w-full p-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    />
                    {errors.price_max && <p className="text-red-500 text-sm">{errors.price_max}</p>}
                </div>
                <button type="submit" className="hidden" /> 
            </form>
            {isLoading ? (
                renderProductsSkeleton() 
            ) : !isSuccess || filteredItems.length === 0 ? (  
                <div className="flex flex-col">
                    <span className='text-3xl font-semibold text-white custom-shadow my-5'>No results</span>
                    <button
                        className="text-xl text-white font-semibold custom-border custom-shadow bg-main-color rounded cursor-pointer duration-500 hover:scale-110 hover:bg-white hover:text-black p-2 mb-5"
                        onClick={handleReset} 
                    >
                        Reset
                    </button>
                </div>
            ) : (
                <Products
                    title=""
                    products={filteredItems}  
                    amount={filteredItems.length}  
                />
            )}

            {!isEnd && (
                <div className="more">
                    <button
                        className="text-xl font-semibold custom-border custom-shadow custom-btn"
                        onClick={() =>
                            setParams({ ...params, offset: params.offset + params.limit })
                        }
                    >
                        See more
                    </button>
                </div>
            )}
        </section>
    );
};

export default Category;

