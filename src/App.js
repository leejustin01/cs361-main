import './App.css';
import { useState, useEffect } from 'react';
import Display from './components/display';
import { fetchBrawlers, fetchGears } from './api';
import { RxSwitch } from "react-icons/rx";
import { FaUndo } from "react-icons/fa";


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

  const handleUndo = () => {
    const isConfirmed = window.confirm("Undo pressed! Are you sure you want to undo and lose your search?");
    if (isConfirmed) {
      setInputValue(""); 
      setDisplay(mode ? brawlers : gears); 
    }
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
        <p>The hub of all guides to make you the best brawler. Search to find all the information about any brawler or gear in the game!</p>
        <div className="searchBar">
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search for what you're looking for!"/>
          <FaUndo onClick={handleUndo}/>  
        </div>
        <p>Switch between Brawlers and Gears -{'>'} <RxSwitch  onClick={changeMode}/></p> 
        <Display arr={display} title={mode ? "Brawlers" : "Gears"}/>
        <p>Note: {mode ? "Brawlers" : "Gears"} may take a few minutes to load.</p>
      </header>
    </div>
  );
}

export default App;
