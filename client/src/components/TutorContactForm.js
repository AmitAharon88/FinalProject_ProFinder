import { useParams, Link } from 'react-router-dom';
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

const ContactForm = ({ tutor_id, tutorFN, student_id, studentFN, studentLN }) => {
    const [resMessage, setResMessage] = useState('');
    const [requiredFields, setRequiredFields] = useState(false);
    const [messageSent, setmessageSent] = useState(false);


    const { userFN, setUserFN } = useContext(AppContext);
    const { userLN, setUserLN } = useContext(AppContext);
    const { userId, setUserId } = useContext(AppContext);  


    const params = useParams();
    console.log(`Params: ${params.id}`);

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
            const res = await fetch(`${BASE_URL}/api/tutors/${params.id}/messageboard/write`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            if (res.ok) {
                const response = await res.json();
                console.log(response.msg);
                setResMessage(response.msg);
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
                                            id="message"
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={4}
                                            placeholder={`Hello ${tutorFN} :)`}
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
                            <Typography 
                                component="p"
                                variant="body1"
                                sx = {{
                                    color: "#009688"
                                }}
                            >
                                Don't miss any messaged for your Tutor. Make sure to check out your <Link to={`/${userId}/messageboard`}>Message Board</Link>.
                            </Typography>
                        </Box>
                )}
                    </CardContent>
                </Card>
        </>
    );
};

export default ContactForm;
