import { useState } from "react"
import QuestionContext from "./questionContext"


const QuestionState = (props) => {
    const host = "http://localhost:4000"

    const [questions, setQuestions] = useState([])


    const getQuestions = async () => {

        const response = await fetch(`${host}/question/allQuestions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });

        const json = await response.json()

        setQuestions(json)


    }

    const addQuestion = async (question, options, correctAnswerIndex, answer) => {

        await fetch(`${host}/question/addQuestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, options, correctAnswerIndex, answer }),

        });

    }


    const editQuestion = async (id, question, options, correctAnswerIndex, answer) => {

        await fetch(`${host}/question/updateQuestion/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, options, correctAnswerIndex, answer }),

        });

        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];

            if (element._id === id) {
                questions[index].question = question
                questions[index].options = options
                questions[index].correctAnswerIndex = correctAnswerIndex
                questions[index].answer = answer
                // questions[index].timelimit = timelimit
            }

        }

    }

    const deleteQuestion = async (id) => {

        await fetch(`${host}/question/deleteQuestion/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }

        });

        // const json = await response.json()
        // console.log(json);
        const newQuestions = questions.filter((question) => {
            return question._id !== id
        })

        setQuestions(newQuestions)

    }



    return (
        <QuestionContext.Provider value={{ questions, setQuestions, addQuestion, deleteQuestion, editQuestion, getQuestions }}>
            {props.children}
        </QuestionContext.Provider>
    )

}

export default QuestionState