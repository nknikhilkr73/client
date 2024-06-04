import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notes = () => {

    const context = useContext(NoteContext)
    const { notes, getAllNotes, editNote } = context
    const navigate = useNavigate()
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '' })
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes()
        }
        else {
            navigate('/')
        }

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = async () => {
        refClose.current.click()
        await editNote(note.id, note.etitle, note.edescription, note.etag)
        // setNote({ id: '', etitle: '', edescription: '' })
        toast.success("Updated Your note successfully.");
        getAllNotes()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" minLength={5} required id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" autoComplete='off' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" minLength={5} required id="edescription" name='edescription' value={note.edescription} autoComplete='off' onChange={onChange} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' autoComplete='off' value={note.etag} onChange={onChange} />
                                </div> */}
                                {/* <button type="submit" className="btn btn-primary" >Add Note</button> */}
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 style={{ textAlign: 'center', marginTop: '7rem' }}>Your Notes</h2>

            <div style={{ height: '42vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: '10px' }}>

                <div className="container">

                    {notes.length === 0 && 'No notes to display '}
                </div>
                {notes.map((note, index) => {
                    return <NoteItem note={note} key={index} updateNote={updateNote} />
                })}
            </div>
            <AddNote />

        </>
    )
}

export default Notes