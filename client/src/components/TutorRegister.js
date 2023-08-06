import { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TutorRegister = () => {
    const[categories, setCategories] = useState([]);
    const[subcategories, setSubcategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
 
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

    const getSubcategories = async (category) => {
        try {
            const res = await fetch(`${BASE_URL}/api/subject/subcategories`);
            const data = await res.json();
            console.log(data);
            const filteredSubcategories = data.filter(subcategory => subcategory.category_name === category);
            setSubcategories(filteredSubcategories);
        } catch (e) {
            console.log(e);
        };
    };
    
    const handleCategoryChange = (event) => {
        const selectedCategory = Array.from(event.target.selectedOptions, option => option.value);
        console.log(selectedCategories)
        setSelectedCategories(selectedCategory);
        selectedCategory.forEach((category) => {
            getSubcategories(category);
        });
    };

    const handelSubmit = () => {
        console.log('submit')
    }


    return (
        <>
        <h2>Register as a Tutor!</h2>
        <form onSubmit={handelSubmit} method="POST">
            <h4>Profile Info</h4>
            <input type="text" name="tutorFirstName" placeholder="First Name" /><br/>
            <input type="text" name="tutorLastName" placeholder="Last Name" /><br/>
            <input type="text" name="tutorEmail" placeholder="Email" /><br/>
            <input type="date" name="tutorDOB" placeholder="Date of Birth" /><br/>
            <input type="text" name="tutorLocation" placeholder="location" /><br/>
            <input type="password" name="password" placeholder="password" /><br/>
            <h4>Tutoring Info</h4>
            <input type="text" name="tutorEducation" placeholder="Education" /><br/>
            <textarea type="text" name="tutorAbout" placeholder="Tell us a little about you..." /><br/>
            <select name="category" multiple onChange={handleCategoryChange}>
                {categories.map(category => {
                    return (
                        <option key= {category.category_id}>{category.category_name}</option>
                    )
                })}
            </select>
            { !selectedCategories.length === 0  ? (
                <>
                    <label for="topic">Select a topic:</label>
                    <select name="subcategory" multiple>
                        {subcategories.map(subcategory => {
                            return (
                                <option key={subcategory.subcategory_id}>{subcategory.subcategory_name}</option>
                            )
                        })}
                    </select>
                </>
            ) : null }
            <br/>
            <button type="submit">Register</button>
        </form>
        </>
    )
};

export default TutorRegister;