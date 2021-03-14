import './PoemViewer.css'
const PoemViewer = (props) => {
  const { verses, text } = props.poem;

  const renderPoem = () => {
    return text.map((verse, index) => 
        <p className={`${!((index + 1)%verses) && "last-"}verse`} key={`verse-${index}`}>{verse}</p> 
    )
  };
  return <div>{renderPoem()}</div>;
}

export default PoemViewer;
