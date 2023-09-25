import { FC } from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    right: '5%',
    bottom: '1%',
    width: '25vw',
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
      left: '50%',
      width: '100vw',
      height: '40vh',
      transform: 'translateX(-50%)',
    },
  },
}));


const MusicPanel: FC = () => {
  const classes = useStyles();

  return (
      <Card className={classes.card} elevation={3}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Music Series Info" secondary="Details about the music series..." />
            </ListItem>
            <Divider component="li" />
            <li>
              <Typography color="text.secondary" display="block" variant="caption">
                Music Info
              </Typography>
            </li>
            <ListItem>
              <ListItemText primary="Music Info" secondary="Details about the music..." />
            </ListItem>
            <Divider component="li" variant="inset" />
            <li>
              <Typography color="text.secondary" display="block" variant="caption">
                Music Series
              </Typography>
            </li>
            <ListItem>
              <ListItemText primary="Music 1 link" secondary="Author: John Doe, Style: Jazz" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Music 2 link" secondary="Author: Jane Smith, Style: Pop" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Music 3 link" secondary="Author: Bob Brown, Style: Rock" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
  );
};

export default MusicPanel;
