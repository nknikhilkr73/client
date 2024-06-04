import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QuizQuestions = ({ onSubmit }) => {

    const host = "http://localhost:4000"

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${host}/question/allQuestions`);
                setQuestions(response.data);
                setSelectedAnswers(new Array(response.data.length).fill(null));

            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleAnswerChange = (questionIndex, optionIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = optionIndex;
        setSelectedAnswers(newSelectedAnswers);
    };
    useEffect(() => {
        console.log(selectedAnswers);
    }, [selectedAnswers])

    const handleSubmit = () => {
        onSubmit(selectedAnswers);
    };

    return (
        <div className='container my-3 py-2'>
            <h2 style={{ textAlign: 'center' }}>Quiz Questions</h2>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>{index + 1} : {question.question}</h3>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            {/* <input type="radio" name={`question-${index}`} value={optionIndex} /> */}
                            <input type="radio" name={`question-${index}`} value={optionIndex} checked={selectedAnswers[index] === optionIndex} onChange={() => handleAnswerChange(index, optionIndex)} />

                            <label>{option}</label>
                        </div>
                    ))}
                </div>
            ))}
            <button className="btn btn-primary d-block mx-auto mb-1" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default QuizQuestions;
