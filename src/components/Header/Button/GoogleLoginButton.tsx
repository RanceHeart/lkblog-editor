// GoogleLoginButton.jsx

import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../../reducer/user/userAction.js';
import {FaGoogle, FaSignOutAlt} from 'react-icons/fa';
import {IconButton, Tooltip} from '@mui/material';
import {useState, useEffect} from 'react';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const [googleButtonScale, setGoogleButtonScale] = useState(1);

    const [ user, setUser ] = useState([]);

    const logIn = useGoogleLogin({
        onSuccess: tokenResponse => {
            // @ts-ignore
            setUser(tokenResponse)
        },
    });

    const logOut = () => {
        googleLogout();
        dispatch(setUserData(false));
    };

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        dispatch(setUserData(res.data.email === import.meta.env.VITE_APP_ADMIN_EMAIL));
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

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
                onClick={() => userData === false ? logIn() : logOut() }
            >
                { userData === false ? <FaGoogle/> : <FaSignOutAlt/>}
            </IconButton>
        </Tooltip>
    );
};

export default GoogleLoginButton;
