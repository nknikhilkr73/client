import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const Navbar = () => {
    const isAdmin = localStorage.getItem('adminToken')

    const isStudent = localStorage.getItem('token')

    const navigate = useNavigate()
    const handleLogout = () => {

        if (isStudent) {
            localStorage.removeItem('token')
        }
        if (isAdmin) {
            localStorage.removeItem('adminToken')
        }
        navigate('/login')
    }
    const location = useLocation()



    return (
        <>
            <nav className="navbar fixed-top bg-dark navbar-expand-lg  border-bottom border-body " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><i style={{ fontSize: '2rem' }}>Forge</i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} `} aria-current="page" to="/">Home</Link>
                            </li>

                            {localStorage.getItem('token') ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/student' ? 'active' : ''} `} aria-current="page" to="/student">You</Link>
                            </li> : ''}
                            {localStorage.getItem('adminToken') ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''} `} aria-current="page" to="/admin">You</Link>
                            </li> : ''}

                            {localStorage.getItem('adminToken') ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/details' ? 'active' : ''} `} to="/details">AllStudents</Link>
                            </li> : ''}
                            {localStorage.getItem('token') ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/todo' ? 'active' : ''} `} to="/todo">TodoList</Link>
                            </li> : ''}
                            {localStorage.getItem('token') ? <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''} `} to="/quiz">Quiz</Link>
                            </li> : ''}

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''} `} to="/about">About</Link>
                            </li>

                        </ul>

                        {localStorage.getItem('token') || localStorage.getItem('adminToken') ? <>{location.pathname === '/student' ? '' : <ProfileImage />}  <button onClick={handleLogout} className='btn btn-outline-light'>Logout</button></>
                            :
                            <form className='d-flex align-items-center '>
                                <Link className='btn btn-outline-light mx-2 btn-sm' to='/login' role='button'>Login</Link>
                                <Link className='btn btn-outline-light mx-1 btn-sm' to='/signup' role='button'>SignUp</Link>
                            </form>
                        }

                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light me-2" type="submit">Login</button>
                            <button className="btn btn-outline-light" type="submit">SignUp</button>
                            <Link className='btn btn-outline-light mx-2 btn-sm' to='/login' role='button'>Login</Link>
                            <Link className='btn btn-outline-light mx-1 btn-sm' to='/signup' role='button'>SignUp</Link>
                        </form> */}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar



