import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Tutor = (props) => {
   const[tutor, setTutor] = useState({});

   const params = useParams();
   console.log(params);

   useEffect(() => {
      getTutor()
   }, []);

   const getTutor = async () => {
      try {
          const res = await fetch(`${BASE_URL}/api/tutors/${params.id}`);
          const data = await res.json();
          console.log(data);
          setTutor(data);
      } catch (e) {
          console.log(e);
      };
   };

    return (
       <>
                  <div key={tutor.tutor_id}>
                     <h1>{tutor.first_name} {tutor.last_name}</h1>
                     <h5>{tutor.category_name}</h5>
                     <h5>{tutor.subcategory_name}</h5>
                     <h6>{tutor.location_name}</h6>
                     <p>{tutor.about}</p>
                     <p>{tutor.education}</p>
                     <Button variant="outlined">Chat</Button>
                  </div>
       </>
    );
};   
    
export default Tutor;