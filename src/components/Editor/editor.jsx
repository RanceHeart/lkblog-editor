import React, { useEffect, useState } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "./ckeditor.jsx";
import { Chip, IconButton, TextField, Typography } from '@mui/material';
import { Box } from "@mui/system";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, readPost } from '../../reducer/posts/postsAction.js';
import SpeedDialActions from "./Util/SpeedDialActions.jsx";
import { useParams } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag.js";

const EditorComponent = ({ mode }) => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const allPost = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.isLoading);
    const post = useSelector((state) => state.posts.post);

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        if (mode === 'edit') {
            dispatch(readPost(id.toString()));
        }
    }, [mode, id, dispatch]);

    useEffect(() => {
        if (mode === 'edit' && post) {
            const formattedData = ("<img src=\"" + post.image + "\" alt=\"Post image\" />" +
              "<h2>" + post.title + "</h2>" + post.content);
            setData(formattedData);
            setTags(post.tags || [])
        }
    }, [post, mode]);

    const handleSavePost = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const h2 = doc.querySelector('h2');
        const img = doc.querySelector('img');

        console.log(doc)
        if (!h2 || !img) {
            console.error('The content must contain a Header1 and an image.');
            return;
        }

        const title = h2.textContent;
        const image = img.getAttribute('src');

        h2.remove();
        img.remove();

        const content = doc.body.innerHTML;

        const newPost = {
            id: mode === 'edit' ? id : allPost.length.toString(),
            title: title,
            image: image,
            tags: tags,
            content: content,
            readTime: Math.round(1 + (wordCount / 100)).toString()
        };

        if (mode === 'edit') {
            console.log(newPost)
            dispatch(updatePost(newPost));
        } else {
            dispatch(createPost(newPost));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
      <div style={{ zIndex: 1000 }}>
          <CKEditor
            editor={Editor}
            data={data}
            config={{
                simpleUpload: {
                    uploadUrl: 'http://localhost:3001/posts/upload', // Pointing to your server-side endpoint
                }
            }}
            onChange={(event, editor) => {
                const responsiveData = editor.getData();
                setData(responsiveData)

                const wordCountPlugin = editor.plugins.get('WordCount');
                setWordCount(wordCountPlugin.words);
            }}
          />
          <Box position="fixed" top="25%" right="6%" zIndex="tooltip">
              <Typography variant="h6">Word Count: {wordCount}</Typography>
              <Box mt={2} display="flex" flexDirection="column" alignItems="flex-start">
                  <Box display="flex" alignItems="center">
                      <IconButton color="primary" onClick={() => {
                          if (tagInput && !tags.includes(tagInput)) {
                              setTags([...tags, tagInput]);
                              setTagInput('');
                          }
                      }} sx={{ ml: 2 }}>
                          <TagIcon />
                      </IconButton>
                      <TextField
                        value={tagInput}
                        onChange={event => {
                            setTagInput(event.target.value)
                        }}
                        placeholder="Enter a tag"
                        variant="outlined"
                        size="small"
                      />
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>Tags:</Typography>
                  {tags.map((tag, index) => (
                    <Box key={index} component="span" ml={1} mt={1}>
                        <Chip label={tag} onDelete={() => {
                            setTags(tags.filter((tagItem, tagIndex) => tagIndex !== index));
                        }} />
                    </Box>
                  ))}
              </Box>
          </Box>
          <Box position="absolute" bottom={48} right={24} zIndex="tooltip">
              <div
                style={{ position: 'fixed', bottom: "15%", right: "15%", width: 200, height: 200 }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                  <SpeedDialActions open={open} onSave={handleSavePost} />
              </div>
          </Box>
      </div>
    );
};

export default EditorComponent;
