import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const [admin, setAdmin] = useState(false)

    const [student, setStudent] = useState(false)

    const [truth, setTruth] = useState(true)

    const navigate = useNavigate()
    const host = "https://profileforgeserver.onrender.com"

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${host}/api/students/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        // console.log(json);

        if (json.token) {
            toast.success("Logged in Successfully");
            //save the auth token and redirect
            localStorage.setItem('token', json.token)
            // props.showAlert("Logged in  Successfully ", "success")

            setTimeout(() => {
                navigate('/');
            }, 1000);


        }
        else {
            toast.error("Invalid Credentials");
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
        const response = await fetch(`${host}/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        // console.log(json);

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
            toast.error("Invalid Credentials of admin");
            // props.showAlert("Invalid Credentials", 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container ' style={{ marginTop: '8rem' }}>
            <h2 style={{ textAlign: 'center', marginTop: '4rem' }}>Login to continue </h2>
            <ToastContainer position="top-right" style={{ marginTop: '5rem' }} /> {/* Adjust position and style */}
            <br />
            {truth && <div className="d-flex justify-content-center"> <button className="btn btn-warning mx-3" onClick={handleStudentClick}>Login as Student</button>
                <button className="btn btn-warning" onClick={handleAdminClick}>Login as Administration</button>  </div>}


            {student && <div className="d-flex justify-content-center"> <form className='my-3 w-75' onSubmit={handleSubmit} >

                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="email" className="form-label">Email</label>
                    <input style={{ borderColor: 'black' }} type="email" value={credentials.email} className="form-control" id="email" name='email' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="password" className="form-label">Password</label>
                    <input style={{ borderColor: 'black' }} type="password" value={credentials.password} className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-warning" >Login</button>
            </form>
            </div>
            }

            {admin && <div className="d-flex justify-content-center"> <form className='my-3 w-75' onSubmit={handleAdminSubmit} >

                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="email" className="form-label">Email Admin</label>
                    <input style={{ borderColor: 'black' }} type="email" value={credentials.email} className="form-control" id="email" name='email' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', fontStyle: 'italic' }} htmlFor="password" className="form-label">Password Admin</label>
                    <input style={{ borderColor: 'black' }} type="password" value={credentials.password} className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-warning" >Login</button>
            </form>
            </div>
            }

        </div>
    )
}

export default Login