
import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddNote = (props) => {

    
    const context = useContext(NoteContext)
    const { addNote, getAllNotes } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = async (e) => {
        e.preventDefault()
        await addNote(note.title, note.description, note.tag)
        // props.showAlert("Added the note Successfully", "success")

        setNote({ title: "", description: "", tag: "" })
        toast.success("Added Your note successfully.");

        getAllNotes()
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {/* <ToastContainer position="top-right" style={{ marginTop: '5rem' }} />  */}

            <div className='container my-3 py-2'>
                <h2 style={{ textAlign: 'center' }}>Add a note</h2>
                <form className='my-3 py-2'>
                    <div className="mb-3">
                        <input style={{ border: '1px solid black' }} placeholder='Title' minLength={5} required type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <input style={{ border: '1px solid black' }} placeholder='Description' minLength={5} required type="text" className="form-control" id="description" value={note.description} name='description' autoComplete='off' onChange={onChange} />
                    </div>

                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary d-block mx-auto mb-1" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote