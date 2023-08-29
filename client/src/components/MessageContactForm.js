import { useState, useContext } from 'react';
import { AppContext } from '../App';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const MessageContactForm = ({ tutor_id, student_id, handelFormSubmission }) => {
    const [resMessage, setResMessage] = useState('');
    const [requiredFields, setRequiredFields] = useState(false);
    const [messageSent, setmessageSent] = useState(false);
    const [messageValue, setMessageValue] = useState('');


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

        if (!messageData.message) {
            setRequiredFields(true);
            return; // Stop the submission if the message field is empty
        }

        messageData.tutor_id = tutor_id
        messageData.student_id = student_id
        messageData.sender = `${userFN} ${userLN}`
        console.log(messageData)

        try {
            let url;
            userRole === "students" ? (
               // student id
               url = `/api/students/${userId}/messageboard/write`
            ):(
               // tutor id
               url = `/api/tutors/${userId}/messageboard/write`
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
                setMessageValue(''); // Reset the message field
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
        <Container component="main" maxWidth="xs">
                <Box 
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', // Center vertically
                    }}
                >
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
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                    />
                    {requiredFields ? (
                        <Typography component="p" variant="body1" color="red">
                            * Don't forget to send a message
                        </Typography>
                    ) : null}
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
                {messageSent && (
                    <Typography 
                        component="p"
                        variant="body1"
                        sx = {{
                            color: "#009688"
                        }}
                    >
                        {resMessage}
                    </Typography>
                )}
        </Container> 

    );
};

export default MessageContactForm;