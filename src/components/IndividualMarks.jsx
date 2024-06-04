import React, { useEffect, useState } from 'react';

const IndividualMarks = () => {
    const host = "https://profileforgeserver.onrender.com"
    const [marks, setMarks] = useState([])

    useEffect(() => {
        const fetchMarks = async () => {

            const response = await fetch(`${host}/api/students/individualmarks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': localStorage.getItem('token')
                }
            })

            const data = await response.json()

            setMarks(data)

        }
        fetchMarks()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };



    return (
        <>
            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Your Results</h2>
            <div style={{ height: '50vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: '10px', marginBottom: '1rem' }}>
                <div className=' col-md-4' style={{ width: '95%' }}>  {marks.map((element, index) => (
                    <div key={index} className="card my-3" style={{ "boxShadow": "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                        {/* Render each mark element here */}

                        <div className="card-body">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                                <p><b>Marks :</b></p>
                                <div style={{ marginLeft: '1rem', maxHeight: '80px', overflowY: 'auto' }}>

                                    <table >
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Marks</th>
                                            </tr>
                                        </thead>
                                        <tbody  >
                                            <tr style={{ textAlign: 'center' }} key={index}>

                                                <td style={{ paddingRight: '10px', border: '1px solid black' }}>{formatDate(element.date)}</td>
                                                <td style={{ border: '1px solid black' }}>{element.value}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}</div>
            </div>
        </>
    )
}

export default IndividualMarks