import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { TweetsContextProvider } from './context/TweetContext';
import { LikesContextProvider } from './context/LikeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TweetsContextProvider>
        <LikesContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LikesContextProvider>
      </TweetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

