import React, { useContext } from 'react'
import QuestionContext from '../context/questions/questionContext'

const QuestionItem = (props) => {

    const context = useContext(QuestionContext)
    const { deleteQuestion } = context
    const { _id, question, options, correctAnswerIndex } = props.questionn
    const { updateQuestion, questionn } = props

    return (
        <div className=' col-md-4' style={{ width: '95%' }}>
            <div className="card my-3" style={{ "boxShadow": "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                <div className="card-body">
                    <h5 className="card-title"><b>Question :  </b>{question}</h5>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                        <p ><b>Options :  </b> </p>
                        <div className="dropdown " style={{ marginLeft: '1rem' }}>
                            <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* {data.skills[0]} */}
                                {options.length !== 0 && options[0].charAt(0).toUpperCase() + options[0].slice(1)}

                            </button>

                            <ul className="dropdown-menu " style={{ height: '80px', width: '10px', overflowY: 'scroll', backgroundColor: 'rgb(61 213 243)' }}>
                                {options.map((option, index) => (
                                    <li className='dropdown-item' style={{ borderBottom: '1px solid black', borderStyle: 'dotted' }} key={index}>{option.charAt(0).toUpperCase() + option.slice(1)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* <h5 className="card-title">{options}</h5> */}
                    <p className="card-title"><b>Answer Index :  </b> {correctAnswerIndex}</p>
                    <p className="card-text"><b>Answer  :  </b>{options[correctAnswerIndex]}</p>
                    {/* <p className="card-text"><b>Time Limit :  </b>{timelimit} mins</p> */}
                    <i className="fa-regular fa-trash-can fa-lg mx-2" onClick={() => { deleteQuestion(_id) }}></i>

                    <i className="fa-regular fa-pen-to-square fa-lg mx-2" onClick={() => { updateQuestion(questionn) }}></i>
                </div>
            </div>
        </div >

    )
}

export default QuestionItem