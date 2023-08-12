import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from "@mui/material/Divider";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Tutor = (props) => {
   const[tutor, setTutor] = useState({});
   const[reviews, setReviews] = useState([]);

   const params = useParams();
   console.log(params);

   const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };

   useEffect(() => {
      getTutor()
      getReviews()
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

   const getReviews = async () => {
      try {
          const res = await fetch(`${BASE_URL}/api/tutors/${params.id}/reviews`);
          const data = await res.json();
          console.log(data);
          setReviews(data)
      } catch (e) {
          console.log(e);
      };
   };

   const reviewsWithFormattedDate = reviews.map((review) => {
      return {
        ...review,
        review_date: new Date(review.review_date), // Convert to Date object
      };
    });

   const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
   };

   const calculateAverageRating = (reviews) => {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      return Math.round(averageRating * 2) / 2;
   };

   return (
      <Box 
         key={tutor.tutor_id}
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            marginTop: 5
         }}
      >
         <Card
            sx={{
               width: "80vw",
            }}
         >
            <CardContent>
               <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                     <CardMedia
                        component="img"
                        // width="100%"
                        // height="100%"
                        // sx={{ borderRadius: "50%" }}
                        // image="https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
                        image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
                        alt="avitar profile image"
                     />
                  </Grid>
                  <Grid item xs={9}>
                        <Typography 
                           component="h4"
                           variant="h4"
                           color="#71797E"
                           fontWeight="bold"
                        >
                           {tutor.first_name} {tutor.last_name}
                        </Typography>
                        <Typography 
                           component="p"
                           variant="body1"
                           color="#71797E"         
                        >
                           {tutor.category_name} tutor specializing in {tutor.subcategory_name}
                        </Typography>
                           <Typography 
                           component="p"
                           variant="body1"
                           color="#71797E"         
                        >
                           Located in {tutor.location_name}
                        </Typography>
                        <Typography 
                           component="p"
                           variant="body1"
                           color="#71797E"         
                        >
                           Academia: {tutor.education}
                        </Typography>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>
         <Card
            sx={{
               width: "80vw",
               marginTop: 2
            }}
         >
            <CardContent>
               <Typography 
                  component="h5"
                  variant="h5"
                  color="#71797E"         
               >
                  About Me:
               </Typography>
               <Typography 
                  component="p"
                  variant="body1"
                  color="#71797E"         
               >
                  {tutor.about}
               </Typography>
            </CardContent>
         </Card>
         <Card
            sx={{
               width: "80vw",
               marginTop: 2
            }}
         >
            <CardContent>
               <Box
                  
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                     mb: 2 
                     
                  }}
               >
                  <Typography 
                     component="h5"
                     variant="h5"
                     color="#71797E"
                  >
                     Reviews:
                  </Typography>
                  <Box
                     sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     <Rating
                        name="average-rating"
                        value={calculateAverageRating(reviewsWithFormattedDate)}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
                     />
                     <Box sx={{ ml: 2 }}>{labels[calculateAverageRating(reviewsWithFormattedDate)]}</Box>
                  </Box>
               </Box>

               {reviews.length > 0 ? (
                  reviewsWithFormattedDate.map((review, review_id) => {
                     return (
                        <Box
                        key={review_id}
                        >
                           
                           <Typography
                              component="p"
                              variant="body1"
                              color="#71797E"         
                           >
                              {review.first_name} {review.last_name}
                           </Typography>
                           <Typography
                              component="p"
                              variant="body1"
                              color="#71797E"
                              marginTop={1}         
                           >
                              {review.comment}
                           </Typography>
                           <Box
                                 sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1
                                 }}
                              >
                                 <Rating
                                    name="review-feedback"
                                    value={review.rating}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
                                 />
                                 {/* <Box sx={{ ml: 2 }}>{labels[review.rating]}</Box> */}
                              </Box>
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'row-reverse',
                                 mt: 1
                              }}
                           >
                              <Typography
                                 component="p"
                                 variant="body1"
                                 color="#71797E"
                              >
                                 {formatDate(review.review_date)}
                              </Typography>
                           </Box>
                           
                           <Divider 
                              sx= {{mt: 2, mb: 2}}
                           />
                        </Box>  
                     )
                  })
               ) : (
                  <Typography
                     component="p"
                     variant="body1"
                     color="#71797E"         
                  >
                     No reviews available.
                  </Typography>
               )}  
            </CardContent>
         </Card>      
         <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{
               width: "80vw" ,
               mt: 3, 
               mb: 2, 
               bgcolor: "#009688",
               '&:hover': {
                  bgcolor: "#00695f",
               },
            }}
         >
            Connect
         </Button>
      </Box>
    );
};   
    
export default Tutor;