import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const MyProfile = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/user/profile', {headers: { token }});
            console.log(backendUrl);
            console.log(token);

            if (res.data.success) {
                setUserData(res.data.data);
            }
        } catch (err) {
            console.error('Failed to load user profile', err);
        }
    };

    useEffect(() => {
        getUserData();
    }, [token]);

    if (!userData) return <p>Loading profile...</p>;

    return (
        <div className='border-t pt-14'>
            <h2 className='text-2xl font-medium mb-6'>My Profile</h2>
            <div className='flex flex-col gap-4 text-gray-700'>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                {/* Add more fields if your API returns more */}
            </div>
        </div>
    );
};

export default MyProfile;