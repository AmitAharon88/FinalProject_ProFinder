import * as React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../App';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CategoryProfile from "./CategoryProfile"
import { v4 as uuidv4 } from 'uuid';

import CategoryInputField from "./CategoryInputField"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Profile = () => {
   const [userInfo, setUserInfo] = useState({});
   const [updatedFirstName, setUpdatedFirstName] = useState("");
   const [updatedLastName, setUpdatedLastName] = useState("");
   const [updatedEmail, setUpdatedEmail] = useState("");
   const [updatedDate, setUpdatedDate] = useState("");
   const [location, setLocation] = useState([]);
   const [updatedLocationId, setUpdatedLocationId] = useState("");
   const [updatedEducation, setUpdatedEducation] = useState("");
   const [updatedAbout, setUpdatedAbout] = useState("");
   // const [updatedCatSubcat, setUpdatedCatSubcat] = useState([]);
   const [updatedPassword, setUpdatedPassword] = useState("");
   const [successMsg, setSuccessMsg] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
   // const[categories, setCategories] = useState([]);
   // const [updatedCategoryId, setUpdatedCategoryId] = useState("");
   // const [updatedSubcategoryId, setUpdatedSubcategoryId] = useState("");
   // const [subcategories, setSubcategories] = useState([]);



   const [openName, setOpenName] = useState(false);
   const [openEmail, setOpenEmail] = useState(false);
   const [openDate, setOpenDate] = useState(false);
   const [openLocation, setOpenLocation] = useState(false);
   const [openEducation, setOpenEducation] = useState(false);
   const [openAbout, setOpenAbout] = useState(false);
   // const [openCategory, setOpenCategory] = useState(false);
   const [openPassword, setOpenPassword] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);

   const { userRole, setUserRole } = useContext(AppContext);
   const { userFN, setUserFN } = useContext(AppContext);
   const { userLN, setUserLN } = useContext(AppContext);
   const {isAuthenticated, setIsAuthenticated} = useContext(AppContext);
   const { successDeleteMsg, setSuccessDeleteMsg } = useContext(AppContext);

   const formRef = useRef();

   const params = useParams();

   const navigate = useNavigate();

   useEffect(() => {
      getProfileInfo()
      getLocation()
      // getCategories()
   }, []);

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

   const getProfileInfo = async () => {
         try {
            const res = await fetch(`/api/${userRole}/${params.id}/profile`);
            const data = await res.json();
            // console.log('data:', data);

            if (userRole === 'tutors') {
               const tutorObj = {}

               data.forEach(row => {
                  const {
                     tutor_id,
                     first_name,
                     last_name,
                     email,
                     birth_date,
                     education,
                     about,
                     location_name,
                     location_id,
                     category_name,
                     category_id,
                     subcategory_name,
                     subcategory_id,
                     tutor_cat_id
                  } = row;

                  if (tutorObj[tutor_id]) {
                     // Tutor already exists in the object, append category and subcategory
                     tutorObj[tutor_id].cat_subcat.push({category_id: category_id, category_name: category_name, subcategory_id: subcategory_id, subcategory_name: subcategory_name, tutor_cat_id: tutor_cat_id});
                  } else {
                     // Create a new tutor object and initialize categories and subcategories arrays
                     tutorObj[tutor_id] = {
                     tutor_id,
                     first_name,
                     last_name,
                     email,
                     birth_date,
                     education,
                     about,
                     location_name,
                     location_id,
                     cat_subcat: [{category_id: category_id, category_name: category_name, subcategory_id: subcategory_id, subcategory_name: subcategory_name, tutor_cat_id: tutor_cat_id}],
                     };
                  }
               });

               const tutorArray = Object.values(tutorObj);

               const transformedBirthData = new Date(tutorArray[0].birth_date);
               const formattedBirthDate = formatDate(transformedBirthData)
               setUserInfo({...tutorArray[0], birth_date: formattedBirthDate})
               setUpdatedLocationId(tutorArray[0].location_id)
               setUpdatedAbout(tutorArray[0].about)
               // setUpdatedCatSubcat(tutorArray[0].cat_subcat)                  
            } else { // IF USER IS A STUDENT
               const transformedBirthData = new Date(data[0].birth_date);
               const formattedBirthDate = formatDate(transformedBirthData)
               setUserInfo({...data[0], birth_date: formattedBirthDate})
               setUpdatedLocationId(data[0].location_id)
            }

         } catch (e) {
            console.log(e);
         };
      };
   
   console.log('userInfor:', userInfo)

   const formatDate = (date) => {
      if (date) {
         const options = { year: 'numeric', month: 'long', day: 'numeric' };
         return date.toLocaleDateString(undefined, options);
      }
      return "";
   };

   const getLocation = async () => {
      try {
          const res = await fetch(`/api/location`);
          const data = await res.json();
          setLocation(data);
      } catch (e) {
          console.log(e);
      };
   };

   const handleClose = () => {
      setOpenName(false);
      setOpenEmail(false);
      setOpenDate(false);
      setOpenLocation(false);
      setUpdatedLocationId(userInfo.location_id);
      setOpenEducation(false);
      setOpenAbout(false);
      setUpdatedAbout(userInfo.about);
      setOpenPassword(false);
      setOpenDelete(false);
   };

   const handleOpenName = async () => {
      setOpenName(true);
   };

   const handleCloseAndUpdateName = async () => {
      setOpenName(false);
      setUserFN(updatedFirstName);
      setUserLN(updatedLastName);

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/name`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ first_name: updatedFirstName, last_name: updatedLastName }),
         });

         if (response.ok) {
            const res = await response.json();
            setUserInfo({
              ...userInfo,
              first_name: updatedFirstName,
              last_name: updatedLastName,
            });
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg('Error updating your name')
          }
        } catch (error) {
          console.error('Error updating your name:', error);
        }
   };

   const handleOpenEmail = async () => {
      setOpenEmail(true);
   };

   const handleCloseAndUpdateEmail = async () => {
      setOpenEmail(false);

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/email`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ email: updatedEmail }),
         });

         if (response.ok) {
            const res = await response.json();
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              email: updatedEmail,
            }));
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg('Error updating your email')
          }
        } catch (error) {
          console.error('Error updating email:', error);
        }
   };

   const handleOpenDate = async () => {
      setOpenDate(true);
   };

   const handleCloseAndUpdateDate = async () => {
      setOpenDate(false);
      //convert date to insert into db
      const parsedDate = new Date(updatedDate);
      const isoDate = `${parsedDate.getFullYear()}-${parsedDate.getMonth() + 1}-${parsedDate.getDate()}`;

      console.log(isoDate)

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/date`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ birth_date: isoDate }),
         });
         if (response.ok) {
            const res = await response.json();
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              birth_date: formatDate(updatedDate),
            }));
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg('Error updating your date of birth')
          }
        } catch (error) {
          console.error('Error updating birth date:', error);
        }
   };

   const handleOpenLocation = async () => {
      setOpenLocation(true);
   };

   const handleCloseAndUpdateLocation = async () => {
      setOpenLocation(false);
      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/location`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ location_id: updatedLocationId }),
         });

         if (response.ok) {
            const res = await response.json();
            const matchingLocation = location.find(loc => 
               loc.location_id === updatedLocationId);
               console.log(matchingLocation)
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              location_id: updatedLocationId,
              location_name: matchingLocation.location_name
            }));
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg('Error updating your location')
          }
        } catch (error) {
          console.error('Error updating location:', error);
        }
   };

   const handleOpenEducation = async () => {
      setOpenEducation(true);
   };

   const handleCloseAndUpdateEducation = async () => {
      setOpenEducation(false);

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/education`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ education: updatedEducation }),
         });

         if (response.ok) {
            const res = await response.json();
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              education: updatedEducation,
            }));
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg('Error updating your education')
          }
        } catch (error) {
          console.error('Error updating education:', error);
        }
   };

   const handleOpenAbout = async () => {
      setOpenAbout(true);
   };

   const handleCloseAndUpdateAbout = async () => {
      setOpenAbout(false);

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/about`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ about: updatedAbout }),
         });

         if (response.ok) {
            const res = await response.json();
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              about: updatedAbout,
            }));
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg('Error updating your about section')
          }
        } catch (error) {
          console.error('Error updating about section:', error);
        }
   };

   // const handleOpenCategory = async () => {
   //    setOpenCategory(true);
   //    getCategories();
   // };

   // const handleCloseAndUpdateCategory = async () => {
   //    setOpenAbout(false);
   //    // Refresh Id's
   //    setUpdatedCategoryId("");
   //    setUpdatedSubcategoryId("");

      // try {
      //    const response = await fetch(`/api/${userRole}/${params.id}/profile/category`, {
      //      method: 'PATCH',
      //      headers: {
      //        'Content-Type': 'application/json',
      //      },
      //      body: JSON.stringify({  }),
      //    });

      //    if (response.ok) {
      //       setUserInfo((prevInfo) => ({
      //         ...prevInfo,
      //         about: updatedAbout,
      //       }));
      //     } else {
      //       console.error('Update failed');
      //     }
      //   } catch (error) {
      //     console.error('Error updating about section:', error);
      //   }
   // };

   const handleOpenPassword = async () => {
      setOpenPassword(true);
   };

   const handleCloseAndUpdatePassword = async () => {
      setOpenPassword(false);

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/profile/password`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ password: updatedPassword }),
         });

         if (response.ok) {
            const res = await response.json();
            setSuccessMsg(res.msg);
          } else {
            console.error('Update failed');
            setErrorMsg("Error updating your password");
          }
        } catch (error) {
          console.error('Error updating password:', error);
        }
   };

   const handleOpenDelete = async () => {
      setOpenDelete(true);
   };
      
   const handleCloseAndDeleteAccount = async()  => {
      setOpenDelete(false);

      try {
         const response = await fetch(`/api/${userRole}/${params.id}/delete`, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
           },
         });

         if (response.ok) {
            const res = await response.json();
            console.log('res msg:',res.msg)
            setSuccessDeleteMsg(res.msg);
            setIsAuthenticated(false);
            navigate('/register');
          } else {
            console.error('Delete failed');
            setErrorMsg("Error deleting your account");
          }
        } catch (error) {
          console.error('Error deleting account:', error);
        }
   };
   
    return (
       <>
         <Box
            sx= {{
               display: "flex",
               justifyContent: "center",
               m: 4
            }}
         >
            <Typography
               variant="h2"
               fontWeight="bold"
               sx={{
                  color: "#71797E"
               }}
            >
               Manage your Profile
            </Typography>
         </Box>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center", // Center vertically
            }}
         >
            <Card
               sx={{
                  width: "80vw",
                  margin: 1,
               }}
            >
               <CardActionArea>
                     <CardContent
                        sx={{
                           display: "flex",   // Add this line to use flex display
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center"
                        }}
                     >
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mb: 1
                           }}
                        >
                           Profile Picture:
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                        }}
                     >
                        <CardMedia
                           component="img"
                           sx={{
                              width: 200, // Adjust the size as needed
                              height: 200,
                              borderRadius: '50%',
                           }}
                           image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
                           alt="profile image"
                        />
                     </Box>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: 1

                        }}
                     >
                        <EditIcon
                           sx={{
                              color: "#009688",
                              '&:hover': {
                                 color: "#00695f",
                              },
                           }}
                        />
                     </Box>
               </CardActionArea>
            </Card>
            <Card
               sx={{
                  width: "80vw",
                  margin:1
               }}
            >
               <CardActionArea>
                     <CardContent
                        sx={{
                           display: "flex",   // Add this line to use flex display
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center"
                        }}
                     >
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mb: 1
                           }}
                        >
                           Name:
                        </Typography>
                        <Typography
                           variant="h6"
                           sx={{
                              color: "#71797E"
                           }}
                        >
                           {userInfo.first_name} {userInfo.last_name}
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: 1

                        }}
                     >
                        <EditIcon
                           sx={{
                              color: "#009688",
                              '&:hover': {
                                 color: "#00695f",
                              },
                           }}
                           onClick={handleOpenName}
                        />
                        <Dialog open={openName} onClose={handleClose}>
                           <DialogTitle>Update Name</DialogTitle>
                           <DialogContent ref={formRef}>
                              <TextField
                                 autoFocus
                                 margin="dense"
                                 id="first_name"
                                 label="First name"
                                 name="first_name"
                                 fullWidth
                                 variant="standard"
                                 placeholder=
                                       {userInfo.first_name}
                                   
                                 onChange={(e) => setUpdatedFirstName(e.target.value)}
                              />
                              <TextField
                                 autoFocus
                                 margin="dense"
                                 id="last_name"
                                 label="Last name"
                                 name="last_name"
                                 fullWidth
                                 variant="standard"
                                 placeholder= {userInfo.last_name}
                                 onChange={(e) => setUpdatedLastName(e.target.value)}
                              />
                           </DialogContent>
                           <DialogActions>
                              <Button 
                                 onClick={handleClose}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 onClick={handleCloseAndUpdateName}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Update
                              </Button>
                           </DialogActions>
                           </Dialog>
                  </Box>
               </CardActionArea>
            </Card>
            <Card
               sx={{
                  width: "80vw",
                  margin:1
               }}
            >
               <CardActionArea>
                     <CardContent
                        sx={{
                           display: "flex",   // Add this line to use flex display
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center"
                        }}
                     >
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mb: 1
                           }}
                        >
                           Email:
                        </Typography>
                        <Typography
                           variant="h6"
                           sx={{
                              color: "#71797E"
                           }}
                        >
                           {userInfo.email}
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: 1

                        }}
                     >
                        <EditIcon
                           onClick={handleOpenEmail}
                           sx={{
                              color: "#009688",
                              '&:hover': {
                                 color: "#00695f",
                              },
                           }}
                        />
                        <Dialog open={openEmail} onClose={handleClose}>
                           <DialogTitle>Update Email</DialogTitle>
                           <DialogContent ref={formRef}>
                              <TextField
                                 autoFocus
                                 margin="dense"
                                 id="email"
                                 label="email"
                                 name="email"
                                 type="email"
                                 fullWidth
                                 variant="standard"
                                 placeholder={userInfo.email}
                                 onChange={(e) => setUpdatedEmail(e.target.value)}
                              />
                           </DialogContent>
                           <DialogActions>
                              <Button
                                 onClick={handleClose}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 onClick={handleCloseAndUpdateEmail}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Update
                              </Button>
                           </DialogActions>
                           </Dialog>
                  </Box>
               </CardActionArea>
            </Card>
            <Card
               sx={{
                  width: "80vw",
                  margin:1
               }}
            >
               <CardActionArea>
                     <CardContent
                        sx={{
                           display: "flex",   // Add this line to use flex display
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center"
                        }}
                     >
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mb: 1
                           }}
                        >
                           Date of Birth:
                        </Typography>
                        <Typography
                           variant="h6"
                           sx={{
                              color: "#71797E"
                           }}
                        >
                           {userInfo.birth_date}
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: 1

                        }}
                     >
                        <EditIcon
                           onClick={handleOpenDate}
                           sx={{
                              color: "#009688",
                              '&:hover': {
                                 color: "#00695f",
                              },
                           }}
                        />
                        <Dialog open={openDate} onClose={handleClose}>
                           <DialogTitle>Update Date of Birth</DialogTitle>
                           <DialogContent ref={formRef}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DemoContainer components={["DateField"]} sx={{ mt:1 }} >
                                    <DatePicker
                                       name="birth_day"
                                       label="Date of birth"
                                       onChange={(newValue) => setUpdatedDate(newValue.$d)}
                                       slotProps={{ textField: { variant: "outlined" } }}
                                       disableFuture
                                    />
                                 </DemoContainer>
                              </LocalizationProvider>  
                           </DialogContent>
                           <DialogActions>
                              <Button
                                 onClick={handleClose}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 onClick={handleCloseAndUpdateDate}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Update
                              </Button>
                           </DialogActions>
                           </Dialog>
                     </Box>
               </CardActionArea>
            </Card>
            <Card
               sx={{
                  width: "80vw",
                  margin:1
               }}
            >
               <CardActionArea>
                     <CardContent
                        sx={{
                           display: "flex",   // Add this line to use flex display
                           flexDirection: "column",
                           alignItems: "center",
                           justifyContent: "center"
                        }}
                     >
                        <Typography
                           variant="body1"
                           sx={{
                              color: "#71797E",
                              mb: 1
                           }}
                        >
                           Location:
                        </Typography>
                        <Typography
                           variant="h6"
                           sx={{
                              color: "#71797E"
                           }}
                        >
                           {userInfo.location_name}
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: 1

                        }}
                     >
                        <EditIcon
                           onClick={handleOpenLocation}
                           sx={{
                              color: "#009688",
                              '&:hover': {
                                 color: "#00695f",
                              },
                           }}
                        />
                        <Dialog open={openLocation} onClose={handleClose}>
                           <DialogTitle>Update Location</DialogTitle>
                           <DialogContent ref={formRef}>
                              <InputLabel id="locationLabel">Location</InputLabel>
                                 <Select
                                    labelId="locationLabel"
                                    id="location"
                                    label="Location"
                                    name="location_id"
                                    value={updatedLocationId}
                                    onChange={(e) => setUpdatedLocationId(e.target.value)}
                                 >
                                    {location.map(item => {
                                       return (
                                          <MenuItem key= {item.location_id} value={item.location_id}>{item.location_name}</MenuItem>
                                       )
                                    })}
                                 </Select>
                           </DialogContent>
                           <DialogActions>
                              <Button
                                 onClick={handleClose}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 onClick={handleCloseAndUpdateLocation}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Update
                              </Button>
                           </DialogActions>
                           </Dialog>
                     </Box>
               </CardActionArea>
            </Card>
            {userRole === "tutors" && (
               <>
                  <Card
                     sx={{
                        width: "80vw",
                        margin:1
                     }}
                  >
                     <CardActionArea>
                        <CardContent
                           sx={{
                              display: "flex",   // Add this line to use flex display
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center"
                           }}
                        >
                           <Typography
                              variant="body1"
                              sx={{
                                 color: "#71797E",
                                 mb: 1
                              }}
                           >
                              Education:
                           </Typography>
                           <Typography
                              variant="h6"
                              sx={{
                                 color: "#71797E"
                              }}
                           >
                              {userInfo.education}
                           </Typography>
                        </CardContent>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              padding: 1

                           }}
                        >
                           <EditIcon
                              onClick={handleOpenEducation}
                              sx={{
                                 color: "#009688",
                                 '&:hover': {
                                    color: "#00695f",
                                 },
                              }}
                           />
                           <Dialog open={openEducation} onClose={handleClose}>
                              <DialogTitle>Update Education</DialogTitle>
                              <DialogContent ref={formRef}>
                                 <TextField
                                    autoFocus
                                    margin="dense"
                                    id="education"
                                    label="education"
                                    name="education"
                                    fullWidth
                                    variant="standard"
                                    placeholder={userInfo.education}
                                    onChange={(e) => setUpdatedEducation(e.target.value)}
                                 />
                              </DialogContent>
                              <DialogActions>
                                 <Button
                                    onClick={handleClose}
                                    sx={{
                                       color: "#009688",
                                       '&:hover': {
                                          color: "#00695f",
                                       },
                                    }}
                                 >
                                    Cancel
                                 </Button>
                                 <Button
                                    onClick={handleCloseAndUpdateEducation}
                                    sx={{
                                       color: "#009688",
                                       '&:hover': {
                                          color: "#00695f",
                                       },
                                    }}
                                 >
                                    Update
                                 </Button>
                              </DialogActions>
                              </Dialog>
                        </Box>
                     </CardActionArea>
                  </Card>
                  <Card
                  sx={{
                     width: "80vw",
                     margin:1
                  }}
                  >
                     <CardActionArea>
                        <CardContent
                           sx={{
                              display: "flex",   // Add this line to use flex display
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center"
                           }}
                        >
                           <Typography
                              variant="body1"
                              sx={{
                                 color: "#71797E",
                                 mb: 1
                              }}
                           >
                              About Me:
                           </Typography>
                           <Typography
                              variant="h6"
                              sx={{
                                 color: "#71797E"
                              }}
                           >
                              {userInfo.about}
                           </Typography>
                        </CardContent>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              padding: 1
                           }}
                        >
                           <EditIcon
                              onClick={handleOpenAbout}
                              sx={{
                                 color: "#009688",
                                 '&:hover': {
                                    color: "#00695f",
                                 },
                              }}
                           />
                           <Dialog open={openAbout} onClose={handleClose}>
                              <DialogTitle>Update About</DialogTitle>
                              <DialogContent ref={formRef}>
                                 <TextareaAutosize
                                    autoFocus
                                    // margin="dense"
                                    minRows={3} // Set the initial number of rows
                                    id="about"
                                    label="about"
                                    name="about"
                                    fullWidth
                                    // variant="standard"
                                    sx={{
                                       width: '100%', // Set the width of the textarea
                                       padding: '8px', // Add padding for better appearance
                                       resize: 'vertical', // Allow vertical resizing
                                    }}
                                    value={updatedAbout}
                                    onChange={(e) => setUpdatedAbout(e.target.value)}
                                 />
                              </DialogContent>
                              <DialogActions>
                                 <Button
                                    onClick={handleClose}
                                    sx={{
                                       color: "#009688",
                                       '&:hover': {
                                          color: "#00695f",
                                       },
                                    }}
                                 >
                                    Cancel
                                 </Button>
                                 <Button
                                    onClick={handleCloseAndUpdateAbout}
                                    sx={{
                                       color: "#009688",
                                       '&:hover': {
                                          color: "#00695f",
                                       },
                                    }}
                                 >
                                    Update
                                 </Button>
                              </DialogActions>
                              </Dialog>
                        </Box>
                     </CardActionArea>
                  </Card>
                  <Card
                  sx={{
                     width: "80vw",
                     margin:1
                  }}
                  >
                     <CardActionArea>
                        <CardContent
                           sx={{
                              display: "flex",   // Add this line to use flex display
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center"
                           }}
                        >
                           <Typography
                              variant="body1"
                              sx={{
                                 color: "#71797E",
                                 mb: 1
                              }}
                           >
                              Tutoring Subjects:
                           </Typography>
                           </CardContent>
                           {userInfo.cat_subcat ? (
                              userInfo.cat_subcat.map((cat_subcat) => (
                                 <CategoryProfile key={uuidv4()} cat_subcat={cat_subcat} getProfileInfo={getProfileInfo}/>
                              )) 
                           ) : (null) }
                     </CardActionArea>
                  </Card>
               </>
            )}
            <Card
               sx={{
                  width: "80vw",
                  margin:1
               }}
            >
               <CardActionArea>
                     <CardContent
                        sx={{
                           display: "flex",   // Add this line to use flex display
                           justifyContent: "center"
                        }}
                     >
                        <Typography
                           variant="h6"
                           sx={{
                              color: "#71797E"
                           }}
                        >
                           Set new password
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           padding: 1

                        }}
                     >
                        <EditIcon
                           onClick={handleOpenPassword}
                           sx={{
                              color: "#009688",
                              '&:hover': {
                                 color: "#00695f",
                              },
                           }}
                        />
                        <Dialog open={openPassword} onClose={handleClose}>
                           <DialogTitle>Update Password</DialogTitle>
                           <DialogContent ref={formRef}>
                              <TextField
                                 autoFocus
                                 margin="dense"
                                 id="password"
                                 label="password"
                                 name="password"
                                 type="password"
                                 fullWidth
                                 variant="standard"
                                 onChange={(e) => setUpdatedPassword(e.target.value)}
                              />
                           </DialogContent>
                           <DialogActions>
                              <Button
                                 onClick={handleClose}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 onClick={handleCloseAndUpdatePassword}
                                 sx={{
                                    color: "#009688",
                                    '&:hover': {
                                       color: "#00695f",
                                    },
                                 }}
                              >
                                 Update
                              </Button>
                           </DialogActions>
                           </Dialog>
                  </Box>
               </CardActionArea>
            </Card>
            <Button
               type="submit"
               variant="contained"
               sx={{
                  mt: 3, 
                  mb: 2, 
                  bgcolor: "#7A1300",
                  '&:hover': {
                     bgcolor: "#C41E00",
                  },
               }}
               onClick={handleOpenDelete}
            >
               Delete Account
            </Button>
               <Dialog open={openDelete} onClose={handleClose}>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogContent>
                     Are you sue you want to delete your account?
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleClose}>No</Button>
                     <Button 
                        onClick={handleCloseAndDeleteAccount}
                     >
                        Yes, delete
                     </Button>
                  </DialogActions>
               </Dialog>
         </Box>
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
       </>
    );
};
    
export default Profile;