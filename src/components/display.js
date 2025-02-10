const Display = ({ arr, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="container">
        {arr.map((item, i) => (
          <span key={i} className="item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Display;
