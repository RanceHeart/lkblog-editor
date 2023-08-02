import { Box } from '@mui/material';
import Editor from '../components/Editor/editor';
import Header from "../components/Header/header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateNewPost({ mode }) {
    const userLogin = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userLogin) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [userLogin, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Replace this with your actual loading component
    }

    return (
        <Box sx={{ mx: 'auto', px: 6, paddingTop: '150px'}}>
            <Box>
                <Header />
            </Box>
            <Box sx={{ maxWidth: '850px', mx: 'auto', px: 6, mt: -15 }}>
                <Editor mode={mode} />
            </Box>
        </Box>
    );
};

export default CreateNewPost;
