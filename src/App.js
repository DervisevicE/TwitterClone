import './App.css';
import Feed from './components/Feed/Feed';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';
import tweets from './data.json';

function App() {
  return (
    <div className="App">
      <LeftBar />
      <Feed tweets={tweets} />
      <RightBar tweets={tweets} />
    </div>
  );
}

export default App;
