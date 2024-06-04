

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionContext from "../context/questions/questionContext";
import AddQuestion from './AddQuestion';
import QuestionItem from './QuestionItem';

const Questions = ({ quizStarted, setQuizStarted }) => {
    const context = useContext(QuestionContext);
    const { questions, editQuestion, getQuestions } = context;
    const navigate = useNavigate();
    const ref = useRef(null);
    const refClose = useRef(null);
    // const [addQuestionComponent, setAddQuestionComponent] = useState(false)

    // const [addQuestionComponentButton, setAddQuestionComponentButton] = useState(true)

    const [question, setQuestion] = useState({ id: '', equestion: '', eoptions: ['', '', '', ''], ecorrectAnswerIndex: 0, eanswer: '' });

    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            getQuestions();
        } else {
            navigate('/');
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const updateQuestion = (currentQuestion) => {
        ref.current.click();
        setQuestion({
            id: currentQuestion._id,
            equestion: currentQuestion.question,
            eoptions: currentQuestion.options,
            ecorrectAnswerIndex: currentQuestion.correctAnswerIndex,
            eanswer: currentQuestion.answer
            // etimelimit: currentQuestion.timelimit,
        });
    };


    const handleClick = async () => {
        refClose.current.click();
        // console.log(questions);
        // console.log("indexx", question.ecorrectAnswerIndex);
        await editQuestion(question.id, question.equestion, question.eoptions, question.ecorrectAnswerIndex, question.eanswer);
        getQuestions();
    };

    const onChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const onOptionChange = (index, value) => {
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        const newOptions = [...question.eoptions];
        // console.log(newOptions);
        newOptions[index] = capitalizedValue;
        // console.log(newOptions);
        setQuestion({ ...question, eoptions: newOptions });
        // console.log(question);
    };

    const addOption = () => {
        const newOptions = [...question.eoptions, ''];

        setQuestion({ ...question, eoptions: newOptions });

    };
    // useEffect(() => {
    //     console.log(question);
    // }, [question])

    const removeOption = (index) => {
        const newOptions = question.eoptions.filter((_, i) => i !== index);
        setQuestion({ ...question, eoptions: newOptions });
    };

    // const setAddingQuestionComponent = () => {
    //     setAddQuestionComponent(true)
    //     setAddQuestionComponentButton(false)
    // }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Question</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="equestion" className="form-label">Question</label>
                                    <input type="text" className="form-control" minLength={5} required id="equestion" name='equestion' value={question.equestion} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Options</label>
                                    {question.eoptions.map((option, index) => (
                                        <div className="input-group mb-3" key={index}>
                                            <input type="text" className="form-control" minLength={5} required value={option} onChange={(e) => onOptionChange(index, e.target.value)} />
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => removeOption(index)}>-</button>
                                        </div>
                                    ))}
                                    <button className="btn btn-outline-primary" type="button" onClick={addOption}>Add Option</button>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ecorrectAnswerIndex" className="form-label">Correct Answer Index</label>
                                    <select className="form-select" value={question.ecorrectAnswerIndex} onChange={(e) => setQuestion({ ...question, ecorrectAnswerIndex: parseInt(e.target.value) })}>
                                        {question.eoptions.map((_, index) => (

                                            <option key={index} value={index}>{`Option ${index + 1}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eanswer" className="form-label">Answer</label>
                                    <input type="text" className="form-control" minLength={5} required id="eanswer" name='eanswer' value={question.eanswer} autoComplete='off' onChange={onChange} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="etimelimit" className="form-label">Time Limit</label>
                                    <input type="number" className="form-control" required id="etimelimit" name='etimelimit' value={question.etimelimit} autoComplete='off' onChange={onChange} />
                                </div> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Question</button>
                        </div>
                    </div>
                </div>
            </div>


            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Questions</h2>
            <div style={{ height: '42vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: '10px' }}>
                <div className="container">
                    {questions.length === 0 && 'No questions to display '}
                </div>
                {questions.map((question, index) => {
                    return <QuestionItem questionn={question} key={index} updateQuestion={updateQuestion} />;
                })}
            </div>
            {/* {addQuestionComponentButton && <button className="btn btn-primary d-block mx-auto mb-1" onClick={setAddingQuestionComponent}>Add Question</button>} */}
            {/* {addQuestionComponent && <AddQuestion />} */}
            {quizStarted && <AddQuestion />}

        </div>
    );
};

export default Questions;
