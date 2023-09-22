import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import {toggleMusicEditButton} from '../../../reducer/musicFolders/musicFoldersAction.js';

import { useState } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FormControlLabel from '@mui/material/FormControlLabel';

const MusicFolderEditButton = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const toggleBoolean = useSelector(state => state.musicFolders.editToggleBoolean);

    console.log(toggleBoolean)
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={toggleBoolean}
                    onChange={() => dispatch(toggleMusicEditButton(!toggleBoolean))}
                    icon={<RemoveRedEyeIcon fontSize="small" />}
                    checkedIcon={<EditIcon fontSize="small" />}
                    size="medium"
                />
            }
            label={toggleBoolean ? "Edit" : "View"}
        />
    );
};

export default MusicFolderEditButton;
