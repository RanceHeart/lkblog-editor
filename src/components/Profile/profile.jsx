import { Box, Avatar, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Avatar src="https://bit.ly/dan-abramov" alt="Li Ki" sx={{ width: 120, height: 120 }} />
      <Typography variant="h5" fontWeight="semibold" mt={2}>
        Li Ki
      </Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
    </Box>
  );
};

export default Profile;
