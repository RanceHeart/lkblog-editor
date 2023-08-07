import {Box, Button, Grid, Input, useMediaQuery, useTheme} from '@mui/material';
import {alpha} from '@mui/system';
import {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {useLocation} from 'react-router-dom';

import {updateFilterKeyword} from '../../reducer/posts/postsAction.js'
import GoogleLoginButton from "./Button/GoogleLoginButton";
import LogoButton from "./Button/LogoButton";
import WritePostButton from "./Button/WritePostButton";

import {useDispatch, useSelector} from "react-redux";

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
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const [inputValue, setInputValue] = useState<String>('');
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const logoSize = isSmallScreen ? 60 : 120;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    dispatch(updateFilterKeyword(event.target.value));
  };

  useEffect(() => {
    return () => {
      dispatch(updateFilterKeyword(null));
    };
  }, [location]);

  return (
      <Box sx={{
        background: isSmallScreen ? `radial-gradient(circle at top, ${alpha(theme.palette.background.default, 1)} 50%, ${alpha(theme.palette.background.default, 0.9)} 100%)` : '',
        w: '100%',
        p: {xs: 2, sm: 4},
        color: 'white',
        top: 0,
        left: 0,
        right: 0,
        position: 'fixed',
        zIndex: 500
      }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6} sm={2}>
            <LogoButton logoSize={logoSize}/>
          </Grid>
          {!isSmallScreen && location.pathname === '/' && (
              <Grid item xs={12} sm={4}>
                <CoolInput
                    placeholder="Search posts"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`cool-input ${inputValue && 'has-value'}`}
                    fullWidth
                />
              </Grid>
          )}
          <Grid item xs={6} sm={6} container justifyContent="flex-end">
            <Box mr={2}>
              {location.pathname === '/' && userData && <WritePostButton/>}
            </Box>
            {location.pathname === '/' && <GoogleLoginButton/>}
          </Grid>
        </Grid>
      </Box>
  );
};

export default Header;
