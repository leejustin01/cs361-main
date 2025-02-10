import API_KEY from './api_key'

const fetchBrawlers = async () => {
  const url = "https://brawlstarsapi.p.rapidapi.com/brawlers";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "brawlstarsapi.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const brawlers = data.map(brawler => brawler.name);
    return brawlers;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const fetchGears = async () => {
  const url = "https://brawlstarsapi.p.rapidapi.com/gears";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "brawlstarsapi.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const gears = data.map(gear => gear.name);
    return gears;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export { fetchBrawlers, fetchGears };
