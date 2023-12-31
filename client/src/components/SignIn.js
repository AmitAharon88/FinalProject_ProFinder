import { useState, createContext, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

const SignIn = () => {
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPassword, setSelectedPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const { userFN, setUserFN } = useContext(AppContext);
  const { userLN, setUserLN } = useContext(AppContext);
  const { userId, setUserId } = useContext(AppContext);
  const { userRole, setUserRole } = useContext(AppContext);
  const { successRegisterMsg, setSuccessRegisterMsg } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Clear success message after a certain time
    if (successRegisterMsg) {
      const timer = setTimeout(() => {
        setSuccessRegisterMsg("");
      }, 5000); // Clear after 5 seconds
      return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }
  }, []);

  const handleChange = (event) => {
    setRole(event.target.value);
    // console.log(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {};

    formData.forEach((value, key) => {
        userData[key] = value;
    });

    userData.email = selectedEmail.trim().toLocaleLowerCase();
    userData.password = selectedPassword.trim();

    // console.log(userData)
    setUserRole(role)

    if (userData.role === "students") { 
      try {
        const res = await fetch(`/api/students/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (res.status === 200) {
          const response = await res.json();
          setIsAuthenticated(true);
          setUserFN(response.first_name);
          setUserLN(response.last_name);
          setUserId(response.student_id);
          console.log(response);
          setMsg('');
          navigate("/");
        } else {
            const errorResponse = await res.json();
            console.log('Error:', errorResponse.msg);
            setMsg(errorResponse.msg)
        }
      } catch (e) {
          console.log(e);
      };
    } else { 
      try {
        const res = await fetch(`/api/tutors/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (res.status === 200) {
          const response = await res.json();
          setIsAuthenticated(true);
          setUserFN(response.first_name);
          setUserLN(response.last_name);
          setUserId(response.tutor_id);
          console.log(response.tutor_id)
          console.log(response)
          setMsg('');
          navigate("/");
        } else {
            const errorResponse = await res.json();
            console.log('Error:', errorResponse.msg);
            setMsg(errorResponse.msg)
        }
      } catch (e) {
          console.log(e);
      };
    };
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#009688" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography handleOpenUserMenu variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => {setSelectedEmail(e.target.value)}}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => {setSelectedPassword(e.target.value)}}
              autoComplete="current-password"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel required id="roleLabel">Role</InputLabel>
              <Select
                labelId="roleLabel"
                id="role"
                name="role"
                value={role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="students">Student</MenuItem>
                <MenuItem value="tutors">Tutor</MenuItem>
              </Select>
            </FormControl>
            {msg && (
              <Typography variant="body1" color="red">
                * {msg}
              </Typography>
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" sx={{
                '&.Mui-checked': {
                  color: "#009688", // color when checkbox is checked
                },
              }} />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: "#009688",
                '&:hover': {
                  bgcolor: "#00695f",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "2vw",
          width: '80vw'
        }}
      >
        <Stack sx={{ width: '60%', marginTop: 2 }}>
          {successRegisterMsg ? (
            <Alert severity="success">{successRegisterMsg}</Alert>
          ) : (null)}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default SignIn;