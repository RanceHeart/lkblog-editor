import {Avatar, Box, Button, Grid, IconButton, Input, useMediaQuery, useTheme} from '@mui/material';
import {FaGoogle, FaPen} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {useLocation, useNavigate} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LogoAvatar = styled(Avatar)(({theme}) => ({
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
    const {loaded, signIn} = useGoogleLogin({
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

  const createIconButton = (icon, ariaLabel, onClick, scale, setScale) => {
    return (
        <Tooltip title={ariaLabel}>
          <IconButton
              aria-label={ariaLabel}
              size="large"
              color="primary"
              onClick={onClick}
              onMouseEnter={() => setScale(1.05)}
              onMouseLeave={() => setScale(1)}
              onMouseDown={() => setScale(0.95)}
              onMouseUp={() => setScale(1)}
              sx={{transform: `scale(${scale})`, transition: 'transform 0.3s ease'}}>
            {icon}
          </IconButton>
        </Tooltip>
    );
  };

    return (
        <Box sx={{bg: theme.palette.background.default, w: '100%', p: 4, color: 'white'}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={2}>
                    <IconButton onClick={() => navigate('/')}>
                        <LogoAvatar alt="Remy Sharp" src="/logo-no-background.png"
                                    sx={{width: logoSize, height: logoSize}}/>
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
                            <CoolInput fullWidth/>
                        </Box>
                    </Grid>
                )}
                <Grid item xs={5} container justifyContent="flex-end">
                  <Box mr={2}>
                    {location.pathname === '/create-new-post' ? (
                        <div></div>
                    ) : (
                        createIconButton(<FaPen />, "write", () => navigate('/create-new-post'), writeButtonScale, setWriteButtonScale)
                    )}
                  </Box>
                  {location.pathname !== '/create-new-post' ? (
                      createIconButton(<FaGoogle />, "google", () => {
                        // Add your Google login logic here
                      }, googleButtonScale, setGoogleButtonScale)
                  ) : (
                      <Box visibility="hidden">
                        <Button size="large" variant="outlined"/>
                      </Box>
                  )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Header;
