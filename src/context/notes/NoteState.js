import { useState } from "react"
import NoteContext from "./noteContext"


const NoteState = (props) => {
    const host = "https://profileforgeserver.onrender.com"

    const [notes, setNotes] = useState([])


    const getAllNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjVmN2U0MDJmZjE0MWZkOTkzODQ5Y2M3IiwibmFtZSI6Im5pa2hpbCIsImVtYWlsIjoibmlraGlsa3VtYXJAZ21haWwuY29tIn0sImlhdCI6MTcxMDgyNzMzMX0.YTIq9KoMozgXNmGMnqOu87P-lveFXxmE53XrK0diPEs'
            },

        });

        const json = await response.json()

        setNotes(json)


    }

    const addNote = async (title, description, tag) => {

        await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjVmN2U0MDJmZjE0MWZkOTkzODQ5Y2M3IiwibmFtZSI6Im5pa2hpbCIsImVtYWlsIjoibmlraGlsa3VtYXJAZ21haWwuY29tIn0sImlhdCI6MTcxMDgyNzMzMX0.YTIq9KoMozgXNmGMnqOu87P-lveFXxmE53XrK0diPEs'
            },
            body: JSON.stringify({ title, description, tag }),

        });

        // const json = await response.json()



    }


    const editNote = async (id, title, description, tag) => {

        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjVmN2U0MDJmZjE0MWZkOTkzODQ5Y2M3IiwibmFtZSI6Im5pa2hpbCIsImVtYWlsIjoibmlraGlsa3VtYXJAZ21haWwuY29tIn0sImlhdCI6MTcxMDgyNzMzMX0.YTIq9KoMozgXNmGMnqOu87P-lveFXxmE53XrK0diPEs'
            },
            body: JSON.stringify({ title, description, tag }),

        });

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                notes[index].title = title
                notes[index].description = description
                notes[index].tag = tag
            }

        }

    }

    const deleteNote = async (id) => {

        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjVmN2U0MDJmZjE0MWZkOTkzODQ5Y2M3IiwibmFtZSI6Im5pa2hpbCIsImVtYWlsIjoibmlraGlsa3VtYXJAZ21haWwuY29tIn0sImlhdCI6MTcxMDgyNzMzMX0.YTIq9KoMozgXNmGMnqOu87P-lveFXxmE53XrK0diPEs'
            }

        });

        // const json = await response.json()
        // console.log(json);
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })

        setNotes(newNotes)

    }



    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState