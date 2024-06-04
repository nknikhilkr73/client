import React, { useContext, useState } from 'react';
import DataContext from '../context/datas/dataContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddData = () => {

    const context = useContext(DataContext)

    const { data, addData, getAllData } = context

    const [newData, setNewData] = useState ({ registrationNo: "", semester: "", section: "", skills: '', cgpa: '', placement: 'Unplaced' })

    const handleClick = async (e) => {
        e.preventDefault();
        // await addData(newData.registrationNo, newData.semester, newData.section, newData.cgpa, newData.placement, newData.skills)
        await addData(newData.registrationNo, newData.semester, newData.section, newData.skills, newData.cgpa, newData.placement)

        setNewData({ registrationNo: "", semester: "", section: "", skills: "", cgpa: '', placement: '' })
        toast.success("Added Your data successfully.");
        getAllData()
    }
 
    const onChange = (e) => {

        const { name, value } = e.target;

        if (name === 'registrationNo') {
            // Check if the value contains non-numeric characters
            if (value && !/^\d+$/.test(value)) {
                toast.error("Please enter only numbers for Registration No.");
                return;
            }
        } else if (name === 'section') {
            // Check if the value contains non-alphabetical characters
            if (value && !/^[a-zA-Z]+$/.test(value)) {
                toast.error("Please enter only alphabetic characters for Section.");
                return;
            }
        }

        // If the input name is 'skills', split the entered skills by commas
        // and trim whitespace from each skill, then convert to lowercase
        const newValue = name === 'skills' ? value.split(',').map(skill => skill.trim().toLowerCase()) : value;
        // setNewData({ ...newData, [e.target.name]: e.target.value })

        setNewData({ ...newData, [name]: newValue });
    }
    return (  
        <div>
            <ToastContainer position="top-right" style={{ marginTop: '5rem' }} /> {/* Adjust position and style */}
            <div className='container ' style={{ marginTop: '7rem' }}>
                <h2>Fill Your Data</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="registrationNo" className="form-label">Registration No</label>
                        <input minLength={10} required type="text" className="form-control" id="registrationNo" name='registrationNo' value={newData.registrationNo} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="section" className="form-label">Section</label>
                        <input type="text" className="form-control" id="section" value={newData.section} name='section' autoComplete='off' onChange={onChange} />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="semester" className="form-label">Semester</label>
                        <select className="form-select" id="semester" value={newData.semester} name='semester' autoComplete='off' onChange={onChange}>
                            {[...Array(8)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="skills" className="form-label">Skills</label>
                        <input type="text" className="form-control" id="skills" value={newData.skills} name='skills' autoComplete='off' onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cgpa" className="form-label">CGPA</label>
                        <select className="form-select" id="cgpa" value={newData.cgpa} name='cgpa' autoComplete='off' onChange={onChange}>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="placement" className="form-label">Placement</label>
                        <select className="form-select" id="placement" value={newData.placement} name='placement' autoComplete='off' onChange={onChange}>
                            <option value="Placed">Placed</option>
                            <option value="Unplaced">Unplaced</option>
                        </select>
                    </div>


                    <button disabled={data.length !== 0 || newData.registrationNo.length < 10 || newData.semester.length < 1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Data</button>
                </form>
            </div>
        </div>
    )
}

export default AddData