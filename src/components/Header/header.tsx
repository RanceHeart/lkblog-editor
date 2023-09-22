import {Box, Button, Grid, Typography, useMediaQuery, useTheme} from '@mui/material';
import {alpha} from '@mui/system';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {updateFilterKeyword} from '../../reducer/posts/postsAction.js'
import GoogleLoginButton from "./Button/GoogleLoginButton";
import LogoButton from "./Button/LogoButton";
import WritePostButton from "./Button/WritePostButton";

import {useDispatch, useSelector} from "react-redux";
import MusicFolderEditButton from "./Button/MusicFolderEditButton";


const Header = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const userData = useSelector(state => state.user.userData);
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const logoSize = isSmallScreen ? 60 : 120;

  // Navigator
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(updateFilterKeyword(null));
    };
  }, [location]);

  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // If scrolling up
      if (lastScrollPos > currentScrollPos || currentScrollPos < 10) {
        setShowHeader(true);
      } else {
        // If scrolling down
        setShowHeader(false);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos]);

  const alphaTrans = location.pathname.includes('MusicPlayer/') ? [0.8, 0.7] : [1, 0.9];

  const postsPageEditPanel = () =>{
      return (
          <Grid item xs={4} container justifyContent="center">
              <Box mr={1}>
                  {userData && <WritePostButton />}
              </Box>
              <GoogleLoginButton />
          </Grid>
      );
  }

    const musicFolderPageEditPanel = () =>{
        return (
            <Grid item xs={4} container justifyContent="center">
                <Box mr={1}>
                    {userData && <MusicFolderEditButton />}
                </Box>
                <GoogleLoginButton />
            </Grid>
        );
    }
  return (
      <Box sx={{
        background: `radial-gradient(circle at top, ${alpha(theme.palette.background.default, alphaTrans[0])} 50%, ${alpha(theme.palette.background.default, alphaTrans[1])} 100%)`,
        w: '100%',
        color: 'white',
        top: 0,
        left: 0,
        right: 0,
        position: 'fixed',
        zIndex: 0,
        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',

      }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <LogoButton logoSize={logoSize} />
          </Grid>
          {!location.pathname.includes('-post') && (
              <>
                <Grid item xs={2}>
                  <Button onClick={() => navigate('/homepage')}>
                    <Typography variant={isSmallScreen ? "h7" : "h6"} mb={1}>
                      Home
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => navigate('/')}>
                    <Typography variant={isSmallScreen ? "h7" : "h6"} mb={1}>
                    Posts
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => navigate('/Music')}>
                    <Typography variant={isSmallScreen ? "h7" : "h6"} mb={1}>
                    Music
                    </Typography>
                  </Button>
                </Grid>
              </>
          )}
            {location.pathname === '/' && postsPageEditPanel()}
            {location.pathname === '/Music' && musicFolderPageEditPanel()}
        </Grid>
      </Box>
  );
};

export default Header;
