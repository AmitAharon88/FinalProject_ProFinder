import { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const Tutors = () => {
   const[filteredTutors, setFilteredTutors] = useState([]);

   const tutors = useRef()

   useEffect(() => {
        getTutors()
   }, []);

   const getTutors = async () => {
      try {
          const res = await fetch(`/api/tutors`);
          const data = await res.json();
         //  console.log('data:', data);

          const tutorsObj = {}

          data.forEach(row => {
            const {
               tutor_id,
               first_name,
               last_name,
               email,
               location_name,
               category_name,
               subcategory_name,
               tutor_cat_id
             } = row;

             if (tutorsObj[tutor_id]) {
               // Tutor already exists in the object, append category and subcategory
               tutorsObj[tutor_id].cat_subcat.push([category_name, subcategory_name, tutor_cat_id]);
             } else {
               // Create a new tutor object and initialize categories and subcategories arrays
               tutorsObj[tutor_id] = {
                 tutor_id,
                 first_name,
                 last_name,
                 email,
                 location_name,
                 cat_subcat: [[category_name, subcategory_name, tutor_cat_id]],
               };
             }

            //  console.log(tutorsObj)

             const tutorsArray = Object.values(tutorsObj);
            //  console.log('tutors array:', tutorsArray);
             const orderedTutorsArray = tutorsArray.sort((a, b) => a.first_name.localeCompare(b.first_name));
            //  console.log('sorted tutors array:', orderedTutorsArray);

             tutors.current = orderedTutorsArray;
             setFilteredTutors(orderedTutorsArray)
          })
      } catch (e) {
          console.log(e);
      };
   };

   const onCategoryChange = (event) => {
      event.preventDefault();
      const searchInput= event.target.value.toLowerCase().trim();
      console.log(`input search: ${searchInput}`)

      const filtered = tutors.current.filter(tutor => {
         return tutor.cat_subcat.some(item => {
            return item[0].toLowerCase().includes(searchInput) 
         })
      })
      console.log('filtered:', filtered);
      setFilteredTutors(filtered); // Update the state with the filtered tutors
   };

   const onSubcategoryChange = (event) => {
      event.preventDefault();
      const searchInput= event.target.value.toLowerCase().trim();
      console.log(`input search: ${searchInput}`)

      const filtered = tutors.current.filter(tutor => {
         return tutor.cat_subcat.some(item => {
            return item[1].toLowerCase().includes(searchInput) 
         })
      })
      console.log('filtered:', filtered);
      setFilteredTutors(filtered); // Update the state with the filtered tutors
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
          sx={{
            mt: 4,
            mb: 4,
            fontWeight: "bold"
         }}
        >Find your Pro Today</Typography>
         <Box
            component="form"
            sx={{
               display: "flex",   // Add this line to use flex display
               alignItems: "center", // Center vertically
               justifyContent: "center",
               '& > :not(style)': { m: 1, width: '25ch' },
               mb: 2
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
            }}>
            {
               filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor) => {
                     return (
                        <Card
                           key={tutor.tutor_id}
                           sx={{
                              margin: 1, // Adjust margin as needed
                          }}
                        >
                           <CardActionArea 
                              component={Link}
                              to={`/${tutor.tutor_id}`}
                              sx={{
                                 display: "flex",
                                 flexDirection: "column",
                                 alignItems: "center", // Center vertically
                                 justifyContent: "flex-start",
                                 width: 340, // Set the width of the card
                                 height: 500
                              }}
                           >
                              <CardMedia
                                 component="img"
                                 sx={{
                                    width: 200, // Adjust the size as needed
                                    height: 200,
                                    borderRadius: '50%',
                                    mt: 2
                                 }}
                                 // image="https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
                                 image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
                                 alt="profile image"
                              />
                              <CardContent
                                 sx={{
                                    display: "flex",   // Add this line to use flex display
                                    flexDirection: "column",
                                    alignItems: "center", // Center vertically
                                 }}
                              >
                                 <Typography gutterBottom variant="h5" color="text.secondary" sx={{fontWeight: 'bold', mb: 2}}>
                                    {tutor.first_name} {tutor.last_name}
                                 </Typography>


                                 {tutor.cat_subcat.map((subject) => {
                                    return (
                                       
                                          <Typography key={uuidv4()} gutterBottom variant="body2" color="text.secondary" sx={{fontSize: '18px', textAlign: 'center', mb: 2 }}>
                                             {subject[0]}: {subject[1]}
                                          </Typography>
                                       
                                    )
                                 })}
                                 <Typography variant="body2" color="text.secondary">
                                    {tutor.location_name}
                                 </Typography>   
                              </CardContent>
                              <CardActions
                                 // key={`button${tutor.tutor_id}`}
                              >
                                 <Link to={`/${tutor.tutor_id}`}>
                                    <Button 
                                       variant="outlined"
                                       sx={{ 
                                          color: "#00695f",
                                          bgcolor: "#FFFFFF",
                                          borderColor: "#00695f",
                                          '&:hover': {
                                             color: "#FFFFFF",
                                             bgcolor: "#00695f",
                                             borderColor: "#00695f",
                                          },
                                       }}
                                    >
                                       More Info
                                    </Button>
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