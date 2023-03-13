import './App.css';
import Feed from './components/Feed/Feed';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';

function App() {
  return (
    <div className="App">
      <LeftBar/>
      <Feed/>
      <RightBar/>
    </div>
  );
}

export default App;
