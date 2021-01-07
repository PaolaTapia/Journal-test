import { useState } from "react"; 

//recibe un objeto, las propiedades son un campo de un formulario

export const useForm = (initialState={}) => {

     //Aquí podría mandar datos de validación
    
     const [values, setValues] = useState(initialState); 

     const reset =(newFormState = initialState)=> {          
          setValues(newFormState); 
     }

     const handledInputChange= ({target})=>{     
          setValues({
               ...values, 
               [target.name]: target.value
          });           
     }

     return [values, handledInputChange, reset]; 

}