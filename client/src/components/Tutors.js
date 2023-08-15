import { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Tutors = () => {
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
         <Typography
          variant="h2"
          align="center"
          color="text.secondary"
          component="h2"
        >Find your Pro Today</Typography>
         <Box
            component="form"
            sx={{
               display: "flex",   // Add this line to use flex display
               alignItems: "center", // Center vertically
               justifyContent: "center",
               '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
         >
            <TextField id="outlined-basic" name="category" label="Subject" variant="outlined" onChange={onCategoryChange} />
            <TextField id="outlined-basic" name="subcategory" label="Topic" variant="outlined" onChange={onSubcategoryChange} />
            <TextField id="outlined-basic" name="location" label="Location" variant="outlined" onChange={onLocationChange} />
         </Box>
         <Box 
            sx={{ 
               display: "flex",
               flexWrap: "wrap",
               justifyContent: 'center',
               alignItems: 'center' }}>
            {
               filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor,i) => {
                     return (
                        <Card
                           key={i}
                           sx={{
                              width: 340, // Set the width of the card
                              // height: 600, // Set the height of the card
                              margin: '10px', // Adjust margin as needed
                          }}
                        >
                           <CardActionArea 
                              component={Link}
                              to={`/${tutor.tutor_id}`}
                              sx={{
                                 display: "flex",
                                 flexDirection: "column",
                                 alignItems: "center", // Center vertically
                                 justifyContent: "center"
                              }}
                           >
                              <CardMedia
                                 component="img"
                                 // height="340" // Adjust the height as needed
                                 sx={{ borderRadius: '50%' }}
                                 image="https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
                                 // image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
                                 alt="avitar profile image"
                              />
                              <CardContent
                                 sx={{
                                    display: "flex",   // Add this line to use flex display
                                    flexDirection: "column",
                                    alignItems: "center", // Center vertically
                                    justifyContent: "center"
                                 }}
                              >
                                 <Typography gutterBottom variant="h5" component="div">
                                    {tutor.first_name} {tutor.last_name}
                                 </Typography>
                                 <Typography gutterBottom variant="h6" component="div">
                                    {tutor.category_name}
                                 </Typography>
                                 <Typography gutterBottom variant="body1" component="div">
                                    {tutor.subcategory_name}
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                    {tutor.location_name}
                                 </Typography>   
                              </CardContent>
                              <CardActions>
                                 <Link to={`/${tutor.tutor_id}`}>
                                    <Button variant="outlined">More Info</Button>
                                 </Link>
                              </CardActions>
                           </CardActionArea>
                        </Card>
                     )
                  })
               ) : (
                  <p>No tutors found.</p>
               )
            }
         </Box>
      </>
   );
};   
    
export default Tutors;