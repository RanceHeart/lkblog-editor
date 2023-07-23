import React, {useState} from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "./ckeditor.jsx";
import {SpeedDial, SpeedDialAction, Typography} from '@mui/material';
import {Box} from "@mui/system";
import {FaCog, FaHome, FaSearch, FaToolbox, FaUser} from 'react-icons/fa';

const actions = [
    {icon: <FaHome/>, name: 'Home'},
    {icon: <FaSearch/>, name: 'Search'},
    {icon: <FaUser/>, name: 'Profile'},
    {icon: <FaCog/>, name: 'Settings'},
];

const editor = () => {
    const [data, setData] = useState("")
    const [wordCount, setWordCount] = useState(0);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleEditorReady = (editor) => {
        console.log('Editor is ready to use!', editor);
    };


    return (
        <Box position="relative">
            <CKEditor
                editor={Editor}
                data="<p>Hello from the first editor working with the context!</p>"
                onReady={editor => {
                    window.editor = editor;
                    handleEditorReady(editor)
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const responsiveData = editor.getData();
                    setData(responsiveData)

                    const wordCountPlugin = editor.plugins.get('WordCount');
                    setWordCount(wordCountPlugin.words);
                }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                }}
            />
            <Typography variant="body1">Word count: {wordCount}</Typography>
            <Box position="absolute" bottom={48} right={24} zIndex="tooltip">
                <div
                    style={{ position: 'relative', width: 200, height: 200 }}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        icon={<FaToolbox />}
                        open={open}
                        direction="up"
                        sx={{ position: 'absolute', bottom: 0, right: 0 }}
                    >
                        {actions.map((action, index) => {
                            const startDegree = 90;  // Adjust this value to change the starting degree
                            const rotationAngle = startDegree + index * 40;

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
