import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { TweetsContextProvider } from './context/TweetContext';
import { LikesContextProvider } from './context/LikeContext';
import { CommentsContextProvider } from './context/CommentContext';
import { BookmarksContext, BookmarksContextProvider } from './context/BookmarkContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TweetsContextProvider>
        <LikesContextProvider>
          <CommentsContextProvider>
            <BookmarksContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </BookmarksContextProvider>
          </CommentsContextProvider>
        </LikesContextProvider>
      </TweetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

