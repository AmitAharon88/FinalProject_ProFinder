import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import ReviewForm from './ReviewForm';
import ContactForm from './TutorContactForm';
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
import { v4 as uuidv4 } from 'uuid';

const Tutor = () => {
   const[tutor, setTutor] = useState([]);
   const[reviews, setReviews] = useState([]);
   const[showReviewForm, setShowReviewForm] = useState(false);
   const[showContactForm, setShowContactForm] = useState(false);
   const[wroteReview, setWroteReview] = useState(false);

   const { userRole, setUserRole } = useContext(AppContext);
   const { userId, setUserId } = useContext(AppContext);
   
   const params = useParams();

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
          const res = await fetch(`/api/tutors/${params.id}`);
          const data = await res.json();
          console.log('data:', data)

          const tutorObj = {}

          data.forEach(row => {
            const {
               tutor_id,
               first_name,
               last_name,
               email,
               education,
               about,
               location_name,
               category_name,
               subcategory_name
             } = row;

             if (tutorObj[tutor_id]) {
               // Tutor already exists in the object, append category and subcategory
               tutorObj[tutor_id].cat_subcat.push([category_name, subcategory_name]);
             } else {
               // Create a new tutor object and initialize categories and subcategories arrays
               tutorObj[tutor_id] = {
                 tutor_id,
                 first_name,
                 last_name,
                 email,
                 education,
                 about,
                 location_name,
                 cat_subcat: [[category_name, subcategory_name]],
               };
             }

             console.log('tutorObj:',tutorObj)

             const tutorArray = Object.values(tutorObj);
             console.log('tutorArray:', tutorArray);
             setTutor(tutorArray);
            });
      } catch (e) {
          console.log(e);
      };
   };

   const getReviews = async () => {
      try {
         const res = await fetch(`/api/tutors/${params.id}/reviews`);
         const data = await res.json();
         // console.log(`fetched data: ${JSON.stringify(data)}`);
         const transformedData = data.map((review) => ({
            ...review,
            review_date: new Date(review.review_date),
         }));
         setReviews(transformedData)

         const hasWrittenReview = transformedData.some(review => review.student_id === userId);
         setWroteReview(hasWrittenReview);
         // console.log(reviews)
         // console.log(userId)
         // console.log(wroteReview);
      } catch (e) {
          console.log(e);
      };
   };
   
   const formatDate = (date) => {
      if (date) {
         const options = { year: 'numeric', month: 'long', day: 'numeric' };
         return date.toLocaleDateString(undefined, options);
      }
      return "";
   };

   const calculateAverageRating = (reviews) => {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      return Math.round(averageRating * 2) / 2;
   };

   const handleAddReviewForm = () => {
      setShowReviewForm(true);
   };

   const handleReviewFormSubmission = (newReview) => {
      // Update reviews state with the new review
      setReviews([...reviews, newReview]);
      // Fetch reviews again to ensure you have the latest data
      getReviews();
      setWroteReview(true);
   };

   const handleAddContactForm = () => {
      setShowContactForm(true);
   }

   return (
      <Box 
         key={uuidv4()}
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
                  <Grid 
                  // item 
                  xs={3}>
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
                  <Grid 
                  // item 
                  xs={9}>
                        <Typography 
                           variant="h4"
                           fontWeight="bold"
                           sx={{
                              color: "#71797E"
                           }}
                        >
                           {tutor[0] ? tutor[0].first_name + " " + tutor[0].last_name : null}
                        </Typography>
                        {tutor[0] ? 
                           tutor[0].cat_subcat.map(cat_subcat => 
                              <Typography
                                 key={uuidv4()}
                                 variant="body1"
                                 sx={{
                                    color: "#71797E"
                                 }}         
                              > {cat_subcat[0]} tutor specializing in {cat_subcat[1]} <br/> </Typography>
                           ) : null}
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mt:0.5
                           }}        
                        >
                           {tutor[0] ? 
                              `Located in ${tutor[0].location_name}` : null}
                        </Typography>
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mt:0.5
                           }}         
                        >
                           {tutor[0] ?
                              `Academia: ${tutor[0].education}` : null}
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
                  variant="h5"
                  fontWeight="bold"
                  marginBottom={2}
                  sx={{
                     color: "#71797E"
                  }}   
               >
                  About Me:
               </Typography>
               <Typography 
                  variant="body1"
                  sx={{
                     color: "#71797E"
                  }}        
               >
                  {tutor[0] ?
                     tutor[0].about : null}
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
                     variant="h5"
                     fontWeight="bold"
                     sx={{
                        color: "#71797E"
                     }}
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
                        value={calculateAverageRating(reviews)}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />}
                     />
                     <Box sx={{ ml: 2 }}>{labels[calculateAverageRating(reviews)]}</Box>
                  </Box>
               </Box>
               {reviews.length > 0 ? (
                  reviews.map((review, review_id) => {
                     return (
                        <Box
                        key={review_id}
                        >
                           <Typography
                              variant="body1"
                              sx={{
                                 color: "#71797E"
                              }}        
                           >
                              {review.first_name} {review.last_name}
                           </Typography>
                           <Typography
                              variant="body1"
                              marginTop={1}
                              sx={{
                                 color: "#71797E"
                              }}       
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
                                    key={uuidv4()}
                                    name={`review-feedback-${review_id}`}
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
                                 variant="body1"
                                 sx={{
                                    color: "#71797E"
                                 }}
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
                     variant="body1"
                     sx={{
                        color: "#71797E"
                     }}        
                  >
                     No reviews available.
                  </Typography>
               )}
               {userRole === "students" && (
                  !wroteReview && (
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                        }}
                     >
                        {!showReviewForm && (
                           <Button
                              type="submit"
                              variant="contained"
                              sx={{
                                 mt: 3, 
                                 mb: 2, 
                                 bgcolor: "#009688",
                                 '&:hover': {
                                    bgcolor: "#00695f",
                                 },
                              }}
                              onClick={handleAddReviewForm}
                           >
                              Add review
                           </Button>
                        )}
                     </Box>
                  )
               )}
               {showReviewForm && !wroteReview ? <ReviewForm tutorFN={tutor.first_name} tutorLN={tutor.last_name} handleReviewFormSubmission={handleReviewFormSubmission} /> : null}
            </CardContent>
         </Card>
         {userRole === "students" && (
            !showContactForm && (     
               <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{
                     width: "80vw",
                     mt: 3, 
                     mb: 2, 
                     bgcolor: "#009688",
                     '&:hover': {
                        bgcolor: "#00695f",
                     },
                  }}
                  onClick={handleAddContactForm}
               >
                  Connect
               </Button>
            )
         )}
         {showContactForm ? <ContactForm tutor_id={tutor[0].tutor_id} tutorFN={tutor[0].first_name} student_id={userId} /> : null}
      </Box>
    );
};   
    
export default Tutor;