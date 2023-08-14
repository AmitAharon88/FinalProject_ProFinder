import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReviewForm = ({tutorFN}) => {
    const [value, setValue] = React.useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const userData = {};
    
        formData.forEach((value, key) => {
            userData[key] = value;
        });
    
        console.log(userData)
    
        if (userData.role === "students") { 
          try {
            const res = await fetch(`${BASE_URL}/api/reviews/write`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
          } catch (e) {
              console.log(e);
          };
        
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
            <Box component="form"  noValidate sx={{ mt: 1 }}>
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