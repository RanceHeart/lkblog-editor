import { Box } from '@mui/material';
import Editor from '../components/Editor/editor';
import Header from "../components/Header/header";

function CreateNewPost({ mode, postData }) {

  return (
    <Box sx={{ mx: 'auto', px: 6 }}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ maxWidth: '850px', mx: 'auto', px: 6, mt: -15 }}>
        <Editor mode={mode} postData={postData}/>
      </Box>
    </Box>
  );
};

export default CreateNewPost;
