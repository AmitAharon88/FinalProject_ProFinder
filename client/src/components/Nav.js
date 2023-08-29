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
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';

const Nav = () => {
    const StyledLink = styled(Link)`
        text-decoration: none;
        color: black;
    `;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {isAuthenticated, setIsAuthenticated} = useContext(AppContext);
    const { userFN, setUserFN } = useContext(AppContext);
    const { userId, setUserId } = useContext(AppContext);

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
          primary: {
            main: '#8BA69C',
          },
        },
    });

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
            const res = await fetch(`/api/logout`);
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
                                mr: 3
                            }}
                        
                        >
                            <Typography component="body1" variant="p">
                                Welcome
                            </Typography>
                            <Typography component="body1" variant="p">
                                {userFN}
                            </Typography>
                        </Box>
                        <ThemeProvider theme={theme}>
                            <StyledLink to={`/${userId}/messageboard`}>
                                {/* <Badge badgeContent={4} color="primary" sx= {{ mr: 3 }}> */}
                                    <MailIcon sx={{ color: 'white', mr: 3 }} />
                                {/* </Badge> */}
                            </StyledLink>
                        </ThemeProvider>
                        <Box sx={{ flexGrow: 0 }}>
                            <SvgIcon fontSize="large" onClick={handleOpenUserMenu}>
                                {/* credit: plus icon from https://heroicons.com/ */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                                    />
                                </svg>
                            </SvgIcon>
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
                                    <StyledLink to={`/${userId}/profile`}>
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
