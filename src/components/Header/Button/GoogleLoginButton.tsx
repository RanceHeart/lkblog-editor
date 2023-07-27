// GoogleLoginButton.jsx

import {useDispatch} from 'react-redux';
import {setUserData} from '../../../reducer/actions';
import {FaGoogle} from 'react-icons/fa';
import {IconButton, Tooltip} from '@mui/material';
import {useState} from 'react';
import {useGoogleLogin} from "@react-oauth/google";

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const [googleButtonScale, setGoogleButtonScale] = useState(1);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            dispatch(setUserData(tokenResponse));
        },
    });

    return (
        <Tooltip title="Google Login">
            <IconButton
                aria-label="Google Login"
                size="large"
                color="primary"
                onMouseEnter={() => setGoogleButtonScale(1.05)}
                onMouseLeave={() => setGoogleButtonScale(1)}
                onMouseDown={() => setGoogleButtonScale(0.95)}
                onMouseUp={() => setGoogleButtonScale(1)}
                sx={{transform: `scale(${googleButtonScale})`, transition: 'transform 0.3s ease'}}
                onClick={() => login()}
            >
                <FaGoogle/>
            </IconButton>
        </Tooltip>
    );
};

export default GoogleLoginButton;
