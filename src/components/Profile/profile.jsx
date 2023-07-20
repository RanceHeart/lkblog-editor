import { Box, Avatar, Typography, Grid } from '@mui/material';

const Profile = () => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Avatar src="https://bit.ly/dan-abramov" alt="Li Ki" sx={{ width: 120, height: 120 }} />
      </Grid>
      <Grid item>
        <Typography variant="h5" fontWeight="semibold">
          Li Ki
        </Typography>
        <Typography variant="subtitle1">Software Engineer</Typography>
      </Grid>
    </Grid>
  );
};

export default Profile;
