import React, {useEffect, useRef} from 'react';
import { useMediaQuery, CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './themProvider';
import HomePage from "./pages/HomePage";
import { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateNewPost from "./pages/CreateNewPost.jsx";

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode],
  );

  const observer = useRef(null);

  useEffect(() => {
    const ckEditorContentClass = document.querySelector('.ck.ck-content');

    if (ckEditorContentClass) {
      const applyStyles = () => {
        ckEditorContentClass.style.backgroundColor = theme.palette.background.default;
        ckEditorContentClass.style.color = theme.palette.text.primary;
      };

      applyStyles();

      // Initialize a MutationObserver
      observer.current = new MutationObserver(applyStyles);

      // Start observing the target node for configured mutations
      observer.current.observe(ckEditorContentClass, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    // Clean up the observer on unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes> {/* Use Routes to handle routing */}
            <Route path="/" element={<HomePage/>}/> {/* Define a route for the HomePage */}
            <Route path="/create-new-post" element={<CreateNewPost/>}/> {/* Define a route for the HomePage */}
            {/* Add more routes for other pages as needed */}
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
