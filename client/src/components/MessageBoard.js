import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MessageBoard = () => {

    const [messageBoard, setMessageBoard] = useState([]);
    // const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const { userRole, setUserRole } = useContext(AppContext);
    const { userId, setUserId } = useContext(AppContext);
    // const { userFN, setUserFN } = useContext(AppContext);
    // const { userLN, setUserLN } = useContext(AppContext); 
 
    const contacts = useRef()

    const params = useParams();
    
    useEffect(() => {
        getMessageBoard()
    }, []);

    const getMessageBoard = async () => {
            try {
                let url;
                userRole === "students" ? (
                // the params.id is the student id
                url = `/api/students/${params.id}/messageboard`
                ):(
                // the params.id is the tutor id
                url = `/api/tutors/${params.id}/messageboard`
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
        let uniqueContacts = new Set();

        if (userRole === "students") {
            uniqueContacts = new Set(data.map(contact => `${contact.first_name} ${contact.last_name} ${contact.tutor_id}`));
        } else {
            uniqueContacts = new Set(data.map(contact => `${contact.first_name} ${contact.last_name} ${contact.student_id}`));
        };
        console.log(uniqueContacts);
        const uniqueContactsArray = Array.from(uniqueContacts);
        const contactsData = uniqueContactsArray.map(contact => {
            const [firstName, lastName, contactId] = contact.split(' '); // Split the string by space
                return {
                    firstName,
                    lastName,
                    contactId
                };
        })
        contacts.current =contactsData;
        setFilteredContacts(contactsData)
        console.log(contactsData);
    };

    console.log(contacts)
    const onSearchChange = (event) => {
        event.preventDefault();
        const searchInput= event.target.value;
        console.log(searchInput)
        
        const filteredContacts = contacts.current.filter(contact =>{
            const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
            return fullName.toLowerCase().includes(searchInput.toLowerCase());
        });

        setFilteredContacts(filteredContacts); // Update the state with the filtered tutors
    };

    return (
        <Box
            sx= {{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Box
                sx= {{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Typography
                    component="h2"
                    variant="h2"
                    sx={{
                        color: "#71797E",
                        fontWeight: "bold",
                        mt: 4,
                        mb: 5
                    }}        
                >
                    Message Board
                </Typography>
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    mb: 2,
                }}
            noValidate
            autoComplete="off"
         >
            {/* <Typography
                component="h5"
                variant="h5"
                sx={{
                    color: "#71797E",
                    mt: 4
                }}        
            >
                Contacts
            </Typography> */}
            <TextField id="outlined-basic" name="messageSearch" label="Search by contact name" variant="outlined" onChange={onSearchChange}  />
         </Box>
         <Box        
            sx={{
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, i) => {
                    return (
                            <Link to={`/${params.id}/messageboard/${contact.contactId}`}>
                                <Button
                                    key={i}
                                    type="submit"
                                    variant="outlined"
                                    sx={{
                                        // width: "80vw",
                                        m: 1, 
                                        flexWrap: "wrap",
                                        color: "#00695f",
                                        bgcolor: "#FFFFFF",
                                        borderColor: "#00695f",
                                        '&:hover': {
                                            color: "#FFFFFF",
                                            bgcolor: "#00695f",
                                            borderColor: "#00695f",
                                        },
                                    }}
                                >
                                    {contact.firstName} {contact.lastName}
                                </Button>
                            </Link>
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
        </Box>
    );
};

export default MessageBoard;