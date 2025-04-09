import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove/', { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    //product remove confirmation
    const confirmRemoveProduct = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={async () => {
                                await removeProduct(id);
                                closeToast();
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Yes
                        </button>
                        <button
                            onClick={closeToast}
                            className="bg-gray-300 text-black px-3 py-1 rounded"
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
            }
        );
    };

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* -----------list table title ----------- */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* -----------list product data ----------- */}

                {
                    list.map((item, index) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 gap-2 border border-gray-300 text-sm' key={index}>
                            <img className='w-12' src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p onClick={() => confirmRemoveProduct(item._id)}
                            className='text-right md:text-center cursor-pointer text-lg'>X</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List