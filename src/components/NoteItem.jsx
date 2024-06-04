import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { title, description, tag, _id } = props.note
    const { updateNote, note } = props


    return (

        <div className=' col-md-4' style={{ width: '80%' }}>
            <div className="card my-3" style={{ "boxShadow": "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{tag}</p>
                    <i className="fa-regular fa-trash-can fa-lg mx-2" onClick={() => { deleteNote(_id) }}></i>

                    <i className="fa-regular fa-pen-to-square fa-lg mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div >


    )
}

export default NoteItem