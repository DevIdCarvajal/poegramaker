const PoemViewer = ({poem}) => {
  return (
    <div>
      {poem.map(verse => `${verse}<br>`)}
    </div>
  );
};

export default PoemViewer