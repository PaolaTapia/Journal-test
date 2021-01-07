import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({ 
     cloud_name: 'dkg7moxuk', 
     api_key: '373743979262128', 
     api_secret: '1qx0ZoDkmTLtlzYpg9dQ9VCU0SU' 
   });

describe('Pruebas en fileUpload', () => {
    
     test('debe de cargar un archivo y retornar el URL', async ()=>  {
          
          const resp = await fetch('https://cdn.pixabay.com/user/2012/04/01/00-18-38-212_250x250.png');
          const blob = await resp.blob();           

          const file= new File([blob], 'foto.png'); 
          const url = await fileUpload (file);           
          
          expect(typeof url).toBe('string');  
          
          //Borrar imagen por ID 
          const segments= url.split('/'); 
          const imageId= segments[segments.length-1].replace('.png','');  
          
          //cloudinary.v2.api.delete_resources(imageId, {}, function(error, result) {try{ console.log(result, error); }catch(error){console.log(error)}}); 
          //No funciona 
          /*cloudinary.v2.api.delete_resources(imageId, {}, ()=>{ //done lo recibe como parametro en el async(done)
               done();}); */
          await cloudinary.v2.api.delete_resources(imageId, {}, ()=>{}); 
          
     }) ; 
  
     test('debe de retornar un error', async() => {
          const file= new File([], 'foto.png'); 
          
          const url = await fileUpload (file);

          expect(url).toBe(null);
     }); 
     
})
