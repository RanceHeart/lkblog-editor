import React, {useEffect, useRef, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "./ckeditor.jsx";
import {
  Chip,
  Grid,
  IconButton,
  Paper,
  SpeedDial,
  SpeedDialAction,
  TextField,
  Typography,
  useMediaQuery, useTheme
} from '@mui/material';
import {Box} from "@mui/system";
import {FaUpload} from 'react-icons/fa';

import TagIcon from '@mui/icons-material/Tag';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Header and Image should be compulsory for the content
import {parse} from 'node-html-parser';

// Using redux to fetch the data of editor
import {useDispatch, useSelector} from 'react-redux';
import {updateEditorContent} from '../../reducer/actions';

const actions = [
  {icon: <SaveAsIcon sx={{color: '#6b6b6b', opacity: 0.85}}/>, name: 'Save as draft'},
  {icon: <InventoryIcon sx={{color: '#ffaa00', opacity: 0.85}}/>, name: 'Save as template'},
  {icon: <DeleteForeverIcon sx={{color: '#cc0000', opacity: 0.85}}/>, name: 'Drop'},
];

const WordCount = ({ wordCount }) => (
    <Typography variant="h6">Word Count: {wordCount}</Typography>
);

const TagInput = ({ tagInput, handleTagInputChange, handleAddTag, tags, handleDeleteTag }) => (
    <Box mt={2} display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" alignItems="center">
        <IconButton color="primary" onClick={handleAddTag} sx={{ ml: 2 }}>
          <TagIcon />
        </IconButton>
        <TextField
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="Enter a tag"
            variant="outlined"
            size="small"
        />
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>Tags:</Typography>
      {tags.map((tag, index) => (
          <Box key={index} component="span" ml={1} mt={1}>
            <Chip label={tag} onDelete={() => handleDeleteTag(index)} />
          </Box>
      ))}
    </Box>
);

const SpeedDialActions = ({ open }) => (
    <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<FaUpload/>}
        open={open}
        direction="up"
        sx={{position: 'fixed', bottom: "15%", right: "15%"}}
    >
      {actions.map((action, index) => {
        const startDegree = 90;  // Adjust this value to change the starting degree
        const rotationAngle = startDegree + index * 50;

        return (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                sx={{
                  position: 'absolute',
                  bottom: '0%',
                  right: '0%',
                  transform: `rotate(-${rotationAngle}deg) translate(70px) rotate(${rotationAngle}deg)`,
                  transformOrigin: 'bottom right',
                }}
            />
        );
      })}
    </SpeedDial>
);

const editor = () => {
  const [data, setData] = useState("" +
    "<img src=\"/lofi-image-for-blog.jpg\" alt=\"Default\" />" +
    "<h2>Hello from the first editor working with the context!</h2>" +
    "")

  const image = "/lofi-image-for-blog.jpg";  // The path to your image file
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async function loadImage() {
    const file = await fetch(image)
        .then(response => response.blob())
        .then(blob => new File([blob], "lofi-image-for-blog.jpg", {type: 'image/jpeg'}));
    const base64Image = await toBase64(file);

    setData("<img src=\"" + base64Image + "\" alt=\"Default\" />" +
        "<h2>Hello from the first editor working with the context!</h2>");
  }

  useEffect(() => {
    loadImage();
  }, []);

  const [wordCount, setWordCount] = useState(0);

  const [open, setOpen] = useState(false);

  const handleEditorReady = (editor) => {
    console.log('Editor is ready to use!', editor);
  };

  // Add tag
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleDeleteTag = (tagIndex) => {
    setTags(tags.filter((tag, index) => index !== tagIndex));
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  // Update redux content
  const dispatch = useDispatch();
  const content = useSelector(state => state.content);

  const prevDataRef = useRef(data);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data !== prevDataRef.current) {
        const root = parse(data);

        const h2 = root.querySelector('h2');
        const img = root.querySelector('img');

        if (!h2 || !img) {
          console.error('The content must contain a Header1 and an image.');
          return;
        }

        // Extract the title, image, and content
        const title = h2.text;
        const image = img.getAttribute('src');
        const content = data.replace(h2.outerHTML, '').replace(img.outerHTML, '');


        // Dispatch the updateEditorContent action with the title, image, tags, and content
        dispatch(updateEditorContent({
          title,
          image,
          tags,
          content,
        }));

        prevDataRef.current = data;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data, dispatch, tags]);


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={11}>
          <CKEditor
              editor={Editor}
              data={data}
              onReady={handleEditorReady}
              onChange={(event, editor) => {
                const responsiveData = editor.getData();
                const root = parse(responsiveData);

                const h2 = root.querySelector('h2');
                const img = root.querySelector('img');

                if (!h2 || !img) {
                  console.error('The content must contain a Header1 and an image.');
                  return;
                }

                setData(responsiveData)

                const wordCountPlugin = editor.plugins.get('WordCount');
                setWordCount(wordCountPlugin.words);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Box position="fixed" top="25%" right="2%" zIndex="tooltip">
            <WordCount wordCount={wordCount} />
            <TagInput
                tagInput={tagInput}
                handleTagInputChange={handleTagInputChange}
                handleAddTag={handleAddTag}
                tags={tags}
                handleDeleteTag={handleDeleteTag}
            />
          </Box>
          <Box position="absolute" bottom={48} right={24} zIndex="tooltip">
            <div
                style={{position: 'fixed', bottom: "15%", right: "15%", width: 200, height: 200}}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
              <SpeedDialActions open={open} />
            </div>
          </Box>
        </Grid>
      </Grid>
  );

}

export default editor;
