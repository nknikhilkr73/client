import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/datas/dataContext'
import DataItem from './DataItem'


const Data = (props) => {



    const context = useContext(DataContext)

    const { getAllStudentsData, allData } = context

    // const navigate = useNavigate()

    const [filterSkill, setFilterSkill] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredPlacement, setFilteredPlacement] = useState('')

    // const location = useLocation()

    useEffect(() => {

        getAllStudentsData()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        if (filterSkill.trim() !== '') {
            // Filter students based on the entered skill
            const filteredStudents = allData.filter(student =>
                student.skills.includes(filterSkill.trim().toLowerCase())
            );

            setFilteredData(filteredStudents);
        }


        if (filteredPlacement.trim() !== '') {

            const capitalizedPlacement = filteredPlacement.trim().charAt(0).toUpperCase() + filteredPlacement.trim().slice(1)
            const filteredPlacementStudent = allData.filter(student => (
                student.placement === capitalizedPlacement
            ))
            setFilteredData(filteredPlacementStudent)
        }

        if (filteredPlacement.trim() === '' && filterSkill.trim() === '') {
            setFilteredData(allData)
        }

    }, [filterSkill, filteredPlacement, allData]);


    const handleFilterChange = event => {
        setFilterSkill(event.target.value);

    };
    const handlePlacementFilter = event => {
        setFilteredPlacement(event.target.value)
    }

    return (
        <div style={{ marginTop: '7rem' }}>

            <div className="row my-3">
                <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif', fontWeight: '' }}>Students Data</h1>
                <div className="container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter skill to filter"
                        value={filterSkill}
                        onChange={handleFilterChange}
                    />
                    <br />


                    <select
                        className='form-control'
                        value={filteredPlacement}
                        onChange={handlePlacementFilter}
                    >
                        <option value=''>Select Placement</option>
                        <option value='placed'>Placed</option>
                        <option value='unplaced'>Unplaced</option>
                    </select>

                    {/* {allData.length === 0 && 'No Data to display '} */}
                    {filteredData.length === 0 && 'No Data to display'}
                </div>
                {filteredData.map((data, index) => {
                    return <DataItem data={data} key={index} />
                })}

            </div>

        </div>
    )
}

export default Data