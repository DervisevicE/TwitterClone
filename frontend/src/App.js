import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Feed from './pages/Feed/Feed';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import LogInPage from './pages/LogInPage/LogInPage';
import tweets from './data.json';
import DataProvider from './DataProvider';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {

  const location = useLocation();
  const { pathname } = location;

  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';


  return (
    <div className="App"> 
       <LeftBar className="left" />
      <div className='main'>
        <DataProvider>
          <Routes>
            <Route path='/login' element={<LogInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/' element={<Feed />} />
            <Route path='/home' element={<Feed />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
          </Routes>
        </DataProvider>
      </div>
      {/* {!isLoginPage && !isSignupPage && <RightBar className="right" tweets={tweets} />} */}
    </div>
  );
}

export default App;
