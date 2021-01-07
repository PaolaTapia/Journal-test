import configureStore from 'redux-mock-store'; 
import thunk  from "redux-thunk";

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";


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

describe('Pruebas con las acciones de Auth', () => {
     beforeEach(()=>{
          store=mockStore(initState); 
     })

     test('Login y logout deben de crear la acción respectiva', () => {
          const uid="ABC123"; 
          const displayName= 'Fernando'; 

          const loginAction=login(uid, displayName);
          const logoutAction=logout(); 

          expect (loginAction).toEqual({
               type: types.login, 
               payload: {
                    uid,
                    displayName
               }
          }); 

          expect(logoutAction).toEqual({
               type: types.logout
          })
          
     }); 
     test('debe de realizar el startLogout', async () => {
          await store.dispatch(startLogout()); 

          const actions= store.getActions(); 

          //console.log(actions); 
          expect(actions[1]).toEqual({
               type: types.logout
          })
          expect(actions[0]).toEqual({
               type: types.notesLogoutCleaning
          })          
     }); 

     test('debe de iniciar el startLoginEmailPassword', async()=> {
          await store.dispatch(startLoginEmailPassword('test@testing.com','123456')); 
          const actions= store.getActions(); 
          //console.log(actions)
          expect(actions[1]).toEqual({
               type: types.login, 
               payload: {
                    uid: '1PAFavFirYfOxVk7LKlolH3t3v82',
                    displayName: null
               }
          })
     } )
     
     
})
