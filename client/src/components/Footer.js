import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        marginTop: 2,
        backgroundColor: '#f5f5f5', // Set your footer background color
        color: '#333', // Set your footer text color
        width: '100%',
      }}
    >
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © ProFinder '}{new Date().getFullYear()}{'.'}
        </Typography>
    </Box>
  );
};

export default Footer;