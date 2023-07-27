// LogoButton.jsx

import {IconButton} from '@mui/material';
import {styled} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import {Avatar} from "@mui/material";

const LogoAvatar = styled(Avatar)(({theme}) => ({
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
}));

const LogoButton = ({logoSize}) => {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate('/')}>
            <LogoAvatar alt="Remy Sharp" src="/logo-no-background.png"
                        sx={{width: logoSize, height: logoSize}}/>
        </IconButton>
    );
};

export default LogoButton;
