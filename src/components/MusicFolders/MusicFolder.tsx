// MusicFolder.tsx
import {FC} from 'react';
import { Card, CardContent, CardHeader, List, ListItem, ListItemText } from '@mui/material';

interface Props {
  folder: {
    id: number;
    name: string;
  };
}

const MusicFolder: FC<Props> = ({ folder }) => {
  const urls: string[] = [
    // Sample URLs for demonstration. In a real app, these would be fetched based on the folder.
    'https://www.youtube.com/watch?v=XXXXX',
    'https://www.youtube.com/watch?v=YYYYY',
    // ... add more URLs as needed
  ];

  return (
      <Card>
        <CardHeader title={folder.name} />
        <CardContent>
          <List>
            {urls.map((url, index) => (
                <ListItem key={index}>
                  <ListItemText primary={<a href={"localhost:5173/Music/MusicPlayer/1"} target="_blank" rel="noopener noreferrer">{url}</a>} />
                </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
  );
};

export default MusicFolder;
