import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const MessageContactForm = ({ tutor_id, student_id, handelFormSubmission }) => {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [requiredFields, setRequiredFields] = useState(false);
    const [messageValue, setMessageValue] = useState('');

    const { userFN, setUserFN } = useContext(AppContext);
    const { userLN, setUserLN } = useContext(AppContext);
    const { userId, setUserId } = useContext(AppContext);  
    const { userRole, setUserRole } = useContext(AppContext);

    useEffect(() => {
        // Clear success message after a certain time
        if (successMsg) {
          const timer = setTimeout(() => {
            setSuccessMsg("");
          }, 5000); // Clear after 5 seconds
          return () => clearTimeout(timer); // Clean up the timer if the component unmounts
        }
      }, [successMsg]);

      useEffect(() => {
        // Clear success message after a certain time
        if (errorMsg) {
          const timer = setTimeout(() => {
            setErrorMsg("");
          }, 5000); // Clear after 5 seconds
          return () => clearTimeout(timer); // Clean up the timer if the component unmounts
        }
      }, [errorMsg]);

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
                setSuccessMsg(newMessage.msg);
                setMessageValue(''); // Reset the message field
            } else {
                const errorResponse = await res.json();
                console.log('Error:', errorResponse.msg);
                setErrorMsg('Error sending message')
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
                        <Typography variant="body1" color="red">
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
                {/* {messageSent && (
                    <Typography 
                        variant="body1"
                        sx = {{
                            color: "#009688"
                        }}
                    >
                        {resMessage}
                    </Typography>
                )} */}
                <Box
                    sx={{
                    position: "fixed",
                    bottom: "20px",
                    left: "2vw",
                    width: '80vw'
                    }}
                >
                    <Stack sx={{ width: '60%', marginTop: 2 }}>
                    {successMsg ? (
                        <Alert severity="success">{successMsg}</Alert>
                    ) : (null)}
                    {errorMsg ? (
                        <Alert severity="error">{errorMsg}</Alert>
                        ) : (null)}
                    </Stack>
                </Box>
        </Container> 

    );
};

export default MessageContactForm;