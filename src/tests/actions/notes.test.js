//import util from 'util'; 
import configureStore from 'redux-mock-store'; 
import thunk  from "redux-thunk";
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import {fileUpload} from '../../helpers/fileUpload'; 

jest.mock('../../helpers/fileUpload', ()=>({     
     fileUpload: jest.fn(()=>{
          //return 'https://hola-mundo.com/cosa.jpg';
          return Promise.resolve('https://hola-mundo.com/cosa.jpg')
     })
}))

/*jest.mock('../../actions/auth', ()=>({
     startLoadingNotes: jest.fn(()=>{
          //return 'https://hola-mundo.com/cosa.jpg';
          return Promise.resolve( async (dispatch)=>{
               const notes= await loadNotes(uid);
               dispatch(setNotes(notes)); 
          }) 
     })
}))*/
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares); 

const initState={
     auth: {
          uid: 'TESTING'
     },
     notes: {
          active: {
               id: 'PsbgJj6O0UClPLE79jec',
               title: 'Hola', 
               body:'Mundo'
          }
     }
}

let store= mockStore(initState)

describe('Pruebas en notes', () => {

     beforeEach(()=>{
          store=mockStore(initState)
     });
     
     test('Debe de crear  un nueva nota startNewNote', async() => {
          await store.dispatch(startNewNote());          
          const actions=store.getActions(); 
          //console.log(actions); 

          expect(actions[0]).toEqual({
               type: types.notesActive, 
               payload: {
                    id: expect.any(String),
                    title: '', 
                    body: '', 
                    url: expect.any(String),
                    date: expect.any(Number)
               }
          }); 
          expect(actions[1]).toEqual({
               type: types.notesAddNew,
               payload: {
                    id: expect.any(String),
                    title: '', 
                    body: '', 
                    url: expect.any(String),
                    date: expect.any(Number)
               }
          });

          //const docId... action... payload ...id
          //await... db...doc(``)... .delete();
          const docId=actions[0].payload.id; 

          await db.doc(`TESTING/journal/notes/${docId}`).delete();
     }); 

     test('startLoadingNotes debe cargar las notas', async() => {
          console.log('startLoadingNotes');                     
         /* await store.dispatch(startLoadingNotes('TESTING')); 
          const actions = store.getActions();                 
          console.log(actions);  
                                  
               expect(actions[0]).toEqual({
                    type:types.notesLoad,
                    payload:expect.any(Array)
               });
                    
               const expected={
                    id: expect.any(String),
                    title: expect.any(String),
                    body: expect.any(String),
                    date: expect.any(Number)
               }
          
               expect(actions[0].payload[0]).toMatchObject(expected);*/ 
     });     
    
     test('startSaveNote debe cargar las notas', async() => {
          const note={
               id:'PsbgJj6O0UClPLE79jec',
               title:'titulo', 
               body: 'body'
          }; 
          await store.dispatch(startSaveNote(note)); 
          const actions= store.getActions(); 
          //console.log(actions); 
          expect(actions[0].type).toBe(types.notesUpdated);

          //devuelve una referencia promesa a docRef
          
          console.time('demora');
          try {               
               //const doc = await db.doc(`/TESTING/journal/notes/${note.id}`);
              // const  docRef = docRef.get().catch((error)=>{console.log(error)});
          } catch (error) {
               console.log('hubo un error')    
          }          
          console.timeEnd('demora');
          //const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();     
          //expect(docRef.data().title).toBe(note.title);          
     });

    test('startUploading debe de actualizar el url del entry ', async() => {
          const file= new File([],'foto.jpg'); 
          //await store.dispatch(startUploading(file));

          //const docRef = await db.doc(`/TESTING/journal/notes/PsbgJj6O0UClPLE79jec`);
          //docRef.get(); 
          //expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg'); 

     });
     
})
