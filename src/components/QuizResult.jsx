
import React, { useEffect, useState } from 'react';
const QuizResult = () => {
    const host = "http://localhost:4000"

    const [allMarks, setAllMarks] = useState([])

    useEffect(() => {
        const fetchMarks = async () => {

            const response = await fetch(`${host}/api/students/allmarks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                }
            })

            const data = await response.json()

            setAllMarks(data)

        }
        fetchMarks()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Results</h2>
            <div style={{ height: '42vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: '10px', marginBottom: '1rem' }}>

                <div className=' col-md-4' style={{ width: '95%' }}>

                    {allMarks.map((student, index) => (
                        <div key={index} className="card my-3" style={{ "boxShadow": "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                            <div className="card-body">
                                <div className="card-title"><b>Student Name :</b>  <b>{student.name}</b> </div>


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
                                                {student.marks.map((mark, i) => (
                                                    <tr style={{ textAlign: 'center' }} key={i}>
                                                        <td style={{ paddingRight: '10px', border: '1px solid black' }}>{formatDate(mark.date)}</td>
                                                        <td style={{ border: '1px solid black' }}>{mark.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div style={{ marginTop: '1rem' }}>       </div>
        </div>
    )

}

export default QuizResult