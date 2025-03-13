import { Link } from 'react-router-dom';

const Display = ({ arr, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="container">
        { arr.map((item, i) => (<Link to={`/details/${encodeURIComponent(title)}/${encodeURIComponent(item)}`} key={i} className="item-link"><span className="item">{item}</span></Link>))}
      </div>
    </div>
  );
};

export default Display;
