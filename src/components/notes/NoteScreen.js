import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

      const dispatch = useDispatch();

     const {active: note} = useSelector (state => state.notes);
     //console.log(note); 
     const [formValues, handledInputChange,reset]=useForm(note);
     //console.log(formValues);     
     const {body, title, id}= formValues; 

     const activeId= useRef(note.id);

     useEffect(() => {     
          if(note.id !== activeId.current) {
               reset (note) ; 
               activeId.current=note.id; 
          }
     }, [note, reset])

     useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues})); 
     }, [formValues,dispatch])

     const handleDelete = () => {
         dispatch(startDeleting(id));  
     }

     return (
          <div className="notes_main-content">
               <NotesAppBar/>
               <div className="notes_content" >
                    <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    name="title"
                    onChange={handledInputChange}
                    />

                    <textarea
                    placeholder="What happened today"
                    className="notes_textarea"
                    value={body}
                    name="body"
                    onChange={handledInputChange}
                    ></textarea>

                    {
                         (note.url)
                         &&(
                              <div className="notes_image">
                                   <img 
                                   src={note.url}
                                   alt="imagen"
                                   />
                              </div>
                         )
                    }
               </div>
               <button
                    className="btn btn-danger"  
                    onClick={handleDelete}
               >Delete </button>
          </div>
     )
}
