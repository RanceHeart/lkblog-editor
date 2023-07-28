import React, {useEffect, useRef} from 'react';
import {useMediaQuery, CssBaseline, ThemeProvider} from '@mui/material';
import {lightTheme, darkTheme} from './themProvider';
import HomePage from "./pages/HomePage";
import {useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateNewPost from "./pages/CreateNewPost.jsx";
import PostView from "./components/PostView/postView.jsx";
// Redux Config
import store from './reducer/store';
import {Provider} from "react-redux";


const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode],
  );

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Routes> {/* Use Routes to handle routing */}
                <Route path="/post/:id" element={<PostView/>}/>
                <Route path="/edit-post/:id" element={<CreateNewPost mode="edit"/>}/>
                <Route path="/" element={<HomePage/>}/> {/* Define a route for the HomePage */}
                <Route path="/create-new-post" element={<CreateNewPost mode="create"/>}/>
                {/* Add more routes for other pages as needed */}
              </Routes>
            </ThemeProvider>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
