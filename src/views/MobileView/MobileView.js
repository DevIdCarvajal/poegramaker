import { useState, useEffect } from "react";
import PoetryProvider from '../../providers/PoetryProvider.class'
import PoemOptions from "../PoemOptions/PoemOptions";
import PoemViewer from "../PoemViewer/PoemViewer";
import Poemaker from "../../components/Poemaker/Poemaker";
import logo from "../PoemOptions/assets/logo.svg";
import "./MobileView.css";

function MobileView() {
  const [options, setOptions] = useState({});
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chips, setChips] = useState([]);
  const [step, setStep] = useState(0);

  const poetryData = new PoetryProvider()

  useEffect(async() => {
    setPoem(null);
    if(options?.author && options?.paragraphs && options?.verses && options?.book){
      const result = await Poemaker(options.paragraphs, options.verses, options.book, options.author)
      const selectedAuthors = await getAllAuthors()
      const selectedBooks = await getAllBooks(options.author)
      setPoem({
        paragraphs: options.paragraphs,
        verses: options.verses,
        text: result
      });
      setChips([
        `${selectedAuthors.filter(e => e._id === options.author)[0].name}`,
        `${selectedBooks.filter(e => e._id === options.book)[0].title}`,
        `${options.paragraphs} estrofas`,
        `${options.verses} versos`
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 12000);
    }

  }, [options]);

  const getAllAuthors = () => poetryData.getAuthors().then(res => res)
  const getAllBooks = (id) => poetryData.getBooksByAuthor(id).then(res => res)

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
