import * as React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../App';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const CategoryProfile = (cat_subcat) => {
    const { category_id, category_name, subcategory_id, subcategory_name, tutor_cat_id } = cat_subcat.cat_subcat;

    const[categories, setCategories] = useState([]);
    const [updatedCategoryId, setUpdatedCategoryId] = useState("");
    const [updatedSubcategoryId, setUpdatedSubcategoryId] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [openCategory, setOpenCategory] = useState(false);

    const formRef = useRef();

    useEffect(() => {
        getCategories()
        getSubcategories(category_id)
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
        console.log('handle category change: cat_id', event.target.value)
        setUpdatedCategoryId(event.target.value);
        getSubcategories(event.target.value);
     };
  
     const getSubcategories = async (categoryId) => {
        try {
           const res = await fetch(`/api/subject/subcategories?catid=${categoryId}`);
           const data = await res.json();
           setSubcategories(data);
           console.log('subcategories:', data);
        } catch (e) {
           console.log(e);
        };
     };
  
     const handleSubcategoryChange = (event) => {
        setUpdatedSubcategoryId(event.target.value);
     };

     const handleClose = () => {
        setOpenCategory(false);
        setUpdatedCategoryId("");
        setUpdatedSubcategoryId("");
     };

     const handleOpenCategory = async () => {
        setOpenCategory(true);
        getCategories();
     };
  
     const handleCloseAndUpdateCategory = async () => {
        setOpenCategory(false);
        // Refresh Id's
        setUpdatedCategoryId("");
        setUpdatedSubcategoryId("");

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
     };
return (
    // userInfo.userInfo.cat_subcat ? userInfo.userInfo.cat_subcat.map(cat_subcat => {
        <>
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography
                    component="h6"
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
                    onClick={handleOpenCategory}
                    sx={{
                        color: "#009688",
                        '&:hover': {
                        color: "#00695f",
                        },
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
                                        value={updatedCategoryId || category_id}
                                        onChange={(e) => handleCategoryChange(e)}
                                        sx={{
                                            marginRight: 1
                                        }}
                                    >
                                        {categories ? (
                                            categories.map(category => {
                                                return (
                                                    <MenuItem key= {category.category_id} value={category.category_id}>{category.category_name}</MenuItem>
                                                )
                                            })
                                        ) : (null) }
                                    </Select>
                                    <Select
                                        labelId="subcategoryLabel"
                                        id={`subcategory${tutor_cat_id}`}
                                        label="subcategory"
                                        name={`subcategoryname${tutor_cat_id}`}
                                        value={updatedSubcategoryId || subcategory_id}
                                        onChange={(e) => handleSubcategoryChange(e)}
                                    >
                                        {subcategories ? (
                                            subcategories.map(subcategory => {
                                                return (
                                                    <MenuItem key= {subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategory_name}</MenuItem>
                                                )
                                            })
                                        ) : (null) };
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
            </Box>
        </>
    );
};
export default CategoryProfile;