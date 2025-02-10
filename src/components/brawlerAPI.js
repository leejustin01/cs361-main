import { useEffect, useState } from "react";

const BrawlerAPI = ({ input }) => {
  const [data, setData] = useState([]);
  const [brawlers, setBrawlers] = useState([]);
  const [display, setDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://brawlstarsapi.p.rapidapi.com/brawlers",
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
      updateBrawlers();
    }
  };

  const updateBrawlers = () => {
    const brawlerNames = data.map(brawler => brawler.name);
    setBrawlers(brawlerNames);
  };

  const updateDisplay = (search) => {
    let temp = [];
    const searchLowerCase = search.toLowerCase();
    for (let brawler of brawlers) {
      if (brawler.toLowerCase().includes(search)) {
        temp.push(brawler);
      }
    }
    setDisplay(temp);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateBrawlers();
  }, [data]);

  useEffect(() => {
    updateDisplay(input);
  }, [input]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="container">
        {display.map((brawler, i) => (
          <span key={i} className="item">{brawler}</span>
        ))}
      </div>
    </div>
  );
};

export default BrawlerAPI;
