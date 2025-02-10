import './App.css';
import { useState, useEffect } from 'react';
import Display from './components/display';
import { fetchBrawlers, fetchGears } from './api';
import { RxSwitch } from "react-icons/rx";


function App() {
  const [mode, setMode] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [brawlers, setBrawlers] = useState([]);
  const [gears, setGears] = useState([]);
  const [display, setDisplay] = useState([]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const changeMode = () => {
    setMode(!mode);
  };


  useEffect(() => {
    const fetchAll = async () => {
      const brawlerRes = await fetchBrawlers();
      const gearsRes = await fetchGears();
      setBrawlers(brawlerRes);
      setGears(gearsRes);
      setDisplay(brawlerRes);
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const updateDisplay = (search) => {
      let temp = [];
      const dis = mode ? brawlers : gears;
      const searchLowerCase = search.toLowerCase();
      for (let item of dis) {
        if (item.toLowerCase().includes(searchLowerCase)) {
          temp.push(item);
        }
      }
      setDisplay(temp);
    }

    updateDisplay(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (mode) {
      setDisplay(brawlers);
    } else {
      setDisplay(gears);
    }
  }, [mode]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to brawlstars.gg</h1>
        <p>All the information you need to be the best brawler.</p>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search!..."/>
        <RxSwitch  onClick={changeMode}/>
        <Display arr={display}/>
      </header>
    </div>
  );
}

export default App;
