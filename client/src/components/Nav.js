import { Link } from "react-router-dom";
import Avatar from '@mui/material/Button';

const Nav = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/register">Register</Link>
            <Avatar alt="User thumbnail" src="#" />
        </nav>
    )
};

export default Nav;