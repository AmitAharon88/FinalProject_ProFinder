import { useParams, Link } from 'react-router-dom';
import { setState, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const MessageBoard = () => {

    const [messageBoard, setMessageBoard] = useState([]);
    const [contacts, setContacts] = useState([]);

    const { userRole, setUserRole } = useContext(AppContext);
    const { userId, setUserId } = useContext(AppContext);
    // const { userFN, setUserFN } = useContext(AppContext);
    // const { userLN, setUserLN } = useContext(AppContext); 
 
    const params = useParams();
    
    useEffect(() => {
        getMessageBoard()
    }, []);

    const getMessageBoard = async () => {
            try {
                let url;
                userRole === "students" ? (
                // the params.id is the student id
                url = `${BASE_URL}/api/students/${params.id}/messageboard`
                ):(
                // the params.id is the tutor id
                url = `${BASE_URL}/api/tutors/${params.id}/messageboard`
                )

                const res = await fetch(url);
                const data = await res.json();
                console.log(data)
                setMessageBoard(data)
                handelData(data)
            } catch (e) {
                console.log(e);
            };
    };

    const handelData = (data) => {
        const uniqueContacts = new Set(data.map(contact => `${contact.first_name} ${contact.last_name} ${contact.tutor_id}`));
        console.log(uniqueContacts)
                // const uniqueContacts = new Set(data.map(contact => `${contact.first_name} ${contact.last_name} ${contact.tutor_id}`));
                // const uniqueContacts = new Set(data.map(contact => contact));
        const uniqueContactsArray = Array.from(uniqueContacts);
        const contactsData = uniqueContactsArray.map(contact => {
            const [firstName, lastName, contactId] = contact.split(' '); // Split the string by space
            return {
                firstName,
                lastName,
                contactId
            };
        })

        setContacts(contactsData);
        console.log(contactsData)
    }

    // const handelClick = (contact_id) => {
        
    // }

   console.log(contacts)

    return (
        <Box>
            <Typography
                component="h2"
                variant="h2"
                sx={{
                    color: "#71797E"
                }}        
            >
                Message Board
            </Typography>
            {contacts.length > 0 ? (
                contacts.map((contact, i) => {
                    return (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center", 
                                justifyContent: "center",
                                marginTop: 5
                            }}
                        >
                            <Typography
                                component="p"
                                variant="bosy1"
                                sx={{
                                    color: "#71797E"
                                }}        
                            >
                                Click to message
                            </Typography>


                            <Link to={`/${params.id}/messageboard/${contact.contactId}`}>
                                <Button
                                    type="submit"
                                    // fullWidth
                                    variant="outlined"
                                    sx={{
                                        // width: "80vw",
                                        mt: 3, 
                                        mb: 2, 
                                        bgcolor: "#009688",
                                        '&:hover': {
                                            bgcolor: "#00695f",
                                        },
                                    }}
                                >
                                    {contact.firstName} {contact.lastName}
                                </Button>
                            </Link>
                        </Box>
                    )
                })
            ) : (
                <Typography
                     component="p"
                     variant="body1"
                     sx={{
                        color: "#71797E"
                     }}        
                  >
                     No messages found.
                  </Typography>
            )}
        </Box>
    );
};

export default MessageBoard;