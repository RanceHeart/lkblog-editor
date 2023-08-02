import {Box, Button, Grid, Input, useMediaQuery, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {useLocation} from 'react-router-dom';

import {updateFilterKeyword} from '../../reducer/posts/postsAction.js'
// Button
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

    // Button controller
    const location = useLocation();

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const logoSize = isSmallScreen ? 60 : 120;

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        dispatch(updateFilterKeyword(event.target.value));  // Dispatch an action to update the filter keyword in the Redux store
    };

    useEffect(() => {
        return () => {
            dispatch(updateFilterKeyword(null));  // Clear the input value when the component is unmounted
        };
    }, [location]);
    return (
        <Box sx={{bg: theme.palette.background.default, w: '100%', p: 4, color: 'white', top: 0, left: 0, right: 0, position: 'fixed', zIndex: 1000}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={2}>
                    <LogoButton logoSize={logoSize} />
                </Grid>
                {location.pathname === '/' ? (
                    <Grid item xs={12} sm={4}>
                        <CoolInput
                            placeholder="Search posts"
                            value={inputValue}
                            onChange={handleInputChange}
                            className={`cool-input ${inputValue && 'has-value'}`}
                            fullWidth
                        />
                    </Grid>
                ) : (
                    <Grid item xs={12} sm={4}>
                        <Box visibility="hidden">
                            <CoolInput fullWidth/>
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} sm={5} container justifyContent="flex-end">
                    <Box mr={2}>
                        {location.pathname !== '/' ? (
                            <div></div>
                        ) : (
                            userData && <WritePostButton />
                        )}
                    </Box>
                    {location.pathname === '/' ? (
                        <GoogleLoginButton/> // Use the GoogleLoginButton component
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
