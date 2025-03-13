import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';

const Details = () => {
  const { name, title } = useParams();

  const [description, setDescription] = useState('');


  const callRetrieval = async (name, title) => {
    const slug = title === 'Brawlers' ? 'brawler' : 'gear';
    const response = await fetch('http://localhost:8080/' + slug + '/' + name);
    const json = await response.json();
    setDescription(json.description);
  }

  useEffect(() => {
    const call = async () => {
      await callRetrieval(name, title);
    }

    call();
  }, [])

  return (
    <div className="page">
      <h2>Details for {name}</h2>
      <div className="description-container">
        <p className="description">{description || 'No details available for this item.'}</p>
      </div>
      <a href="/" className="back-link">← Back to Home</a>
      <p>Note: all information is gathered from:</p>
      <a className="back-link" href="https://brawlstars.fandom.com/wiki/Brawl_Stars_Wiki">https://brawlstars.fandom.com/wiki/Brawl_Stars_Wiki</a>
    </div>
  );
};

export default Details;
