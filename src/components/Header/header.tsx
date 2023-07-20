import {Avatar, Box, Button, Grid, IconButton, Input, Typography, useMediaQuery, useTheme, Zoom} from '@mui/material';
import { FaPen, FaGoogle } from 'react-icons/fa';
import {useEffect, useState} from 'react';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import PublishIcon from '@mui/icons-material/Publish';

const LogoAvatar = styled(Avatar)(({ theme }) => ({
  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
}));

const CoolInput = styled(Input)`
  ::placeholder {
    color: white;
    opacity: 1;
  }
  transition: all 0.3s ease;
  &:focus {
    transform: scale(1.05);
  }
`;

const Header = () => {
  const [inputValue, setInputValue] = useState<string>('');

  // Button controller
  const [writeButtonScale, setWriteButtonScale] = useState(1);
  const [googleButtonScale, setGoogleButtonScale] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const logoSize = isSmallScreen ? 60 : 120;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // @ts-ignore
  const { loaded, signIn } = useGoogleLogin({
    onSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ('profileObj' in res) {
        console.log('Login Success:', res.profileObj);
      }
    },
    isSignedIn: true,  // This will check if user is signed in on component mount
  });

  useEffect(() => {
    if (loaded) {
      signIn();
    }
  }, [loaded, signIn]);

  return (
      <Box sx={{ bg: theme.palette.background.default, w: '100%', p: 4, color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <IconButton onClick={() => navigate('/')}>
              <LogoAvatar alt="Remy Sharp" src="/public/logo-no-background.png" sx={{ width: logoSize, height: logoSize }}/>
            </IconButton>
          </Grid>
          {location.pathname !== '/create-new-post' ? (
              <Grid item xs={4}>
                <CoolInput
                    placeholder="Search posts"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`cool-input ${inputValue && 'has-value'}`}
                    fullWidth
                />
              </Grid>
          ) : (
              <Grid item xs={4}>
                <Box visibility="hidden">
                  <CoolInput fullWidth />
                </Box>
              </Grid>
          )}
          <Grid item xs={5} container justifyContent="flex-end">
            <Box mr={2}>
              {location.pathname === '/create-new-post' ? (
                  <Button
                      startIcon={<PublishIcon />}
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        // Add your submit logic here
                      }}
                      onMouseEnter={() => setWriteButtonScale(1.05)}
                      onMouseLeave={() => setWriteButtonScale(1)}
                      onMouseDown={() => setWriteButtonScale(0.95)}
                      onMouseUp={() => setWriteButtonScale(1)}
                      sx={{ transform: `scale(${writeButtonScale})`, transition: 'transform 0.3s ease' }}
                  >
                    Submit
                  </Button>
              ) : (
                  <Button
                      startIcon={<FaPen />}
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => navigate('/create-new-post')}
                      onMouseEnter={() => setWriteButtonScale(1.05)}
                      onMouseLeave={() => setWriteButtonScale(1)}
                      onMouseDown={() => setWriteButtonScale(0.95)}
                      onMouseUp={() => setWriteButtonScale(1)}
                      sx={{ transform: `scale(${writeButtonScale})`, transition: 'transform 0.3s ease' }}
                  >
                    Write
                  </Button>
              )}
            </Box>
            {location.pathname !== '/create-new-post' ? (
                <Button
                    startIcon={<FaGoogle />}
                    size="large"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      // Add your Google login logic here
                    }}
                    onMouseEnter={() => setGoogleButtonScale(1.05)}
                    onMouseLeave={() => setGoogleButtonScale(1)}
                    onMouseDown={() => setGoogleButtonScale(0.95)}
                    onMouseUp={() => setGoogleButtonScale(1)}
                    sx={{ transform: `scale(${googleButtonScale})`, transition: 'transform 0.3s ease' }}
                >
                  Google
                </Button>
            ) : (
                <Box visibility="hidden">
                  <Button size="large" variant="outlined" />
                </Box>
            )}
          </Grid>
        </Grid>
      </Box>
  );
};

export default Header;
