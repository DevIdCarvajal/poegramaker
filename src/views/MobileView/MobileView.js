import { useState, useEffect } from "react";
import PoemOptions from "../PoemOptions/PoemOptions";
import PoemViewer from "../PoemViewer/PoemViewer";
import Poemaker from "../../components/Poemaker/Poemaker";
import logo from "../PoemOptions/assets/logo.svg";
import "./MobileView.css";

function MobileView() {
  const [options, setOptions] = useState({});
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chips, setChips] = useState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setPoem(null);
    let timer = setTimeout(() => {
      setPoem({
        paragraphs: options.paragraphs,
        verses: options.verses,
        text: Poemaker(
          options.paragraphs,
          options.verses,
          options.book,
          options.author
        ),
      });
      setChips([
        options.author === '1'? 'Federico García Lorca' : 'Rosalía de Castro',
        'Poeta en Nueva York',
        `${options.paragraphs} estrofas`,
        `${options.verses} versos`
      ]);
      setLoading(false);
    }, 12000);
    return () => clearTimeout(timer)
  }, [options]);

  // useEffect(() => {
  //   poem?.paragraphs ? setStep(1) : setStep(0);
  // }, [poem]); 

  const getValues = (values) => {
    setOptions(values);
    setLoading(true);
    setStep(1)
  };

  const getStep = (step) => {
    setStep(step)
  }

  return (
    <div className="mobileView">
      {step < 1 ? (
        <div className="options-container">
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
            <p className="logo-text">Random Poetry</p>
          </div>
          <div className="poem-options-container">
            <PoemOptions getValues={getValues} loading={loading}/>
          </div>
        </div>
      ) : (
        <div className="viewer-container">
          <PoemViewer
            poem={poem}
            loading={loading}
            chips={chips}
            mobile={true}
            getStep={getStep}
          />
        </div>
      )}
    </div>
  );
}

export default MobileView;
