import { useParams } from 'react-router-dom';
import { setState, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const MessageBoard = () => {

    const [messageBoard, setMessageBoard] = useState([]);

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
            console.log(`fetched data: ${JSON.stringify(data)}`);
            // const transformedData = data.map((message) => ({
            //    ...message,
            //    message_date: new Date(message.message_date),
            // }));
            setMessageBoard(data)
            console.log(data)
         } catch (e) {
            console.log(e);
         };
   };

    return (
        <>
            <h1>Hello</h1>
            {messageBoard > 0 ? (
                messageBoard.map((contact, contactFN) => {
                    return (
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
                        >
                            {contact.first_name}
                        </Button>
                    )
                 }))
            ): (
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
        </>
    );
};

export default MessageBoard