import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('test en authReducer', () => {
     test('debe de realizar el login', () => {
          const initState={    }
          
          const action= {
               type:types.login,
               payload: {
                    uid: 'abc',
                    displayName: 'Paola'
               }
          }
          const state= authReducer(initState, action); 
          expect(state).toEqual({
               uid: 'abc',
               name: 'Paola'
          })
     })
     
     test('debe de realizar el logout', () => {
          const initState={
               uid: 'DAÑLKJDFOPIJENV', 
               name: 'Paola'              
          }
          
          const action= {
               type: types.logout,       
          }
          const state= authReducer(initState, action); 
          expect(state).toEqual({});
     })

     test('no debe hacer cambios en el state', () => {
          const initState={
               uid: 'DAÑLKJDFOPIJENV', 
               name: 'Paola'              
          }
          
          const action= {
               type: 'dlkfldskjf',
          }

          const state= authReducer(initState, action); 
          expect(state).toEqual(initState);
     })
     
})
