
import { notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import QuestionState from '../context/questions/QuestionState';
import Questions from './Questions';
import QuizResult from './QuizResult';

const Admin = () => {

    const hostUrl= 'https://profileforgeserver.onrender.com'

    const [quizActive, setQuizActive] = useState(false);
    const [quizEndTime, setQuizEndTime] = useState(null);
    // const navigate = useNavigate();

    const [viewResult, setViewResult] = useState(false)

    const [viewResultButtoon, setViewResultButton] = useState(true)

    const [quizStarted, setQuizStarted] = useState(true)

    const [timeLimit, setTimeLimit] = useState(0);

    const [getTimeLimitfromserver, setGettingtimelimitfromsever] = useState(0)

    const resultRef = useRef(null);


    useEffect(() => {
        // Check if quiz has been started previously
        const isQuizStarted = localStorage.getItem('quizStarted');
        if (isQuizStarted) {
            setQuizActive(true);
            const endTime = new Date(parseInt(localStorage.getItem('quizEndTime')));
            setQuizEndTime(endTime);
        }

    }, []);

    useEffect(() => {
        const timelimitfunction = async () => {
            const response = await axios.get(`${hostUrl}/quiztimelimit/getquiztimelimit`)
            // console.log(response.data[0].timelimit);
            if(response.data[0]){
                setGettingtimelimitfromsever(response.data[0].timelimit)
              
            }
            else{

                setGettingtimelimitfromsever(0)
            }
            // setGettingtimelimitfromsever(response.data[0].timelimit)
        }

        timelimitfunction()
    })

    const startQuiz = async () => {
        try {
             await axios.post(`${hostUrl}/api/quiz/start-quiz`)
            // console.log(response.data.data.quizStarted , response.data.data.quizEndTime )
        //    await axios.post(`${hostUrl}/quiz/time/save`,{
        //         quizStarted: response.data.data.quizStarted
        //     })
            const getQuizDetails = await axios.get(`${hostUrl}/quiz/quiztime`)
            // console.log(getQuizDetails);
            // console.log("hii", getQuizDetails.data[0].quizStarted, getQuizDetails.data[0].quizEndTime);


            const endtimeFromDatabase = await axios.get(`${hostUrl}/quiztimelimit/getquiztimelimit`)
            // console.log(endtimeFromDatabase);

            if (getQuizDetails.data[0].quizStarted !== "true" || getQuizDetails.data === undefined) {
                // console.log("Not sarted");
                const startTime = new Date();
                // const endTime = new Date(startTime.getTime() + 30 * 60000).toISOString();
                const endTime = new Date(startTime.getTime() + endtimeFromDatabase.data[0].timelimit * 1000).toISOString();
                // console.log(endTime);

                await axios.put(`${hostUrl}/quiz/time/update`, {
                    quizStarted: 'true',
                    quizEndTime: endTime
                })
                setQuizActive(true);
                setQuizEndTime(endTime);

                localStorage.setItem('quizStarted', 'true');
                localStorage.setItem('quizEndTime', endTime);

                notification.success({
                    message: 'Quiz Started',
                    description: 'Email notifications sent to students.',
                });
                const timeRemaining = new Date(endTime).getTime() - startTime.getTime();
                // console.log(timeRemaining);
                setTimeout(endQuiz, timeRemaining);
                setQuizStarted(false)
            }

            else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to start the quiz. Please try again later.',
                });
            }

        } catch (error) {
            // console.error('Error starting quiz:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to start the quiz. Some error has occurred.',
            });
        }
    };

    const endQuiz = async () => {
        // Clear localStorage and reset state
        localStorage.removeItem('quizStarted');
        localStorage.removeItem('quizEndTime');
        await axios.put(`${hostUrl}/quiz/time/update`, {
            quizStarted: 'false',
            // quizEndTime: endTime
        })
        setQuizActive(false);
        setQuizEndTime(null);
        setQuizStarted(true)
    };

    const scrollToResult = () => {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });

        window.scrollTo(0, 0);

    };

    const handleViewResult = () => {
        setViewResult(true); // Second function
        scrollToResult(); // First function
        setViewResultButton(false)

    };

    const handleHideResult = () => {
        setViewResult(false)
        setViewResultButton(true)
    }

    // const handleInputChange = (e) => {
    //     const value = e.target.value; // Get the input value
    //     const numericValue = parseInt(value); // Convert input value to an integer
    //     if (!isNaN(numericValue)) {
    //         setTimeLimit(numericValue); // Update the timeLimit state with the numeric value
    //     }
    // };

    const handleTimeLimitChange = (e) => {
        const value = e.target.value.trim(); // Remove leading and trailing spaces
        const parsedValue = value === '' ? 0 : parseInt(value); // Set to 0 if empty, otherwise parse
        setTimeLimit(parsedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const response = await axios.get(`${hostUrl}/quiztimelimit/getquiztimelimit`)
        if(response.data[0]){
            await axios.put(`${hostUrl}/quiztimelimit/timelimit/update`, {
                timelimit: timeLimit
            })
            setTimeLimit(0); // Reset time limit to 0
        }

       else{
        await axios.post(`${hostUrl}/quiztimelimit/timelimit/save`, {
            timelimit: timeLimit
        })
       }

       
    };


    return (
        <div className='container' style={{ marginTop: '7rem' }}>
            <h2 style={{ textAlign: 'center' }}>Admin Panel</h2>
            {!quizActive ? (
                <>
                    <button className='btn btn-warning d-block mx-auto mb-1' onClick={startQuiz}>Start Quiz</button>
                    {viewResultButtoon && <button className='btn btn-warning d-block mx-auto mb-1' onClick={handleViewResult} >View Result</button>}
                    {!viewResultButtoon && <button className='btn btn-warning d-block mx-auto mb-1' onClick={handleHideResult} >Hide Result</button>}

                    <div className="d-flex justify-content-center">
                        <form className='my-3 py-2 d-flex' style={{ maxWidth: '300px', width: '100%' }}>
                            <div className="flex-grow-1 me-2">
                                <input
                                    style={{ border: '1px solid black', width: '100%' }}
                                    placeholder='Time limit'
                                    minLength={1}
                                    required
                                    type="number"
                                    className="form-control"
                                    id="title"
                                    name='title'
                                    autoComplete='off'
                                    value={timeLimit === 0 ? '' : timeLimit} // Bind input value to state
                                    onChange={handleTimeLimitChange} // Handle input value change
                                />
                            </div>
                            <button disabled={timeLimit === 0} type="submit" className="btn btn-warning" style={{ minWidth: '120px' }} onClick={handleSubmit}>Set time limit</button>
                        </form>
                    </div>
                    <div style={{ textAlign: 'center' }}><span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'monospace' }}>Time limit is set to :</span> <span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'monospace' }}>{getTimeLimitfromserver}</span> <span style={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'sans-serif' }}>mins </span></div>

                    <QuestionState>
                        <Questions quizStarted={quizStarted} />
                    </QuestionState>

                    {/* <button className='btn btn-warning d-block mx-auto mb-1' onClick={() => setViewResult(true)} >View Result</button> */}
                    <div ref={resultRef} style={{ visibility: 'hidden' }} />
                    {viewResult && <QuizResult />}
                </>
            ) : (
                <>
                    <p style={{ textAlign: 'center' }}>Quiz is currently active. End time:{new Date(quizEndTime).toLocaleTimeString()}</p>
                    <button className='btn btn-warning d-block mx-auto mb-1 ' onClick={endQuiz}>End Quiz</button>

                    <button className='btn btn-warning d-block mx-auto mb-1 ' onClick={handleViewResult} >View Result</button>

                    <QuestionState>
                        <Questions quizStarted={quizStarted} setQuizStarted={setQuizStarted} />
                    </QuestionState>
                    {/* <QuizResult /> */}
                    <div ref={resultRef} style={{ visibility: 'hidden' }} />
                    {viewResult && <QuizResult />}
                </>
            )}

        </div>
    );
};

export default Admin;
