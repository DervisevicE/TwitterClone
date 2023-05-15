import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const location = useLocation();
  const { pathname } = location;

  const {user} = useAuthContext();

  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';


  return (
    <div className="App"> 
       {user && <LeftBar className="left" />}
      <div className='main'>
        {/* <DataProvider> */}
          <Routes>
            <Route path='/login' element={!user ? <LogInPage /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
            
            <Route path='/' element={user ? <Feed /> : <Navigate to='/login' />} />
            <Route path='/home' element={user ? <Feed /> : <Navigate to='/login' />} />
            <Route path='/explore' element={user ? <Explore /> : <Navigate to='/login' />} />
            <Route path='/notifications' element={user ? <Notifications /> : <Navigate to='/login' />} />
            <Route path='/bookmarks' element={user ? <Bookmarks /> : <Navigate to='/login' />} />
          </Routes>
        {/* </DataProvider> */}
      </div>
      {user && <RightBar className="right" tweets={tweets} />}
      {/* {!isLoginPage && !isSignupPage && <RightBar className="right" tweets={tweets} />} */}
    </div>
  );
}

export default App;
