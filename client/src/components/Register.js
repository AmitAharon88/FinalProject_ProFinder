import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Register = () => {
    return (
        <>
            <h1>Welcome to ProFiner</h1>
            <h3>What role whould you like to register as?</h3>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button component={Link} to="/register/student" variant="contained">
                    Student
                </Button>
                <Button component={Link} to="/register/tutor" variant="contained">
                    Tutor
                </Button>
            </Stack>
        </>
    )
};

export default Register;