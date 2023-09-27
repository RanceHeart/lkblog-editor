import {FC, useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {makeStyles} from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {
  addMusicInfoToFolder,
  deleteMusicFolder,
  fetchMusicFolderById,
  saveMusicFolder,
} from "../../reducer/musicFolders/musicFoldersAction.js"

import {
  storeMusicInfo,
  deleteMusicInfo
} from "../../reducer/musicInfos/musicInfosAction.js"

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicSeriesItem from "./MusicSeriesItem";

const platformTypes = [
  {value: 'YOUTUBE', label: 'YouTube', disabled: false},
  {value: 'BILIBILI', label: 'BiliBili', disabled: true}
];

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  card: {
    width: '30vw',
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
    flexDirection: 'row',
  },
  textarea: {
    width: '100%', // Ensure it takes the full width
    fontSize: '1rem', // Adjust this value as needed
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    borderRadius: 4,
    color: '#FFF', // or any desired color
    resize: 'none', // Disable manual resize
  },
}));

interface Props {
  folderId: {
    id: number;
  };
}

const MusicFolder: FC<Props> = ({folderId}) => {
  // Reducer
  // @ts-ignore
  const isEditable = useSelector(state => state.musicFolders.editToggleBoolean);
  // @ts-ignore
  const isLoading = useSelector(state => state.musicFolders.isLoading);
  const dispatch = useDispatch();

  // @ts-ignore
  const folder = useSelector(state => state.musicFolders.musicFolders.find(f => f["_id"] === folderId));

  // For create new music link
  const [open, setOpen] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(platformTypes[0].value);
  const [musicSeriesData, setMusicSeriesData] = useState([]);

  // For editor content
  const [editedFolder, setEditedFolder] = useState({
    name: '',
    musicSeriesInfo: '',
    musicInfo: ''
  });

  useEffect(() => {
    if (folder) {
      setEditedFolder({
        name: folder.name,
        musicSeriesInfo: folder.musicSeriesInfo,
        musicInfo: folder.musicInfo
      });
    }
  }, [folder]);


  const classes = useStyles();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMusicFolderById(folderId))
  }, [folderId, dispatch]);

  useEffect(() => {
    if (folder && folder.musicSeries) {
        setMusicSeriesData(folder.musicSeries);
      }
  }, [folder, dispatch]);

  const saveEditedMusicFolder = () => {
    const updatedFolder = {
      ...folder,
      ...editedFolder
    };
    // @ts-ignore
    dispatch(saveMusicFolder(updatedFolder));
  };

  const addNewMusicLink = async () => {
    // @ts-ignore
    dispatch(storeMusicInfo(newLink, selectedPlatform, folderId));
  };

  const onDelete = (id: number) => {
    // @ts-ignore
    dispatch(deleteMusicFolder(id));
  };

  // For music series
  const deleteMusicSeriesItem = (id: string) => {
    // @ts-ignore
    dispatch(deleteMusicInfo(id));
  }


  if (isLoading) {
    return <p>Loading...</p>; // or return a spinner component
  }

  return (
      <Card className={classes.card}>
        <CardHeader
            title={isEditable ? <TextField defaultValue={editedFolder.name} onChange={(e) => setEditedFolder(prev => ({ ...prev, name: e.target.value }))} fullWidth/> : editedFolder.name}
            action={
                isEditable && (
                    <>
                      <IconButton onClick={saveEditedMusicFolder}>
                        <SaveAltIcon/>
                      </IconButton>
                      <IconButton onClick={() => onDelete(folder["_id"])}>
                        <DeleteIcon/>
                      </IconButton>
                    </>
                )
            }
        />

        <div className={classes.scrollPanel}>
          <CardContent>
            <List>
              <ListItem style={{ width: '100%' }}>
                <ListItemText secondary={isEditable ?
                    <TextareaAutosize
                        className={classes.textarea}
                        minRows={3} // Minimum number of rows
                        value={editedFolder.musicSeriesInfo}
                        onChange={(e) =>
                            setEditedFolder(prev => ({ ...prev, musicSeriesInfo: e.target.value }))
                        }
                    /> : editedFolder.musicSeriesInfo}/>
              </ListItem>
              <Divider component="li"/>
              <li>
                <Typography color="text.primary" display="block" variant="caption">
                  Music Info
                </Typography>
              </li>
              <ListItem style={{ width: '100%' }}>
                <ListItemText secondary={isEditable ?
                    <TextareaAutosize
                    className={classes.textarea}
                    minRows={3} // Minimum number of rows
                    value={editedFolder.musicInfo}
                    onChange={(e) =>
                        setEditedFolder(prev => ({ ...prev, musicInfo: e.target.value }))
                    }
                    /> : editedFolder.musicInfo}/>
              </ListItem>
              <Divider component="li" variant="inset"/>
              <li>
                <Typography color="text.primary" display="block" variant="caption">
                  Music Series
                </Typography>
                {isEditable && (
                    <IconButton onClick={() => setOpen(true)}>
                      <AddIcon/>
                    </IconButton>
                )}
              </li>
              {musicSeriesData.map((data) => (
                  <MusicSeriesItem data={data} onDelete={deleteMusicSeriesItem} isEditable={isEditable} />
              ))}
            </List>
          </CardContent>
        </div>

        {isEditable && (
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Add New Music Link</DialogTitle>
              <DialogContent>
                <TextField className={classes.textField} autoFocus margin="dense" label="Music Link" type="text" fullWidth value={newLink} onChange={(e) => setNewLink(e.target.value)} />
                <FormControl autoFocus fullWidth margin="dense">
                  <Select
                      labelId="platform-label"
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                  >
                    {platformTypes.map((platform) => (
                        <MenuItem key={platform.value} value={platform.value} disabled={platform.disabled}>
                          {platform.label}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                  setOpen(false);
                  setNewLink('');
                  setSelectedPlatform(platformTypes[0].value);
                }} color="primary">Cancel</Button>
                <Button onClick={async () => {
                  await addNewMusicLink();
                  setOpen(false);
                  setNewLink('');
                  setSelectedPlatform(platformTypes[0].value);
                }} color="primary">Add</Button>
              </DialogActions>
            </Dialog>
        )}
      </Card>
  );
};

export default MusicFolder;
