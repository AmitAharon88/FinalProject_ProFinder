import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReviewForm = ({tutorFN, handleReviewFormSubmission}) => {
    const [value, setValue] = React.useState(0);

    const { studentId, setStudentId } = useContext(AppContext);

    const params = useParams();
    console.log(`Params: ${params.id}`);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const userData = {};
    
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        userData.tutor_id = params.id;
        userData.student_id = studentId
    
        console.log(`Submitted data: ${JSON.stringify(userData)}`)
    
        try {
            const res = await fetch(`${BASE_URL}/api/tutors/${params.id}/reviews/write`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const newReview = await res.json();
            console.log(`RF NR: ${newReview.data}`)
            handleReviewFormSubmission(newReview);
            // Close the review form
            // setShowReviewForm(false);
        } catch (e) {
            console.log(e);
        };
    };

    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography 
                component="h1"
                variant="h5"
                color="#71797E"
                fontWeight="bold"
            >
                Write Review
            </Typography>
            <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography
                    component="legend"
                    color="#71797E" 
                >
                    Give a rating:
                </Typography>
                    <Rating
                        name="rating"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="comment"
                    label="Comments"
                    name="comment"
                    multiline
                    rows={4}
                    placeholder={`Tell us about your experience having ${tutorFN} as your tutor`}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                    mt: 3, 
                    mb: 2, 
                    bgcolor: "#009688",
                    '&:hover': {
                    bgcolor: "#00695f",
                    },
                }}
                >
                Submit
                </Button>
            </Box>
        </Box>
      </Container>
  );
}

export default ReviewForm;