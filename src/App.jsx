import React, {useEffect, useRef} from 'react';
import {useMediaQuery, CssBaseline, ThemeProvider} from '@mui/material';
import {lightTheme, darkTheme} from './themProvider';
import HomePage from "./pages/HomePage";
import {useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateNewPost from "./pages/CreateNewPost.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import PostView from "./components/PostView/postView.jsx";

const clientId = "220791246608-tv0u6kd4438ftukgnpjtac37pjlc92lk.apps.googleusercontent.com";


const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

  const theme = useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode],
  );

  return (
    <Router>
      <div className="App">
        <GoogleOAuthProvider clientId={clientId}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes> {/* Use Routes to handle routing */}
              <Route path="/post/:id" element={<PostView/>} />
              <Route path="/" element={<HomePage/>}/> {/* Define a route for the HomePage */}
              <Route path="/create-new-post" element={<CreateNewPost/>}/> {/* Define a route for the HomePage */}
              {/* Add more routes for other pages as needed */}
            </Routes>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </div>
    </Router>
  );
};

export default App;
