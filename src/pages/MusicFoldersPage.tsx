// MusicFoldersPage.tsx
import {FC, useEffect, useState} from 'react';
import MusicFolder from '../components/MusicFolder/MusicFolder';
import { Box, useMediaQuery, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import Header from '../components/Header/header';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";

import {saveMusicFolder, createMusicFolder, fetchAllMusicFolderIds} from "../reducer/musicFolders/musicFoldersAction";


interface Folder {
  name: string;
}

const MusicFoldersPage: FC = () => {

  const dispatch = useDispatch();
  // @ts-ignore
  const folderIds = useSelector(state => state.musicFolders.ids) || []; // Assuming the Redux state has an 'ids' property

  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllMusicFolderIds()); // Dispatch the action to fetch all IDs when the component mounts
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const addNewFolder = () => {
    const newFolder: Folder = {
      name: newFolderName,
    };

    // @ts-ignore
    dispatch(createMusicFolder(newFolder));  // Dispatch the action to save the new folder

    setOpen(false);
    setNewFolderName('');
  };

  return (
      <Box sx={{ mx: 'auto', px: isSmallScreen ? 2 : 6, paddingTop: isSmallScreen ? '80px' : '150px'}}>
        <Header />
        <Box sx={{
          mx: 'auto',
          px: isSmallScreen ? 2 : 6,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: 'center'
        }}>
          <Box sx={{
            overflowX: 'auto', // Adjusted this line
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            mb: isSmallScreen ? 2 : 0
          }}>
            {folderIds.map(folderId => (
                <Box key={folderId} sx={{ mr: isSmallScreen ? 0 : 2, mb: isSmallScreen ? 2 : 0 }}>
                  <MusicFolder folderId={folderId}/>
                </Box>
            ))}
          </Box>
          <IconButton color="primary" onClick={() => setOpen(true)} sx={{ mt: isSmallScreen ? 2 : 0 }}>
            <AddIcon />
          </IconButton>
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Folder</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name for the new folder.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="Folder Name"
                type="text"
                fullWidth
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={addNewFolder} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default MusicFoldersPage;
