import { Route, Routes } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed/Feed';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';
import Explore from './components/Explore/Explore';
import Notifications from './components/Notifications/Notifications';
import Bookmarks from './components/Bookmarks/Bookmarks';
import tweets from './data.json';

function App() {
  return (
    <div className="App">
      <LeftBar className="lefttest" />

      <div className='main'>
        <Routes>
          <Route path='/' element={<Feed tweets={tweets} />} />
          <Route path='/home' element={<Feed tweets={tweets} />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
        </Routes>
      </div>
      <RightBar className="righttest" tweets={tweets} />
    </div>
  );
}

export default App;
