import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../App';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from "@mui/system";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Nav = () => {
    const StyledLink = styled(Link)`
        text-decoration: none;
        color: black;
    `;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {isAuthenticated, setIsAuthenticated} = useContext(AppContext);
    const { userFN, setUserFN } = useContext(AppContext);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/logout`);
            if (res.status === 200) {
                setIsAuthenticated(false);
                navigate('/signin');
                setAnchorElUser(null);
            }
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#00695f" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"  // link home
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    ProFinder
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none'},
                        }}
                    >
                        {!isAuthenticated ? (
                            <Box>
                                <MenuItem key="signin" onClick={handleCloseNavMenu}>
                                    <StyledLink to="/signin">
                                        <Typography textAlign="center">Sign In</Typography>
                                    </StyledLink>     
                                </MenuItem>
                                <MenuItem key="register" onClick={handleCloseNavMenu}>
                                    <StyledLink to="/register">
                                        <Typography textAlign="center">Register</Typography>
                                    </StyledLink> 
                                </MenuItem>
                            </Box>
                        ) : 
                            <MenuItem key="home" onClick={handleCloseNavMenu}>
                                <StyledLink to="/">
                                    <Typography textAlign="center">Home</Typography>
                                </StyledLink>
                            </MenuItem>
                        }
                    </Menu>
                </Box>
                <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    ProFinder
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, flexDirection: "row-reverse" }}>
                    {!isAuthenticated ? (
                        <>
                            <Button
                                key="signin"
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to="/signin"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Sign In
                            </Button>
                            <Button
                                key="register"
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to="/register"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Register
                            </Button>
                        </>
                    ) : null
                    }   
                </Box>
                {isAuthenticated ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 1
                            }}
                        
                        >
                            <Typography component="body1" variant="p">
                                Welcome
                            </Typography>
                            <Typography component="body1" variant="p">
                                {userFN}
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                                    {/* <Typography textAlign="center">{profile}</Typography> */}
                                    <StyledLink to="/profile">
                                        <Typography textAlign="center">Profile</Typography>
                                    </StyledLink>
                                </MenuItem>
                                <MenuItem key="logout" onClick={logout}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                    ) : null } 
                </Toolbar>
            </Container>
        </AppBar>
    );
    }

    export default Nav;
