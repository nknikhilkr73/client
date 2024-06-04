import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', image: null })

    const [admin, setAdmin] = useState(false)

    const [student, setStudent] = useState(false)

    const [truth, setTruth] = useState(true)

    const [file, setFile] = useState()

    const navigate = useNavigate()
    const host = "https://profileforgeserver.onrender.com"

    const handleSubmit = async (e) => {

        e.preventDefault()


        if (!file) {
            toast.error("Please select an image.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error("Size limit exceeded.");
            return;
        }

        if (credentials.name.length < 5) {
            toast.error("Name must be at least 5 characters long.");
            return;
        }

        if (credentials.password.length < 5) {
            toast.error("Password must be at least 5 characters long.");
            return;
        }

        const formData = new FormData();
        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        formData.append('image', credentials.image);



        const response = await fetch(`${host}/api/students/createstudent`, {
            method: "POST",
            body: formData

        });
        const json = await response.json()


        if (json.token) {

            //save the auth token and redirect
            localStorage.setItem('token', json.token)
            // props.showAlert("Logged in  Successfully ", "success")

            navigate('/')


        }
        else {
            console.log("error");
            // props.showAlert("Invalid Credentials", 'danger')
        }
    }

    const onChange = (e) => {
        if (e.target.name === 'image') {

            // setCredentials({ ...credentials, [e.target.name]: e.target.files[0] });

            const selectedFile = e.target.files[0];

            setFile(selectedFile)

            setCredentials(prevCredentials => ({
                ...prevCredentials,
                image: selectedFile
            }));


        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }

    }

    const handleStudentClick = () => {
        setStudent(true)
        setAdmin(false)
        setTruth(false)
    }
    const handleAdminClick = () => {
        setAdmin(true)
        setStudent(false)
        setTruth(false)
    }
    const handleAdminSubmit = async (e) => {
        e.preventDefault()
        console.log("Admin clicked");

        const response = await fetch(`${host}/api/admin/createAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()

        if (json.token) {
            toast.success("Logged in Successfully");
            //save the auth token and redirect
            localStorage.setItem('adminToken', json.token)
            // props.showAlert("Logged in  Successfully ", "success")

            setTimeout(() => {
                navigate('/');
            }, 1000);


        }
        else {
            toast.error("Some error has occurred , please try again");
            // props.showAlert("Invalid Credentials", 'danger')
        }
    }

    return (
        <div className='container ' style={{ marginTop: '7rem' }}>
            <ToastContainer position="top-right" style={{ marginTop: '5rem' }} /> {/* Adjust position and style */}

            <h1 style={{ textAlign: 'center', marginTop: '4rem' }}> Create an account </h1>
            <br />
            {truth && <div className="d-flex justify-content-center"> <button className="btn btn-warning mx-3" onClick={handleStudentClick}>SignUp as Student</button>
                <button className="btn btn-warning" onClick={handleAdminClick}>SignUp as Administration</button>  </div>}

            {student && <div className="d-flex justify-content-center">  <form className='my-3 w-60' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="name" className="form-label">Name</label>
                    <input style={{ borderColor: 'black' }} minLength={5} required type="text" className="form-control" id="name" name='name' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="email" className="form-label">Email</label>
                    <input style={{ borderColor: 'black' }} minLength={5} required type="email" className="form-control" id="email" name='email' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} className="form-label">Password</label>
                    <input style={{ borderColor: 'black' }} minLength={5} required type="password" className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="image" className="form-label">Image</label>
                    <input style={{ borderColor: 'black' }} type="file" accept='image/*' className="form-control" id="image" name='image' autoComplete='off' onChange={onChange} />
                </div>


                <button type="submit" className="btn btn-warning" >SignUp</button>
            </form>
            </div>
            }

            {admin && <div className="d-flex justify-content-center"> <form className='my-3 w-75' onSubmit={handleAdminSubmit} >

                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="name" className="form-label">Name</label>
                    <input style={{ borderColor: 'black' }} minLength={5} required type="text" className="form-control" id="name" name='name' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="email" className="form-label">Email</label>
                    <input style={{ borderColor: 'black' }} minLength={5} required type="email" className="form-control" id="email" name='email' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} className="form-label">Password</label>
                    <input style={{ borderColor: 'black' }} minLength={5} required type="password" className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-warning" >SignUp</button>
            </form>
            </div>
            }


        </div>
    )
}

export default Signup