

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IndividualMarks from './IndividualMarks';
import QuizQuestions from './QuizQuestions';

const Quiz = () => {

    const host = "https://profileforgeserver.onrender.com"

    const [quizIsLive, setQuizIsLive] = useState(false)
    const [endTime, setEndTime] = useState(null)

    const [questions, setQuestions] = useState(false)



    const [startQuizbutonClicked, setstartQuizbutonClicked] = useState(true)

    const [viewResult, setViewResult] = useState(false)

    const [viewResultButtoon, setViewResultButton] = useState(true)

    useEffect(() => {
        const fetchQuizStatus = async () => {
            try {
                const getQuizDetails = await axios.get(`${host}/quiz/quiztime`)
                console.log("hii", getQuizDetails.data[0].quizStarted, getQuizDetails.data[0].quizEndTime);
                console.log(new Date(getQuizDetails.data[0].quizEndTime).toLocaleTimeString());


                if (getQuizDetails.data[0].quizStarted === 'true') {
                    setQuizIsLive(true)
                    setEndTime(new Date(getQuizDetails.data[0].quizEndTime).toLocaleTimeString())
                }
                if (getQuizDetails.data[0].quizStarted !== 'true') {
                    setQuizIsLive(false)
                    setEndTime(null)
                }


            } catch (error) {
                console.error('Error fetching quiz status:', error);
                setQuizIsLive(false)
                setEndTime(null)
            }
        };

        fetchQuizStatus();
    }, [questions]);


    const handleSubmitAnswers = async (answers) => {
        try {
            // Fetch correct answers from the server
            const response = await axios.get(`${host}/question/allQuestions`);
            const correctAnswers = response.data.map(question => question.correctAnswerIndex);

            // Compare submitted answers with correct answers
            const marks = answers.reduce((totalMarks, submittedAnswer, index) => {
                return submittedAnswer === correctAnswers[index] ? totalMarks + 1 : totalMarks;
            }, 0);

            const date = new Date().toISOString().split('T')[0];

            const marksData = { date, value: marks }


            await axios.post(`${host}/api/students/uploadMarks`, marksData, {
                headers: {
                    'auth-token': localStorage.getItem('token') // Include the token in the request header
                }
            });

            // End the quiz
            endQuiz();
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };


    const startQuiz = async () => {
        setstartQuizbutonClicked(false)
        const startTime = new Date()

        const endtimeFromDatabase = await axios.get(`${host}/quiztimelimit/getquiztimelimit`)


        // const quizEndTime = new Date(startTime.getTime() + 10 * 1000)

        const quizEndTime = new Date(startTime.getTime() + endtimeFromDatabase.data[0].timelimit * 1000).toISOString();

        console.log(quizEndTime);

        setQuestions(true)
        console.log("Quiz started");
        setTimeout(endQuiz, endtimeFromDatabase.data[0].timelimit * 1000)
    }

    const endQuiz = async () => {


        await axios.put(`${host}/quiz/time/update`, {
            quizStarted: "false"
        })
        setQuestions(false)

        console.log("quiz ended");
    }

    const handleViewResult = () => {
        setViewResult(true); // Second function
        // scrollToResult(); // First function
        setViewResultButton(false)

    };


    const handleHideResult = () => {
        setViewResult(false)
        setViewResultButton(true)
    }

    return (
        <div className='container' style={{ marginTop: '7rem' }}>
            {quizIsLive ? (
                <>
                    <h3 style={{ textAlign: 'center' }}> Quiz is live  </h3>
                    <p style={{ textAlign: 'center' }}> End time {endTime} </p>
                    {startQuizbutonClicked && <button className='btn btn-warning d-block mx-auto mb-1' onClick={startQuiz}>Start Quiz</button>}
                    {questions && <QuizQuestions onSubmit={handleSubmitAnswers} />}
                </>
            ) : (
                <>
                    <h3 style={{ textAlign: 'center' }}>No qiz to start</h3>
                    {viewResultButtoon && <button className='btn btn-warning d-block mx-auto mb-1' onClick={handleViewResult} >View Result</button>}

                    {!viewResultButtoon && <button className='btn btn-warning d-block mx-auto mb-1' onClick={handleHideResult} >Hide Result</button>}

                    {viewResult && <IndividualMarks />}
                </>
            )}
        </div>
    );
};

export default Quiz;
