import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/Header/header';
import LogoButton from "../components/Header/Button/LogoButton";

const HomePage = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const logoSize = isSmallScreen ? 240 : 360;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to LK Blog
        </Typography>
        <Typography variant="h5">
          Explore the world of LK with our insightful articles and discussions.
        </Typography>
        <LogoButton logoSize={logoSize}/>
      </Box>
    </Box>
  );
};

export default HomePage;
