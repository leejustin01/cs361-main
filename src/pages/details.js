import { useParams } from 'react-router-dom';

const ItemDetails = () => {
  const { name } = useParams();

  
  const sampleData = {
    Amber: "Amber is a Legendary Brawler with powerful fire attacks.",
    Shelly: "Shelly is a starting Brawler with a powerful shotgun attack.",
    Spike: "Spike is a Legendary Brawler who shoots spikes in a spread pattern."
  };

  return (
    <div>
      <h2>Details for {name}</h2>
      <p>{sampleData[name] || 'No details available for this item.'}</p>
      <a href="/" className="back-link">← Back to list</a>
    </div>
  );
};

export default ItemDetails;
