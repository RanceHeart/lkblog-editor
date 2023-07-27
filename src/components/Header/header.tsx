import {Box, Button, Grid, IconButton, Input, useMediaQuery, useTheme} from '@mui/material';
import {FaPen} from 'react-icons/fa';
import React, {useState} from 'react';
import {styled} from '@mui/system';
import {useLocation, useNavigate} from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';

// Button
import GoogleLoginButton from "./Button/GoogleLoginButton";
import LogoButton from "./Button/LogoButton";

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
    const [inputValue, setInputValue] = useState<String>('');

    // Button controller
    const [writeButtonScale, setWriteButtonScale] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const logoSize = isSmallScreen ? 60 : 120;

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

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
                <Grid item xs={12} sm={2}>
                    <LogoButton logoSize={logoSize} />
                </Grid>
                {location.pathname !== '/create-new-post' ? (
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
                        {location.pathname === '/create-new-post' ? (
                            <div></div>
                        ) : (
                            createIconButton(
                                <FaPen/>, "write", () => navigate('/create-new-post'), writeButtonScale, setWriteButtonScale)
                        )}
                    </Box>
                    {location.pathname !== '/create-new-post' ? (
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
