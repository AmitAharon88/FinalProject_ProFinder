import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Register = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 9 }}>
            <Typography
                variant="h2"
                color="#71797E"
                fontWeight="bold"
                component="h2"
            >Welcome to ProFiner</Typography>
            <Typography
                variant="h4"
                color="#71797E"
                component="h4"
                sx= {{ mb: 4}}
            >What role whould you like to register as?</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button 
                    component={Link} 
                    to="/register/student"
                    variant="contained"
                    size="large"
                    sx= {{
                        bgcolor: "#009688",
                        '&:hover': {
                            bgcolor: "#00695f",
                        },
                    }}
                >
                    Student
                </Button>
                <Button 
                    component={Link}
                    to="/register/tutor"
                    variant="contained"
                    size="large"
                    sx= {{
                        bgcolor: "#009688",
                        '&:hover': {
                            bgcolor: "#00695f",
                        },
                    }}
                >
                    Tutor
                </Button>
            </Stack>
        </Box>
    )
};

export default Register;