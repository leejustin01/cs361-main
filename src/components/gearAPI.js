import { useEffect, useState } from "react";

const GearAPI = ({ input }) => {
  const [data, setData] = useState([]);
  const [gears, setGears] = useState([]);
  const [display, setDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://brawlstarsapi.p.rapidapi.com/gears",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "fd81c6c785mshb09b58a598812a6p1a2d24jsnb60617158f8b",
            "x-rapidapi-host": "brawlstarsapi.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      updateGears();
    }
  };

  const updateGears = () => {
    const gearNames = data.map(gear => gear.name);
    setGears(gearNames);
  };

  const updateDisplay = (search) => {
    let temp = [];
    const searchLowerCase = search.toLowerCase();
    for (let gear of gears) {
      if (gear.toLowerCase().includes(search)) {
        temp.push(gear);
      }
    }
    setDisplay(temp);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateGears();
  }, [data]);

  useEffect(() => {
    updateDisplay(input);
  }, [input]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="container">
        {display.map((gear, i) => (
          <span key={i} className="item">{gear}</span>
        ))}
      </div>
    </div>
  );
};

export default GearAPI;
