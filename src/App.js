import './App.css';
import { useState } from 'react';
import BrawlerAPI from './components/brawlerAPI';
import GearAPI from './components/gearAPI';
import { RxSwitch } from "react-icons/rx";


function App() {
  const [mode, setMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const changeMode = () => {
    setMode(!mode);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to brawlstars.gg</h1>
        <p>All the information you need to be the best brawler.</p>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search!..."/>
        <RxSwitch  onClick={changeMode}/>
        {mode ? <BrawlerAPI input={inputValue}/> : <GearAPI input={inputValue}/>}
      </header>
    </div>
  );
}

export default App;
