import '../App.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Display from '../components/display';
import { fetchBrawlers, fetchGears } from '../api';
import { RxSwitch } from "react-icons/rx";
import { FaUndo } from "react-icons/fa";


function Home() {
  const { username } = useParams();

  const [mode, setMode] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [brawlers, setBrawlers] = useState([]);
  const [gears, setGears] = useState([]);
  const [display, setDisplay] = useState([]);
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setType(event.target.value);
  }

  const handleRarityFilterChange = (event) => {
    setRarity(event.target.value);
  }

  const changeMode = () => {
    setMode(!mode);
  };

  const handleUndo = () => {
    const isConfirmed = window.confirm("Undo pressed! Are you sure you want to undo and lose your search?");
    if (isConfirmed) {
      setInputValue("");
      setType("");
      setRarity(""); 
      setDisplay(mode ? brawlers : gears); 
    }
  };

  const callFilter = async (options) => {
    let url = 'http://localhost:8083/brawlers';
    const hasType = options.type !== 'none';
    const hasRarity = options.rarity !== 'none';
    if (!hasType && !hasRarity) return [];
    if (hasType) url += '?type=' + options.type;
    if (hasRarity) {
        if (hasType) url += '&';
        else url += '?';
        url += 'rarity=' + options.rarity;
    }
    //{ mode: 'no-cors' }
    const response = await fetch(url);
    const json = await response.json();
    const temp = json.map(brawler => brawler.name);
    return temp;
  }

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
  }, [mode, brawlers, gears]);

  useEffect(() => {
    console.log(type);
  }, [type]);

  useEffect(() => {
    console.log(rarity);
  }, [rarity]);

  useEffect(() => {
    const filterDisplay = async () => {
      const dis = await callFilter({ "type": type, "rarity": rarity });
      if (dis.length > 0) {
        setDisplay(dis);
        setInputValue('');
        setMode(true);
      }
      else setDisplay(brawlers);
    }
    
    filterDisplay();
  }, [type, rarity]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-bar">
          <Link className="login-link" to="/login">{username ? `Welcome back, ${username}` : "Login or create an account "}</Link>
          <Link className="tierlist-link" to="/tier-list">Tier List</Link>
        </div>
        <h1>Welcome to brawlstars.gg</h1>
        <p>The hub of all guides to make you the best brawler. Search to find all the information about any brawler or gear in the game!</p>
        <div className="searchBar">
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Search for what you're looking for!"/>
          <FaUndo onClick={handleUndo}/>
        </div>
        <div className="filter">
        <label for="rarityFilter">Filter brawlers </label>
          <select name="rarityFilter" id="rarityFilter" onChange={handleRarityFilterChange} value={rarity}>
            <option value="">Select a rarity</option>
            <option value="Rare">Rare</option>
            <option value="Super rare">Super Rare</option>
            <option value="Epic">Epic</option>
            <option value="Mythic">Mythic</option>
            <option value="Legendary">Legendary</option>
          </select>

          <label for="typeFilter"> </label>
          <select name="typeFilter" id="typeFilter" onChange={handleTypeFilterChange} value={type}>
            <option value="">Select a type</option>
            <option value="Damage Dealer">Damage Dealer</option>
            <option value="Tank">Tank</option>
            <option value="Assassin">Assassin</option>
            <option value="Controller">Controller</option>
            <option value="Marksman">Marksman</option>
            <option value="Support">Support</option>
            <option value="Artillery">Artillery</option>
          </select>
        </div>
        <p>Switch between Brawlers and Gears -{'>'} <RxSwitch  onClick={changeMode}/></p> 
        <Display arr={display} title={mode ? "Brawlers" : "Gears"}/>
        <p>Note: {mode ? "Brawlers" : "Gears"} may take a few minutes to load.</p>
      </header>
    </div>
  );
}

export default Home;
