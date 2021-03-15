import './PoemViewer.scss'


const PoemViewer = (props) => {
  const { verses, text } = props.poem;

  const renderPoem = () => {
    return text.map((verse, index) => 
        <p className={`${!((index + 1)%verses) && "last-"}verse mainContainer__line`} key={`verse-${index}`}>
          {verse.split('').map(e => <span className="mainContainer--fading-in" key={`verse-letter-${index}`}>{e}</span> )}
        </p> 
    )
  };
  return <div className="mainContainer">{renderPoem()}</div>;
}

export default PoemViewer;
