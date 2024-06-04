import React from 'react';

const DataItem = (props) => {
    const { data } = props

    return (
        <div className=' col-md-6'>
            <div className="card my-3" style={{ "boxShadow": "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px", backgroundColor: 'rgb(239 249 155)' }}>
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text"><b>Registration No : </b>{data.registrationNo}</p>
                    <p className="card-text"><b>Semester : </b>{data.semester}</p>
                    <p className="card-text"><b>Section : </b>{data.section}</p>
                    {/* {data.skill.length !== 0 && data.skill.map((skill, index) => {
                        <p className="card-text"><b>Skills : </b>{skill} </p>
                    })} */}
                    {/* <p className="card-text"><b>Skills : </b>{data.skills.join(' , ')}</p> */}

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                        <div ><b>Skills :  </b> </div>
                        <div class="dropdown " style={{ marginLeft: '1rem' }}>
                            <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* {data.skills[0]} */}
                                {data.skills.length !== 0 && data.skills[0].charAt(0).toUpperCase() + data.skills[0].slice(1)}

                            </button>
                            <ul class="dropdown-menu " style={{ height: '80px', width: '10px', overflowY: 'scroll', backgroundColor: 'rgb(61 213 243)' }}>
                                {data.skills.map((skill, index) => (
                                    <li className='dropdown-item' style={{ borderBottom: '1px solid black', borderStyle: 'dotted' }} key={index}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</li>
                                ))}
                            </ul>
                        </div>

                    </div>


                    <p className="card-text"><b>CGPA : </b>{data.cgpa}</p>
                    <p className="card-text"><b>Placement : </b>{data.placement}</p>

                </div>
            </div>
        </div >
    )
}

export default DataItem