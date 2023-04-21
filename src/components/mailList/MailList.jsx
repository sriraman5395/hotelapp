import "./mailList.css"
import { useRef,useState } from "react";
import emailjs from '@emailjs/browser';
import { collection, addDoc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// import  {database} from './Firebase'
// import {initializeApp } from 'firebase/app';
// import {getDatabase,ref,set,push} from 'firebase/database';
import {initializeApp } from 'firebase/app';
import {getDatabase,ref,set,push} from 'firebase/database';
import { getAnalytics } from "firebase/analytics";






const firebaseConfig = {
  apiKey: "AIzaSyDDrkOAagEgBKnlla-qZTgSNNcu2Tdh3HA",
  authDomain: "hotelbook-4737b.firebaseapp.com",
  databaseURL: "https://hotelbook-4737b-default-rtdb.firebaseio.com",
  projectId: "hotelbook-4737b",
  storageBucket: "hotelbook-4737b.appspot.com",
  messagingSenderId: "967922101864",
  appId: "1:967922101864:web:404359727f97a8cb6b15dd",
  measurementId: "G-JCG34ZTXCD"
};





const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



const database = getDatabase();
const newLocationRef = ref(database, "newLocation");
const newData = {
  foo: "bar",
  baz: "qux"
};
set(newLocationRef, newData);
const MailList = () => {
  const form = useRef();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const docRef = await addDoc(collection(db, 'contacts'), formValues);
  //     console.log('Document written with ID:', docRef.id);
  //     setFormValues({
  //       name: '',
  //       email: '',
  //       subject: '',
  //       message: '',
  //     });
  //   } catch (e) {
  //     console.error('Error adding document:', e);
  //   }
  //   event.preventDefault();
  
  //   emailjs.sendForm('service_b5tx3cg', 'template_tm85ror', form.current, '8A9plV5uaxFJvcGXK')
  //     .then((result) => {
  //         console.log(result.text);
  //     }, (error) => {
  //         console.log(error.text);
  //     });
  //     event.target.reset();
  // };
  
    // const sendEmail = (e) => {
   
    // };
    // const handleChange = (event) => {
    //   const { name, value } = event.target;
    //   setFormValues((prevValues) => ({
    //     ...prevValues,
    //     [name]: value,
    //   }));
    // };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const db = getDatabase();
      const contactsRef = ref(db, 'contacts');
      const newContactRef = push(contactsRef);
  
      const newContactData = {
        name: formValues.name,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message,
      };
  
      // Save the new contact data to the database
      set(newContactRef, newContactData)
        .then(() => {
          // Clear the form after submission
          setFormValues({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          console.log("Message Sent");

          alert('Message sent!');
        })
        .catch((error) => {
          console.error(error);
          alert('An error occurred while sending the message. Please try again later.');
        });
    };
  
  
  return (
    <div className="mail">
      <h1 className="mailTitle">Contact us</h1>
      <form className="for" ref={form} onSubmit={handleSubmit}>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Name" name="name" 
        value={formValues.name}
        onChange={handleInputChange}/>
       
      </div>
      <div className="mailInputContainer">
        <input type="email" placeholder="Your Email" name="email" value={formValues.email}
        onChange={handleInputChange}/>
       
      </div>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Subject" name="subject"    value={formValues.subject}
        onChange={handleInputChange}/>
       
      </div>
      <div className="mailInputContainer">
        {/* <input type="textarea" placeholder="Your Message" /> */}
        <textarea placeholder="message" name="message" value={formValues.message}
        onChange={handleInputChange}></textarea>
       
      </div>
      <button className="send">Send</button>
      </form>
    </div>
    
  )
}

export default MailList