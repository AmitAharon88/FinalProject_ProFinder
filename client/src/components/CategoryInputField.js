import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const CategoryInputField = ({setCat_SubcatObj}) => {
    const[categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        getCategories();
   }, []);

    const getCategories = async () => {
        try {
            const res = await fetch(`/api/subject/categories`);
            const data = await res.json();
            console.log(data);
            setCategories(data);
        } catch (e) {
            console.log(e);
        };
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        getSubcategories(event.target.value);
    };

    const getSubcategories = async (categoryId) => {
        try {
            const res = await fetch(`/api/subject/subcategories?catid=${categoryId}`);
            const data = await res.json();
            console.log(data);
            setSubcategories(data);
        } catch (e) {
            console.log(e);
        };
    };

    // const handleSubcategoryChange = (event) => {
    //     setSelectedSubcategory(event.target.value);
    // };

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
        setCat_SubcatObj(prevArray => [...prevArray, {cat_id:selectedCategory, sub_id:event.target.value}]);
    };

    return (
            <Container component="main" maxWidth="xs">
                    <Box sx={{ display: 'flex', gap: '16px' }}> {/* Flex container for first name and last name */}
                        <FormControl 
                            sx={{ minWidth: 200 }} 
                            margin="normal"
                            required
                            fullwidth="true"
                        >
                            <InputLabel required id="categoryLabel">Subject</InputLabel>
                            <Select
                                labelId="categoryLabel"
                                id="category"
                                label="category"
                                name="category_id"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {categories.map(category => {
                                    return (
                                        <MenuItem key= {category.category_id} value={category.category_id}>{category.category_name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        { selectedCategory ? (
                            <FormControl 
                                sx={{ minWidth: 200 }} 
                                margin="normal"
                                required
                                fullwidth="true"
                            >
                                <InputLabel required id="subcategoryLabel">Topic</InputLabel>
                                <Select
                                    labelId="subcategoryLabel"
                                    id="subcategory"
                                    label="subcategory"
                                    name="subcategory_id"
                                    value={selectedSubcategory}
                                    onChange={handleSubcategoryChange}
                                >
                                    {subcategories.map(subcategory => {
                                        return (
                                            <MenuItem key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategory_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        ) : null } 
                    </Box>
            </Container>                  
    )
}

export default CategoryInputField;