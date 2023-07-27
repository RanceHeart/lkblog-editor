import React, {useEffect, useRef, useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "./ckeditor.jsx";
import {SpeedDial, SpeedDialAction, Typography} from '@mui/material';
import {Box} from "@mui/system";
import {FaUpload} from 'react-icons/fa';

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

const editor = () => {
  const [data, setData] = useState("" +
    "<img src=\"/lofi-image-for-blog.jpg\" alt=\"Default\" />" +
    "<h1>Hello from the first editor working with the context!</h1>" +
    "")
  const [wordCount, setWordCount] = useState(0);

  const [open, setOpen] = useState(false);

  const handleEditorReady = (editor) => {
    console.log('Editor is ready to use!', editor);
  };

  // Update redux content
  const dispatch = useDispatch();
  const content = useSelector(state => state.content);

  const prevDataRef = useRef(data);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data !== prevDataRef.current) {
        dispatch(updateEditorContent(data));
        prevDataRef.current = data;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data, dispatch]);

  return (
    <Box position="relative">
      <CKEditor
        editor={Editor}
        data={data}
        onReady={editor => {
          window.editor = editor;
          handleEditorReady(editor)
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const responsiveData = editor.getData();
          const root = parse(responsiveData);

          const h1 = root.querySelector('h1');
          const img = root.querySelector('img');

          if (!h1 || !img) {
            console.error('The content must contain a Header1 and an image.');
            return;
          }

          setData(responsiveData)

          const wordCountPlugin = editor.plugins.get('WordCount');
          setWordCount(wordCountPlugin.words);
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
      />
      <Box position="absolute" bottom={48} right={24} zIndex="tooltip">
        <div
          style={{position: 'fixed', bottom: "15%", right: "20%", width: 200, height: 200}}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            icon={<FaUpload/>}
            open={open}
            direction="up"
            sx={{position: 'fixed', bottom: "15%", right: "20%"}}
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
        </div>
      </Box>
    </Box>
  );

}

export default editor;
