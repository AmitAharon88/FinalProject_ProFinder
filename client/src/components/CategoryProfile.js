import * as React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../App';
import { useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';

const CategoryProfile = ({cat_subcat, getProfileInfo}) => {
    const { category_id, category_name, subcategory_id, subcategory_name, tutor_cat_id } = cat_subcat;
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [openCategory, setOpenCategory] = useState(false);
    const [refreshSubcatId, setRefreshSubcatId] = useState("");
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

    const formRef = useRef();
    const catId = useRef();
    const subId = useRef();

    const params = useParams();

    useEffect(() => {
        catId.current = category_id;
        subId.current = subcategory_id;
        setRefreshSubcatId(subcategory_id);
        getCategories();
        getSubcategories(category_id);
     }, []);

     const getCategories = async () => {
        try {
           const res = await fetch(`/api/subject/categories`);
           const data = await res.json();
           setCategories(data);
        } catch (e) {
           console.log(e);
        };
     };
  
     const handleCategoryChange = (event) => {
        console.log("handle category change: cat_id", event.target.value)
        catId.current = event.target.value
        subId.current = ""
        getSubcategories(event.target.value);
     };
  
     const getSubcategories = async (categoryId) => {
        try {
           const res = await fetch(`/api/subject/subcategories?catid=${categoryId}`);
           const data = await res.json();
           setSubcategories(data);
        } catch (e) {
           console.log(e);
        };
     };

     const handleSubcategoryChange = (event) => {
        console.log('handle subcategory change: subcat_id', event.target.value)
        subId.current = event.target.value
        setRefreshSubcatId(event.target.value)
     };

     const handleClose = () => {
        setOpenCategory(false);
        catId.current = category_id;
        getSubcategories(category_id)
        setRefreshSubcatId(subcategory_id)
        // subId.current = subcategory_id

        console.log('category_id:', category_id)
        console.log('subcategory_id:', subcategory_id)
        console.log('subId_current:', subId.current) // set to the changed subcat this need to be reset
        console.log('refreshSubcarId:', refreshSubcatId)

        setOpenDeleteCategory(false);
     };
  

     const handleOpenCategory = async () => {
        console.log('category_id', catId.current);
        console.log('subcategory_id', subId.current);
        console.log('refreshSubcarId:', refreshSubcatId)
        setOpenCategory(true);
        getCategories();
        subId.current = refreshSubcatId||'';
     };

     const handleCloseAndUpdateCategory = async () => {
        setOpenCategory(false);
        console.log('category_id', catId.current);
        console.log('subcategory_id', subId.current);
        console.log('tutor_cat', tutor_cat_id);
          
        try {
           const response = await fetch(`/api/tutors/${params.id}/profile/catsubcat`, {
             method: 'PATCH',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ 
                category_id: catId.current,
                subcategory_id: subId.current,
                tutor_cat_id: tutor_cat_id
            }),
           });
  
           if (response.ok) {
              getProfileInfo()
            } else {
              console.error('Update failed');
            }
          } catch (error) {
            console.error('Error updating subjects', error);
          }
     };

     const handleOpenDeleteCategory = async () => {
        setOpenDeleteCategory(true);
     };

    const handleCloseAndDeleteCategory = async () => {
        setOpenDeleteCategory(false);
        console.log(tutor_cat_id)
      
        try {
            const response = await fetch(`/api/tutors/${params.id}/profile/catsubcat/delete/${tutor_cat_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
      
            if (response.ok) {
                const res = await response.json();
                console.log('res msg:',res.msg);
                getProfileInfo()

                // setSuccessDeleteMsg(res.msg);
            } else {
                console.error('Delete failed');
                // setErrorMsg("Error deleting your account");
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
            
            
return (
        <>
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: "#71797E"
                    }}
                >
                    {category_name}: {subcategory_name}
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
                    onClick={()=>{
                        console.log('category_id:', category_id)
        console.log('subcategory_id:', subcategory_id)
        console.log('subId_current:', subId.current) // set to the changed subcat this need to be reset
        // setRefreshSubcatId(subcategory_id)
        console.log('refreshSubcarId:', refreshSubcatId)
                        handleOpenCategory();
                    }}
                    sx={{
                        color: "#009688",
                        '&:hover': {
                        color: "#00695f",
                        },
                        mr: 2
                    }}
                />
                <Dialog open={openCategory} onClose={handleClose}>
                    <DialogTitle>Update Subject</DialogTitle>
                    <DialogContent ref={formRef} sx={{dislay: 'flex', flexDirection: 'column' }}>
                            <>
                                <Box
                                    key={tutor_cat_id}
                                    sx={{
                                    display: 'flex'
                                    }}
                                >
                                    <Select
                                        labelId="categoryLabel"
                                        id={`category${tutor_cat_id}`}
                                        label="Subject"
                                        name={`categoryname${tutor_cat_id}`}
                                        value={catId.current}
                                        onChange={(e) => handleCategoryChange(e)}
                                        sx={{
                                            marginRight: 1
                                        }}
                                    >
                                        {categories.length > 0 &&
                                            categories.map(category => {
                                                return (
                                                    <MenuItem key={uuidv4()} value={category.category_id}>{category.category_name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                    <Select
                                        labelId="subcategoryLabel"
                                        id={`subcategory${tutor_cat_id}`}
                                        label="subcategory"
                                        name={`subcategoryname${tutor_cat_id}`}
                                        value={subId.current}
                                        onChange={(e) => handleSubcategoryChange(e)}
                                    >
                                        {subcategories.length > 0 && 
                                            subcategories.map(subcategory => {
                                                return (
                                                    <MenuItem key={uuidv4()} value={subcategory.subcategory_id}>{subcategory.subcategory_name}</MenuItem>
                                                )
                                            }
                                        ) };
                                    </Select>
                                </Box>
                            </>                                          
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
                        onClick={handleCloseAndUpdateCategory}
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

                <HighlightOffIcon
                    onClick={handleOpenDeleteCategory}
                    sx={{
                        color: "#009688",
                        '&:hover': {
                        color: "#00695f",
                        },
                    }}
                />
                <Dialog open={openDeleteCategory} onClose={handleClose}>
                  <DialogTitle>Delete Subject</DialogTitle>
                  <DialogContent>
                     Are you sue you want to delete this subject?
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleClose}>No</Button>
                     <Button 
                        onClick={handleCloseAndDeleteCategory}
                     >
                        Yes, delete
                     </Button>
                  </DialogActions>
               </Dialog>
            </Box>
        </>
    );
};

export default CategoryProfile;