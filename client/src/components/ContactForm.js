import { useState } from 'react';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ContactForm = ({ tutorFN, tutorEmail }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [requiredFields, setRequiredFields] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // try {
        //     const res = await fetch('/api/send-email', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             recipient: tutorEmail,
        //             from: ,
        //             subject,
        //             content,
        //         }),
        //     });
            
        //     if (res.ok) {
        //         const response = await res.json();
        //         console.log(response.msg);
        //     } else {
        //         const errorResponse = await res.json();
        //         console.log('Error:', errorResponse.msg); 
        //         setRequiredFields(true);
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    };

    return (
        <>
            <Card
            sx={{
               width: "80vw",
               marginTop: 2
            }}
         >
            <CardContent>
            <Typography 
                component="h2"
                variant="h2"
                color="#71797E"
                fontWeight="bold"
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 8
                }}
            >
                Contact {tutorFN}
            </Typography>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="subject"
                                label="Subject"
                                type="text"
                                id="subject"
                            />
                            <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="message"
                                    label="Message"
                                    name="message"
                                    multiline
                                    rows={4}
                                    placeholder={`Hello ${tutorFN} :)`}
                                />
                                {requiredFields ? (
                                <Typography component="body1" variant="p" color="red">
                                        * Fill in all required field
                                </Typography> ) : null}
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
                                    Send
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                    </CardContent>
                </Card>
        </>
    );
};

export default ContactForm;
