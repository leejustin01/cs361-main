import {useEffect, useState} from 'react';

const TierList = () => {
    const [mode, setMode] = useState(true);
    const [tierList, setTierList] = useState('');

    const getBrawlerTL = async () => {
        const response = await fetch('http://localhost:8082/brawler/');
        const text = await response.text();
        return text;
    }
    
    const getGearTL = async () => {
        const response = await fetch('http://localhost:8082/gear/');
        const text = await response.text();
        return text;
    }

    const toggleTL = () => {
        setMode(prevMode => !prevMode);
    }

    useEffect(() => {
        const call = async () => {
            if (mode) {
                const link = await getBrawlerTL();
                setTierList(link);
            } else {
                const link = await getGearTL();
                setTierList(link);
            }
        }
        
        call();
    }, [mode])

    return (
      <div className="page">
        <h1>{mode ? "Brawler" : "Gear"} Tier List</h1>
        <img className="tierList" src={tierList || "/brawler_tier_list.png"}></img><br></br>
        <button type="button" onClick={toggleTL}>Switch Tier List</button>
        <a href="/" className="back-link">← Back to Home</a>
      </div>
    );
};

export default TierList;
