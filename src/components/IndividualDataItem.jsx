import React from 'react';

const IndividualDataItem = (props) => {

    const { data, updateData } = props


    return (
        <div className=' col-md-12' >
            <div className="card my-3" style={{ "boxShadow": "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px", backgroundColor: 'rgb(239 249 155)', fontFamily: 'unset', fontSize: '1.2rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text"><b><i>Registration No : </i></b>{data.registrationNo}</p>
                    <p className="card-text"><b><i>Semester : </i></b>{data.semester}</p>
                    <p className="card-text"><b><i>Section : </i></b>{data.section}</p>
                    {/* {data.skill.length !== 0 && data.skill.map((skill, index) => {
                        <p className="card-text"><b>Skills : </b>{skill} </p>
                    })} */}
                    {/* <span className="dropdown-toggle" onClick={toggleDropdown}>
                        <p className="card-text"><b>Skills :</b> {isOpen ? '▲' : '▼'}</p>
                    </span> */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                        <div ><b><i>Skills :  </i></b> </div>
                        <div className="dropdown " style={{ marginLeft: '1rem' }}>
                            <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* {data.skills[0]} */}
                                {data.skills.length !== 0 && data.skills[0].charAt(0).toUpperCase() + data.skills[0].slice(1)}

                            </button>
                            <ul className="dropdown-menu " style={{ height: '80px', overflowY: 'scroll', backgroundColor: 'rgb(61 213 243)' }}>
                                {data.skills.map((skill, index) => (
                                    <li className='dropdown-item' style={{ borderBottom: '1px solid black', borderStyle: 'dotted' }} key={index}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <p className="card-text"><b><i>CGPA : </i></b>{data.cgpa}</p>
                    <p className="card-text"><b><i>Placement : </i></b>{data.placement}</p>

                    <i className="fa-regular fa-pen-to-square fa-lg " onClick={() => { updateData(data) }} ></i>
                </div>
            </div>
        </div >
    )
}



export default IndividualDataItem