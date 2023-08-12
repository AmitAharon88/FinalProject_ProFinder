import { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Tutors = (props) => {
   const[filteredTutors, setFilteredTutors] = useState([]);
   const tutors = useRef()

   useEffect(() => {
        getTutors()
   }, []);

   const getTutors = async () => {
      try {
          const res = await fetch(`${BASE_URL}/api/tutors`);
          const data = await res.json();
          console.log(data);
         tutors.current = data;
          setFilteredTutors(data)
      } catch (e) {
          console.log(e);
      };
   };

   const onCategoryChange = (event) => {
      event.preventDefault();
      const searchInput= event.target.value;
      console.log(searchInput)
       
      const filteredTutors = tutors.current.filter(tutor =>{
         return tutor.category_name.toLowerCase().includes(searchInput.toLowerCase());
      });
      console.log(filteredTutors);
      setFilteredTutors(filteredTutors); // Update the state with the filtered tutors
   };

   const onSubcategoryChange = (event) => {
      event.preventDefault();
      const searchInput= event.target.value;
      console.log(searchInput)
       
      const filteredTutors = tutors.current.filter(tutor =>{
         return tutor.subcategory_name.toLowerCase().includes(searchInput.toLowerCase());
      });
      console.log(filteredTutors);
      setFilteredTutors(filteredTutors); // Update the state with the filtered tutors
   };

   const onLocationChange = (event) => {
      event.preventDefault();
      const searchInput= event.target.value;
      console.log(searchInput)
       
      const filteredTutors = tutors.current.filter(tutor =>{
         return tutor.location_name.toLowerCase().includes(searchInput.toLowerCase());
      });
      console.log(filteredTutors);
      setFilteredTutors(filteredTutors); // Update the state with the filtered tutors
   };

   return (
      <>
         <h1>Find your Pro Today</h1>

         <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
         >
            <p>Search by:</p>
            <TextField id="outlined-basic" name="category" label="Subject" variant="outlined" onChange={onCategoryChange} />
            <TextField id="outlined-basic" name="subcategory" label="Topic" variant="outlined" onChange={onSubcategoryChange} />
            <TextField id="outlined-basic" name="location" label="Location" variant="outlined" onChange={onLocationChange} />
         </Box>
         {
            filteredTutors.length > 0 ? (
               filteredTutors.map((tutor,i) => {
                  return (
                     <div key={i}>
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