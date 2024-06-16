import axios from 'axios';
import React, { useContext, useState } from 'react';
import QuestionContext from "../context/questions/questionContext";


const AddQuestion = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    // const [timelimit, setTimelimit] = useState(0)

    const context = useContext(QuestionContext);
    const { getQuestions } = context;

    const addQuestion = async (e) => {
        e.preventDefault()
        try {

            const host = "https://profileforgeserver.onrender.com"

            // const host = "http://localhost:4000"


            // console.log(timelimit);
            await axios.post(`${host}/question/addQuestion`, {
                question,
                options,
                // timelimit,
                correctAnswerIndex
            });
            // console.log('Question added:', response.data);
            // Reset form
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswerIndex(0);
            // setTimelimit(0)
            getQuestions()
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    // const handleTimeLimitChange = (e) => {
    //     const value = e.target.value.trim(); // Remove leading and trailing spaces
    //     const parsedValue = value === '' ? 0 : parseInt(value); // Set to 0 if empty, otherwise parse
    //     setTimelimit(parsedValue);
    // };

    // useEffect(() => {
    //     console.log(timelimit);
    // }, [timelimit])

    return (
        <div className='container my-3 py-2'>
            <h2 style={{ textAlign: 'center' }}>Add Question</h2>

            <form className='my-3 py-2' >
                <div className="mb-3">
                    <label style={{ 'fontStyle': 'italic' }}> <b>Question : </b></label>
                    <input className="form-control" style={{ border: '1px solid black' }} type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter question" />
                </div>

                <div className="mb-3">
                    <label><b> Options :  </b></label>
                    {options.map((option, index) => (
                        <input className="form-control" style={{ border: '1px solid black' }} key={index} type="text" value={option} onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }} placeholder={`Option ${index + 1}`} />
                    ))}
                </div>
                <div className="mb-3">
                    <label><b> Correct Option : </b></label>
                    <select className="form-control" value={correctAnswerIndex} onChange={(e) => setCorrectAnswerIndex(e.target.value)}>
                        {options.map((_, index) => (
                            <option key={index} value={index}>{`Option ${index + 1}`}</option>
                        ))}
                    </select>
                </div>

                {/* <div className="mb-3">
                    <label><b> Time Limit : </b></label>
                    <input className="form-control" placeholder='Time limit' value={timelimit === 0 ? '' : timelimit} onChange={handleTimeLimitChange} />
                </div> */}
                <button className="btn btn-primary d-block mx-auto mb-1" onClick={addQuestion}>Add Question</button>
            </form>
        </div>

    );
};

export default AddQuestion;
