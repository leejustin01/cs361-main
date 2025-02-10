const Display = ({ arr }) => {
  return (
    <div>
      <div className="container">
        {arr.map((item, i) => (
          <span key={i} className="item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Display;
