import React, {useEffect, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "./ckeditor.jsx";
import {Chip, IconButton, TextField, Typography,} from '@mui/material';
import {Box} from "@mui/system";
// Reducer
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../reducer/posts/postsAction.js';
import {readPost} from '../../reducer/posts/post/postAction.js'
import {updateEditorContent} from '../../reducer/editor/editorAction.js'

import SpeedDialActions from "./Util/SpeedDialActions.jsx";
import {toBase64} from "../helperFunction.js";
import {useParams} from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag.js";

const EditorComponent = ({mode}) => {
    const { id } = useParams();

    const dispatch = useDispatch();
    // All post
    const allPostSize = useSelector((state) => state.posts.posts);

    // Saving and loading data
    const { post, isLoading } = useSelector((state) => state.post);


    // Tag field
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    // Raw data of the post
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    const image = "/lofi-image-for-blog.jpg";  // The default image

    async function initialData() {
        const file = await fetch(image)
            .then(response => response.blob())
            .then(blob => new File([blob], "lofi-image-for-blog.jpg", {type: 'image/jpeg'}));
        const base64Image = await toBase64(file);

        const defaultData = ("<img src=\"" + base64Image + "\" alt=\"Default\" />" +
            "<h2>Hello from the first editor working with the context!</h2>");
        setData(defaultData)
    }

    // Set Initial data
    useEffect(() => {
        if (mode === 'edit') {
            dispatch(readPost(id));
        } else {
            initialData();
        }
    }, [mode, id, dispatch]);

    // Only update posts when in edit mode
    async function formatPostData(post) {
        const file = await fetch(post.image)
            .then(response => response.blob())
            .then(blob => new File([blob], post.image, {type: 'image/jpeg'}));
        const base64Image = await toBase64(file);

        const formattedData = ("<img src=\"" + base64Image + "\" alt=\"Post image\" />" +
            "<h2>" + post.title + "</h2>" + post.content);
        setData(formattedData);
        setTags(post.tags || [])
    }

    useEffect(() => {
        if (mode === 'edit') {
            formatPostData(post);
        }
    }, [mode, id, post]);



    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const root = parse(data);
    //         const h2 = root.querySelector('h2');
    //         const img = root.querySelector('img');
    //
    //         if (!h2 || !img) {
    //             console.error('The content must contain a Header1 and an image.');
    //             return;
    //         }
    //
    //         const title = h2.text;
    //         const image = img.getAttribute('src');
    //
    //         const content = data.replace(h2.outerHTML, '').replace(img.outerHTML, '');
    //
    //         dispatch(updateEditorContent({
    //             title,
    //             image,
    //             tags,
    //             content,
    //         }));
    //
    //     }, 1000);
    //
    //     return () => clearInterval(interval);
    // }, [data, dispatch, tags]);

    const handleSavePost = () => {
        // Get data from the data
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const h2 = doc.querySelector('h2');
        const img = doc.querySelector('img');

        if (!h2 || !img) {
            console.error('The content must contain a Header1 and an image.');
            return;
        }

        const title = h2.textContent;
        const image = img.getAttribute('src');

        // Remove the h2 and img elements from the doc
        h2.remove();
        img.remove();

        // Get the remaining HTML as a string
        const content = doc.body.innerHTML;

        const newPost = {
            id: mode === 'edit' ? id : allPostSize.length.toString(),
            title: title,
            image: image,
            tags: tags,
            content: content,
            readTime: Math.round(1 + (wordCount / 238)).toString()
        };


        console.log(mode)
        if (mode === 'edit') {
            console.log(id)
            dispatch(updatePost(id, newPost));
        } else {
            dispatch(createPost(newPost));
        }
    };

    // Loading case
    if (isLoading) {
        return <div>Loading...</div>;  // Replace this with your actual loading spinner or placeholder
    }else{
        // console.log(posts)
    }

    return (
        <div>
            <CKEditor
                editor={Editor}
                data={data}
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
                        }} sx={{ml: 2}}>
                            <TagIcon/>
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
                    <Typography variant="h6" sx={{mt: 2}}>Tags:</Typography>
                    {tags.map((tag, index) => (
                        <Box key={index} component="span" ml={1} mt={1}>
                            <Chip label={tag} onDelete={() => {
                                setTags(tags.filter((tagItem, tagIndex) => tagIndex !== index));
                            }}/>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box position="absolute" bottom={48} right={24} zIndex="tooltip">
                <div
                    style={{position: 'fixed', bottom: "15%", right: "15%", width: 200, height: 200}}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <SpeedDialActions open={open} onSave={handleSavePost}/>
                </div>
            </Box>
        </div>
    );
};

export default EditorComponent;
