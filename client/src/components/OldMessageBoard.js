import { setState, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import MessageContactForm from './MessageContactForm';
import Button from '@mui/material/Button';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MessageBoard = () => {
   const [messages, setMessages] = useState([]);
   const[showContactForm, setShowContactForm] = useState(false);


   const { userRole, setUserRole } = useContext(AppContext);

   // const { userFN, setUserFN } = useContext(AppContext);
   // const { userLN, setUserLN } = useContext(AppContext); 
   const { userId, setUserId } = useContext(AppContext);
 

   const params = useParams();

   useEffect(() => {
      getContactMessages()
   }, []);

   const getContactMessages = async () => {
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
            const transformedData = data.map((message) => ({
               ...message,
               message_date: new Date(message.message_date),
            }));
            setMessages(transformedData)
            console.log(transformedData)
         } catch (e) {
            console.log(e);
         };
   };

   const formatDate = (date) => {
      if (date) {
         const options = { year: 'numeric', month: 'long', day: 'numeric' };
         return date.toLocaleDateString(undefined, options);
      }
      return "";
   };

   const handleAddContactForm = () => {
      setShowContactForm(true);
   }

   const handelFormSubmission = (newReview) => {
      // Update reviews state with the new review
      setMessages([...messages, newReview]);
      // Fetch reviews again to ensure you have the latest data
      getContactMessages();
   };

    return (
      <Box 
         key={1}
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            marginTop: 5
         }}
      >
         <Card
            sx={{
               width: "80vw",
            }}
         >
            <CardContent>
               {messages.length > 0 ? (
                  messages.map((message, message_board_id) => {
                     return (
                        <Box
                           key={message_board_id}
                        >
                           <Typography
                              component="p"
                              variant="body1"
                              sx={{
                                 color: "#71797E"
                              }}        
                           >
                              {message.sender}
                           </Typography>
                           <Typography
                              component="p"
                              variant="body1"
                              marginTop={1}
                              sx={{
                                 color: "#71797E"
                              }}       
                           >
                              {message.message}
                           </Typography>
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'row-reverse',
                                 mt: 1
                              }}
                           >
                              <Typography
                                 component="p"
                                 variant="body1"
                                 sx={{
                                    color: "#71797E"
                                 }}
                              >
                                 {formatDate(message.message_date)}
                              </Typography>
                           </Box>
                           <Divider 
                              sx= {{mt: 2, mb: 2}}
                           />
                           {userRole === "students" && (
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
                               onClick={handleAddContactForm}
                            >
                               Respond
                            </Button>
                           )}
                           {showContactForm && 
                              userRole === "students" ? (
                                 <MessageContactForm tutor_id={message.tutor_id} student_id={userId} handelFormSubmission={handelFormSubmission} />
                              ) : (
                                 null
                                 //  <ContactForm tutor_id={userId} recipientFN={} student_id={} />

                           )}
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
               
            </CardContent>
         </Card>
      </Box>
    );
};   

    
export default MessageBoard;