const PoemViewer = (props) => {
  return (
    <div>
      {props.map(verse => `${verse}<br>`)}
    </div>
  );
};