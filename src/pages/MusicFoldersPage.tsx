// MusicFoldersPage.tsx
import {FC} from 'react';
import MusicFolder from '../components/MusicFolders/MusicFolder';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/Header/header';

interface Folder {
  id: number;
  name: string;
}

const MusicFoldersPage: FC = () => {
  const folders: Folder[] = [
    { id: 1, name: 'Rock Classics' },
    { id: 2, name: 'Jazz Favorites' },
    // ... add more folders as needed
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Box sx={{ mx: 'auto', px: isSmallScreen ? 2 : 6, paddingTop: isSmallScreen ? '80px' : '150px'}}>
        <Box>
          <Header />
        </Box>
        <Box sx={{ mx: 'auto', px: isSmallScreen ? 2 : 6 }}>
          <Grid container spacing={2}>
            {folders.map(folder => (
                <Grid item xs={12} md={6} key={folder.id}>
                  <MusicFolder folder={folder} />
                </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
  );
};

export default MusicFoldersPage;
