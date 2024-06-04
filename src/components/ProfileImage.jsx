import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Profile from "../Video/randomRendering.png";

const ProfileImage = () => {

    const host = "http://localhost:4000"
    const location = useLocation()
    const [source, setSource] = useState(Profile)

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`${host}/api/students/getStudent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json()

            if (json.image) {
                setSource(`${host}/uploads/${json.image}`);
            }

        }
        if (!localStorage.getItem('adminToken')) {
            fetchData()
        }
    }, [])

    return (
        <>
            {
                location.pathname === '/student' ?
                    <img className='bodyProfileImage' src={source} alt="Profile" style={{}} />
                    :
                    <img className='navBarProfileImage' src={source} alt="Profile" style={{}} />

            }
        </>

    )
}

export default ProfileImage