import React, {useEffect, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "./ckeditor.jsx";
import {Typography, useMediaQuery} from '@mui/material';
import {Box} from "@mui/system";
import {darkTheme, lightTheme} from "../../themProvider.js";
import {light} from "@mui/material/styles/createPalette.js";

const editor = () =>{
  const [data, setData] = useState("")
  const [wordCount, setWordCount] = useState(0);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleEditorReady = (editor) => {
    console.log('Editor is ready to use!', editor);
  };


  return (
    <Box position="relative">
      <h2 className>Using the CKEditor 5 feature in React</h2>
      <CKEditor
        editor={ Editor }
        data="<p>Hello from the first editor working with the context!</p>"
        onReady={ editor => {
          window.editor = editor;

          // You can store the "Editor" and use when it is needed.
          handleEditorReady(editor)
          console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          const responsiveData = editor.getData();
          setData(responsiveData)

          const wordCountPlugin = editor.plugins.get( 'WordCount' );
          setWordCount(wordCountPlugin.words);
          // console.log( { event, Editor, data } );
        } }
        onBlur={ ( event, editor ) => {
          // console.log( 'Blur.', Editor );
        } }
        onFocus={ ( event, editor ) => {
          // console.log( 'Focus.', Editor );
        } }
      />
      <Typography variant="body1">Word count: {wordCount}</Typography>
    </Box>
  );

}

export default editor;
