import firebase from 'firebase/app'; 
import 'firebase/firestore'; 
import 'firebase/auth'; 

//

//configuración producción/desarrollo
/*const firebaseConfig = {
     apiKey: "AIzaSyAui4BunSA5KW3-F6xC8FA-STiOA6p-QLg",
     authDomain: "react-app-demos.firebaseapp.com",
     databaseURL: "https://react-app-demos.firebaseio.com",
     projectId: "react-app-demos",
     storageBucket: "react-app-demos.appspot.com",
     messagingSenderId: "658327330118",
     appId: "1:658327330118:web:c35bd775560210730a5947"
   };

const firebaseConfigTesting = {
     apiKey: "AIzaSyDjt6tXY1UiKJ1B5DE3FhJSPZExghN53Gc",
     authDomain: "test-demo-19e1f.firebaseapp.com",
     databaseURL: "https://test-demo-19e1f-default-rtdb.firebaseio.com",
     projectId: "test-demo-19e1f",
     storageBucket: "test-demo-19e1f.appspot.com",
     messagingSenderId: "262580677799",
     appId: "1:262580677799:web:d8305933e36d5db689ff82"
   };
*/


const firebaseConfig = {  
     apiKey: process.env.REACT_APP_APIKEY_DEV,
     authDomain: process.env.REACT_APP_AUTHDOMAIN_DEV,
     databaseURL: process.env.REACT_APP_DATABASEURL_DEV,
     projectId: process.env.REACT_APP_PROJECTID_DEV,
     storageBucket: process.env.REACT_APP_STORAGEBUCKET_DEV,
     messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_DEV,
     appId: process.env.REACT_APP_APPID_DEV
   };

const firebaseConfigTesting = {
  apiKey: process.env.REACT_APP_APIKEY_TEST,
  authDomain: process.env.REACT_APP_AUTHDOMAIN_TEST,
  databaseURL: process.env.REACT_APP_DATABASEURL_TEST,
  projectId: process.env.REACT_APP_PROJECTID_TEST,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET_TEST,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_TEST,
  appId: process.env.REACT_APP_APPID_TEST
   };


   //NODE_ENV='test|development'

   if (process.env.NODE_ENV==='test') {
    console.log(process.env)
     //testing
     firebase.initializeApp(firebaseConfigTesting);
   }else {
    console.log(process.env)
     //dev/prod
     firebase.initializeApp(firebaseConfig);
   }
   
  //firebase.initializeApp(firebaseConfig);

   const db=firebase.firestore(); 
   const googleAuthProvider= new firebase.auth.GoogleAuthProvider(); 

   export {
        db,
        googleAuthProvider, 
        firebase
   }