import { useState } from "react";
import DataContext from "./dataContext";

const DataState = (props) => {

    const host = "http://localhost:4000"

    const [data, setData] = useState([])

    const [allData, setAllData] = useState([])

    const getAllStudentsData = async () => {
        const response = await fetch(`${host}/api/students/data/getallstudentsdata`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        setAllData(json)
    }

    const getAllData = async () => {
        const response = await fetch(`${host}/api/students/data/fetchalldata`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-Token': localStorage.getItem('token')
            }
        })
        const json = await response.json()

        setData(json)
    }

    const addData = async (registrationNo, semester, section, skills, cgpa, placement) => {

        await fetch(`${host}/api/students/data/addData`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ registrationNo, semester, section, skills, cgpa, placement }),
        })

    }
    const editData = async (id, registrationNo, semester, section, skills, cgpa, placement) => {
        await fetch(`${host}/api/students/data/updateData/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ registrationNo, semester, section, skills, cgpa, placement }),

        })


    }

    return (
        <DataContext.Provider value={{ allData, setAllData, data, setData, getAllData, getAllStudentsData, addData, editData }}>
            {props.children}
        </DataContext.Provider>
    )

}

export default DataState