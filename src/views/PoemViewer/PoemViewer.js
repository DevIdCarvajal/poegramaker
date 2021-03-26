import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import Chip from "../../components/Chip/Chip";
import goBackIcon from '../MobileView/assets/go-back.svg'
import "./PoemViewer.scss";

const PoemViewer = (props) => {
  // const { verses, text, author, paragraphs, book } = props.poem;
  
  const { loading, chips, mobile, poem, getStep } = props;
  const [poemToRender, setPoemToRender] = useState(null)

  useEffect(() => {
    if(poem){
      setPoemToRender(poem)
    }
  }, [poem])

  const renderPoem = () => {
    console.log("poem en poemviewer", poemToRender)
    if(poemToRender?.text){
      return poemToRender.text.map((verse, index) => (
        <p
          className={`${!((index + 1) % poem.verses) ? "last-" : ''}verse mainContainer__line`}
          key={`verse-${index}`}
        >
          {verse.split("").map((e, j) => (
            <span
              className={`mainContainer--fading-in`}
              key={`verse-letter-${index}-${j}`}
            >
              {e}
            </span>
          ))}
        </p>
      ));
    } else {
      return <p className="mainContainer__line">En este momento no podemos encontrar la obra del autor o la autora que buscas. Por favor, intenta seleccionando otra opción.</p>
    }
  };

  const renderChips = () => {
    return chips.map((text, i) => <Chip key={`chip-${i}`} text={text} />);
  };

  const handleClick = () => {
    getStep(0)
  }


  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="mainContainer">
          <div className="chip-container">{mobile ? renderChips() : null}</div>
          <div className="poem-container">
            {poem ? renderPoem() : null}
          </div>
          {mobile ? (
            <button className="back-button" onClick={handleClick}>
              <img src={goBackIcon} alt="atrás" className="back-button-img"/>
            </button>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

export default PoemViewer;
