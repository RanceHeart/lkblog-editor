import {FC, useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemText, Typography, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {
  deleteMusicFolder,
  fetchMusicFolderById,
  saveMusicFolder,
  storeMusicInfo
} from "../../reducer/musicFolders/musicFoldersAction.js"

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '20vw',
    height: '80vh',
    overflowY: 'auto',
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: '#FFF',
    '& h5': {
      fontFamily: "'Roboto Slab', serif",
      fontWeight: 600,
    },
    '& body1': {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 400,
    },
    // @ts-ignore
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: '40vh',
    },
  },
  scrollPanel: {
    overflowX: 'scroll',
    display: 'flex',
    flexDirection: 'row',
  },
}));

interface Props {
  folderId: {
    id: number;
  };
}
const MusicFolder: FC<Props> = ({ folderId}) => {
  // Reducer
  // @ts-ignore
  const isEditable = useSelector(state => state.musicFolders.editToggleBoolean);
  // @ts-ignore
  const isLoading = useSelector(state => state.musicFolders.isLoading);
  const dispatch = useDispatch();

  // @ts-ignore
  const folder = useSelector(state => state.musicFolders.musicFolders.find(f => f.id === folderId.id));

  // For create new music link
  const [open, setOpen] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const classes = useStyles();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMusicFolderById(folderId))
  }, [dispatch, folderId]);

  const saveEditedMusicFolder = () => {
    const updatedFolder = {
      id: folderId,
      // ... any other properties you want to update ...
    };
    // @ts-ignore
    dispatch(saveMusicFolder(updatedFolder));
  };

  const addNewMusicLink = async (link: string, platformType: string) => {
    const linkData = {
      youtubeLink: link,
      platformType: platformType
    };

    // @ts-ignore
    const newLinkResponse = await dispatch(storeMusicInfo(linkData));

    if (newLinkResponse && newLinkResponse.id) {
      const updatedFolder = {
        ...folder,
        musicSeries: [...folder.musicSeries, newLinkResponse.id]
      };

      // @ts-ignore
      dispatch(saveMusicFolder(updatedFolder));
    }
  };


  const onDelete = (id: number) => {
    // @ts-ignore
    dispatch(deleteMusicFolder(id));
  };

  if (!folder) {
    return <p>Loading...</p>; // or return a spinner component
  }

  return (
      <Card className={classes.card}>
        <CardHeader
            title={isEditable ? <TextField defaultValue={folder.name} fullWidth /> : folder.name}
            action={
                isEditable && (
                    <>
                      <IconButton onClick={saveMusicFolder}>
                        <SaveAltIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(folder.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                )
            }
        />

        <div className={classes.scrollPanel}>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText secondary={isEditable ? <TextField defaultValue="Details about the music series..." fullWidth multiline /> : "Details about the musicFolders series..."} />
              </ListItem>
              <Divider component="li" />
              <li>
                <Typography color="text.primary" display="block" variant="caption">
                  Music Info
                </Typography>
              </li>
              <ListItem>
                <ListItemText secondary={isEditable ? <TextField defaultValue="Details about the music..." fullWidth multiline /> : "Details about the musicFolders..."} />
              </ListItem>
              <Divider component="li" variant="inset" />
              <li>
                <Typography color="text.primary" display="block" variant="caption">
                  Music Series
                </Typography>
                {isEditable && (
                    <IconButton onClick={() => setOpen(true)}>
                      <AddIcon />
                    </IconButton>
                )}
              </li>
              {folder.musicSeries.map((music, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={isEditable ? <TextField defaultValue={music.link} fullWidth /> : music.link} secondary={isEditable ? <TextField defaultValue={`Author: ${music.author}`} fullWidth /> : `Author: ${music.author}`} />
                  </ListItem>
              ))}
            </List>
          </CardContent>
        </div>

        {isEditable && (
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Add New Music Link</DialogTitle>
              <DialogContent>
                <TextField autoFocus margin="dense" label="Music Link" type="text" fullWidth value={newLink} onChange={(e) => setNewLink(e.target.value)} />
                <TextField margin="dense" label="Author Name" type="text" fullWidth value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                <Button onClick={() => setOpen(true)} color="primary">Add</Button>
              </DialogActions>
            </Dialog>
        )}
      </Card>
  );
};

export default MusicFolder;
