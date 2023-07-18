import {Avatar, Box, Button, Grid, IconButton, Input, Typography, useMediaQuery, useTheme, Zoom} from '@mui/material';
import { FaPen, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';

const LogoAvatar = styled(Avatar)(({ theme }) => ({
  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
}));

const CoolInput = styled(Input)`
  ::placeholder {
    color: white;
    opacity: 1;
  }
`;

const Header = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const logoSize = isSmallScreen ? 60 : 120;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
      <Box sx={{ bg: theme.palette.background.default, w: '100%', p: 4, color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2}>
              <IconButton onClick={() => navigate('/')}>
                <LogoAvatar alt="Remy Sharp" src="/public/logo-no-background.png" sx={{ width: logoSize, height: logoSize }}/>
              </IconButton>
          </Grid>
          <Grid item xs={6}>
            <CoolInput
                placeholder="Search posts"
                value={inputValue}
                onChange={handleInputChange}
                className={`cool-input ${inputValue && 'has-value'}`}
                fullWidth
            />
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <Button
                startIcon={<FaPen />}
                onClick={() => navigate('/create-new-post')}
            >
              Write
            </Button>
            <Button
                startIcon={<FaGoogle />}
                color="primary"
                onClick={() => {
                  // Add your Google login logic here
                }}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Header;
