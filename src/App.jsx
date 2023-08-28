import React, {useEffect, useRef} from 'react';
import {useMediaQuery, CssBaseline, ThemeProvider} from '@mui/material';
import {lightTheme, darkTheme} from './themProvider';
import Posts from "./pages/Posts.jsx";
import {useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateNewPost from "./pages/CreateNewPost.jsx";
import PostView from "./pages/PostView.jsx";
// Redux Config
import store from './reducer/store';
import {Provider} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import MusicFoldersPage from "./pages/MusicFoldersPage";
import MusicPlayer from "./pages/MusicPlayer";


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
                <Route path="/posts/:id" element={<PostView/>}/>
                <Route path="/edit-post/:id" element={<CreateNewPost mode="edit"/>}/>
                <Route path="/" element={<Posts/>}/>
                <Route path="/Music" element={<MusicFoldersPage/>}/>
                <Route path="/Music/MusicPlayer/:id" element={<MusicPlayer/>}/>
                <Route path="/HomePage" element={<HomePage/>}/>
                <Route path="/create-new-posts" element={<CreateNewPost mode="create" postId={'0'}/>}/>
              </Routes>
            </ThemeProvider>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
