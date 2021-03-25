import { useState, useEffect } from "react";
import PoemOptions from "../PoemOptions/PoemOptions";
import PoemViewer from "../PoemViewer/PoemViewer";
import Poemaker from "../../components/Poemaker/Poemaker";
import logo from "../PoemOptions/assets/logo.svg";
import "./DesktopView.css";

function DesktopView() {
  const [options, setOptions] = useState(null);
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chips, setchips] = useState([]);
  // const [mobile, setMobile] = useState(false);


  useEffect(async () => {
    if(options){
      const result = await Poemaker(options.paragraphs, options.verses, options.book, options.author)
      const text = result
      console.log("text en DESKTOPVIEW", text)
      setPoem(null);
      console.time("label")
      console.log("use effect")
      setTimeout(() => {
        setPoem({
          paragraphs: options.paragraphs,
          verses: options.verses,
          text: text
        });
        setchips([
          options.author, // HAY QUE VER ESTO !!!!
          options.book,
          options.paragraphs,
          options.verses,
        ]);
        setLoading(false);
        console.timeEnd("label")
      }, 12000);
    }
  }, [options]);

  const getValues = (values) => {
    setOptions(values);
    setLoading(true);
  };

  return (
    <div className="DesktopView">
      <div className="options-container-desktop">
        <div className="logo-container-desktop">
          <img src={logo} alt="logo" className="logo-desktop" />
          <p className="logo-text-desktop">Random Poetry</p>
        </div>
        <div className="poem-options-container-desktop">
          <PoemOptions getValues={getValues} loading={loading}/>
        </div>
      </div>
      <div className={`viewer-container-desktop ${loading ? 'no-img' : ''}`}>
        <PoemViewer
          poem={poem}
          loading={loading}
          chips={chips}
          mobile={false}
        />
      </div>
    </div>
  );
}

export default DesktopView;
