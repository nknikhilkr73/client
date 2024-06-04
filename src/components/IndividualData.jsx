import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DataContext from '../context/datas/dataContext'
import AddData from './AddData'
import IndividualDataItem from './IndividualDataItem'
import ProfileImage from './ProfileImage'

const IndividualData = (props) => {
    const host = "https://profileforgeserver.onrender.com"
    const context = useContext(DataContext)

    const { data, getAllData, editData } = context
    // const [updatedData, setUpdatedData] = useState({ id: '', eregistrationNo: '', esemester: '', esection: '' })
    const [updatedData, setUpdatedData] = useState({ id: '', eregistrationNo: '', esemester: '', esection: '', eskills: '', ecgpa: '', eplacement: '' });

    const navigate = useNavigate()
    const ref = useRef(null)
    const refClose = useRef(null)

    const [name, setName] = useState('')




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
            // console.log(json);

            if (json.name) {
                setName(json.name)
            }

        }

        if (localStorage.getItem('token')) {

            getAllData();
        }
        else {
            navigate('/')
        }
        fetchData()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = async () => {
        refClose.current.click()

        await editData(updatedData.id, updatedData.eregistrationNo, updatedData.esemester, updatedData.esection, updatedData.eskills, updatedData.ecgpa, updatedData.eplacement)
        toast.success("Updated Your data successfully.");
        getAllData()
    }

    const updateData = (currentData) => {
        ref.current.click()
        setUpdatedData({ id: currentData._id, eregistrationNo: currentData.registrationNo, esemester: currentData.semester, esection: currentData.section, eskills: currentData.skills, ecgpa: currentData.cgpa, eplacement: currentData.placement })
    }

    const onChange = (e) => {


        if (e.target.name === 'eregistrationNo') {
            // Check if the value contains non-numeric characters
            if (e.target.value && !/^\d+$/.test(e.target.value)) {
                toast.error("Please enter only numbers for Registration No.");
                return;
            }
        } else if (e.target.name === 'esection') {
            // Check if the value contains non-alphabetical characters
            if (e.target.value && !/^[a-zA-Z]+$/.test(e.target.value)) {
                toast.error("Please enter only alphabetic characters for Section.");
                return;
            }
        }

        // setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })
        if (e.target.name === 'eskills') {
            // Split the entered skills by commas and trim whitespace from each skill
            const skillsArray = e.target.value.split(',').map(skill => skill.trim().toLowerCase());
            setUpdatedData({ ...updatedData, [e.target.name]: skillsArray });
        } else {
            setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
        }

    }

    return (
        <>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Data</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="eregistrationNo" className="form-label">Registration No</label>
                                    <input type="text" className="form-control" minLength={10} required id="eregistrationNo" name='eregistrationNo' value={updatedData.eregistrationNo} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="esemester" className="form-label">Semester</label>
                                    {/* <input type="text" className="form-control" minLength={1} required id="esemester" name='esemester' value={updatedData.esemester} autoComplete='off' onChange={onChange} /> */}
                                    <select className="form-select" id="esemester" name="esemester" value={updatedData.esemester} onChange={onChange}>
                                        {[...Array(8)].map((_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="esection" className="form-label">Section</label>
                                    <input type="text" className="form-control" minLength={1} required id="esection" name='esection' value={updatedData.esection} autoComplete='off' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eskills" className="form-label">Skills</label>
                                    <input type="text" className="form-control" id="eskills" name='eskills' value={updatedData.eskills} autoComplete='off' onChange={onChange} />
                                </div>

                                <div className="mb-3" >
                                    <label htmlFor="ecgpa" className="form-label">CGPA</label>
                                    <select className="form-select" id="ecgpa" name="ecgpa" value={updatedData.ecgpa} onChange={onChange}>

                                        {[...Array(10)].map((_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="eplacement" className="form-label">Placement</label>
                                    <select className="form-select" id="eplacement" name="eplacement" value={updatedData.eplacement} onChange={onChange}>
                                        <option value="Unplaced">Unplaced</option>
                                        <option value="Placed">Placed</option>
                                    </select>
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={updatedData.eregistrationNo.length < 10 || updatedData.esemester.length < 1 || updatedData.esection.length < 1} type="button" className="btn btn-primary" onClick={handleClick}>Update Data</button>
                        </div>
                    </div>
                </div>
            </div>

            {data.length === 0 ? <AddData /> :
                <div className="row " style={{ marginTop: '5rem' }}>
                    <ToastContainer position="top-right" style={{ marginTop: '5rem' }} /> {/* Adjust position and style */}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', marginBottom: '1rem' }}>
                        <ProfileImage />
                    </div>
                    <h1 style={{ textAlign: 'center' }}>{name}</h1>
                    <h3 style={{ textAlign: 'center' }}>Your Data</h3>

                    {data.map((data, index) => {
                        return <IndividualDataItem data={data} key={index} updateData={updateData} />
                    })}

                </div>

            }



        </>
    )
}



export default IndividualData