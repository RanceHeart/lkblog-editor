import { Box } from '@mui/material';
import Editor from '../components/Editor/editor';
import Header from "../components/Header/header";

function CreateNewPost() {

  return (
    <Box sx={{ mx: 'auto', px: 6 }}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ maxWidth: '850px', mx: 'auto', px: 6, mt: -15 }}>
        <Editor/>
      </Box>
    </Box>
  );
};

export default CreateNewPost;
