import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const CategoryInputField = () => {
    const[categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const[subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        getCategories();
   }, []);

    const getCategories = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/subject/categories`);
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

    const getSubcategories = async (category) => {
        try {
            const res = await fetch(`${BASE_URL}/api/subject/subcategories?catname=${category}`);
            const data = await res.json();
            console.log(data);
            setSubcategories(data);
        } catch (e) {
            console.log(e);
        };
    };

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
    };

    return (
            <Container component="main" maxWidth="xs">
                    <Box sx={{ display: 'flex', gap: '16px' }}> {/* Flex container for first name and last name */}
                        <FormControl 
                            sx={{ minWidth: 200 }} 
                            margin="normal"
                            required
                            fullwidth
                        >
                            <InputLabel id="categoryLabel">Subject</InputLabel>
                            <Select
                                labelId="categoryLabel"
                                id="category"
                                label="category"
                                name="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {categories.map(category => {
                                    return (
                                        <MenuItem key= {category.category_id} value={category.category_name}>{category.category_name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        { selectedCategory ? (
                            <FormControl 
                                sx={{ minWidth: 200 }} 
                                margin="normal"
                                required
                                fullwidth
                            >
                                <InputLabel id="subcategoryLabel">Topic</InputLabel>
                                <Select
                                    labelId="subcategoryLabel"
                                    id="subcategory"
                                    label="subcategory"
                                    name="subcategory"
                                    value={selectedSubcategory}
                                    onChange={handleSubcategoryChange}
                                >
                                    {subcategories.map(subcategory => {
                                        return (
                                            <MenuItem key={subcategory.subcategory_id} value={subcategory.subcategory_name}>{subcategory.subcategory_name}</MenuItem>
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