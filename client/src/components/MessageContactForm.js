import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppContext } from '../App';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MessageContactForm = ({ tutor_id, student_id, handelFormSubmission }) => {
    const [resMessage, setResMessage] = useState('');
    const [requiredFields, setRequiredFields] = useState(false);
    const [messageSent, setmessageSent] = useState(false);


    const { userFN, setUserFN } = useContext(AppContext);
    const { userLN, setUserLN } = useContext(AppContext);
    const { userId, setUserId } = useContext(AppContext);  
    const { userRole, setUserRole } = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const messageData = {};
    
        formData.forEach((value, key) => {
            messageData[key] = value;
        });

        messageData.tutor_id = tutor_id
        messageData.student_id = student_id
        messageData.sender = `${userFN} ${userLN}`
        console.log(messageData)

        try {
            let url;
            userRole === "students" ? (
               // student id
               url = `${BASE_URL}/api/students/${userId}/messageboard/write`
            ):(
               // tutor id
               url = `${BASE_URL}/api/tutors/${userId}/messageboard/write`
            )
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            if (res.ok) {
                const newMessage = await res.json();
                handelFormSubmission(newMessage.data);
                setResMessage(newMessage.msg);
                setmessageSent(true);
            } else {
                const errorResponse = await res.json();
                console.log('Error:', errorResponse.msg); 
                setRequiredFields(true);
            }
        } catch (e) {
            console.log(e);
        }
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
                {!messageSent ? (
                    <>
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
                                            id="message"
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={4}
                                            placeholder={`Hello :)`}
                                    />
                                        {requiredFields ? (
                                    <Typography component="p" variant="body1" color="red">
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
                    </>
                ) : (
                        <Box
                            sx={{
                                // marginTop: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                justifyContent: "center",
                                textAlign: 'center', // Center text inside

                            }}
                        >
                            <Typography 
                                component="p"
                                variant="body1"
                                sx = {{
                                    color: "#009688"
                                }}
                            >
                                {resMessage}
                            </Typography>
                        </Box>
                )}
                    </CardContent>
                </Card>
        </>
    );
};

export default MessageContactForm;