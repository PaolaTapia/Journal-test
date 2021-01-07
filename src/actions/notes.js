import Swal from 'sweetalert2'; 
import {db} from '../firebase/firebase-config'; 
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';
import { types } from '../types/types';

//react-journal

export const startNewNote = ()=> {
     return async (dispatch, getState )=> {
          const {uid}= getState().auth; 
          
          const newNote = {
               title: '', 
               body: '', 
               url:'',
               date: new Date().getTime(), 
          }
          
          try {
               //docRef
          const doc= await db.collection(`${uid}/journal/notes`).add(newNote); 
          dispatch(activeNote(doc.id, newNote));
          //dispatch(startLoadingNotes(uid));
          dispatch(addNewNote(doc.id, newNote));
          } catch (error) {
               console.log(error); 
          }
     }
}

export const activeNote = (id, note)=> ({
     type: types.notesActive, 
     payload: {
          id, 
          ...note
     }
}); 

export const addNewNote=(id, note)=>({
     type: types.notesAddNew, 
     payload: {
          id, 
          ...note
     }
})

export const startLoadingNotes=(uid)=>{
     return async (dispatch)=>{
          const notes= await loadNotes(uid);
             dispatch(setNotes(notes)); 
     }
}

export const setNotes = (notes) =>({
    type: types.notesLoad, 
    payload: notes 
}); 

export const startSaveNote = (note) => {
    
     return async( dispatch, getState) => {

          const {uid} = getState().auth; 
          //si no viene el url borra el url
          if(!note.url) {
               delete note.url; 
          }
          const noteToFirestore= {...note}; 
          delete noteToFirestore.id; 
        
          await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore); 
          //Actualiza la página, no solo lo que cambió
          //dispatch(startLoadingNotes(uid));          
          dispatch(refreshNote(note.id, note)); 
          Swal.fire('Saved', note.title, 'success' )
     }     
}

export const refreshNote = (id, note) => ({
     type: types.notesUpdated, 
     payload: {
          id, 
          note
          //: id,  ...note
     }
})

export const startUploading = (file)=> {
     return async (dispatch, getState) => {
          
          const { active: activeNote }= getState().notes; 
          try {
          Swal.fire({
               title: 'Uploading...', 
               text: 'Please wait...',
               showConfirmButton: false,allowOutsideClick: false,
               willOpen: () => {
                    Swal.showLoading(); 
               }
          });    
          } catch (error) {
               console.log(error)
          }

          try {
          const fileUrl= await fileUpload(file);           
          activeNote.url=fileUrl; 
          dispatch(startSaveNote(activeNote)) ;

          Swal.close(); 
          } catch (error) {
               console.log(error)
          }
     }
}

export const startDeleting = (id) => {
     return async (dispatch, getState ) => {
        const uid=getState().auth.uid;        
        await db.doc(`${uid}/journal/notes/${id}`).delete(); 
        //console.log(id);
        dispatch(deleteNote(id));  

        //[VER]  
        //dispatch(startLoadingNotes(uid));        
     }
}

export const deleteNote=(id)=>({
     type: types.notesDelete,
     payload: id     
})

export const noteLogout=()=>({
     type: types.notesLogoutCleaning      
})