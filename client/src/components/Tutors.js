import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Tutors = (props) => {
   const[tutors, setTutors] = useState([]);
   const[searchField, setSearchField] = useState('');

   useEffect(() => {
        getTutors()
   }, []);

   const getTutors = async () => {
      try {
          const res = await fetch(`${BASE_URL}/api/tutors`);
          const data = await res.json();
          console.log(data);
          setTutors(data);
      } catch (e) {
          console.log(e);
      };
   };

   const onSearchChange = (event) => {
      event.preventDefault();
      const searchInput= event.target.value;
      setSearchField(searchInput);
      console.log(searchInput)

      // const filteredTutors = tutors.filter(tutor =>{
      //    return tutor.category_name.toLowerCase().includes(searchInput.toLowerCase());
      // });
      // console.log(filteredTutors);
      // setTutors(filteredTutors); // Update the state with the filtered tutors
   };

   const filteredTutors = tutors.filter(tutor =>{
      return tutor.category_name.toLowerCase().includes(searchField.toLowerCase());
   });
   console.log(filteredTutors);

   return (
      <>
         <h1>Find your Pro Today</h1>
         <form>
            <input name="Subject" onChange={onSearchChange} placeholder="Subject" /><br/>
         </form>
         {
            tutors.length > 0 ? (
               filteredTutors.map(tutor => {
                  return (
                     <div key={tutor.tutor_id}>
                        <h4>{tutor.first_name} {tutor.last_name}</h4>
                        <h5>{tutor.category_name}</h5>
                        <h5>{tutor.subcategory_name}</h5>
                        <h6>{tutor.location_name}</h6>
                        <Link to={`/${tutor.tutor_id}`}>
                           <Button variant="outlined">More Info</Button>
                        </Link>
                     </div>
                  )
               })
            ) : (
               <p>No tutors found.</p>
            )
         }
      </>
   );
};   
    
export default Tutors;