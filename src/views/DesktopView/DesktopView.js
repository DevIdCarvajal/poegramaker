import { useState, useEffect } from "react";
import PoemOptions from "../PoemOptions/PoemOptions";
import PoemViewer from "../PoemViewer/PoemViewer";
import Poemaker from "../../components/Poemaker/Poemaker";
import logo from "../PoemOptions/assets/logo.svg";
import "./DesktopView.css";

function DesktopView() {
  const [options, setOptions] = useState({});
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chips, setchips] = useState([]);
  const [mobile, setMobile] = useState(false);


  useEffect(() => {
    setPoem(null);
    setTimeout(() => {
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
      setchips([
        options.author,
        options.book,
        options.paragraphs,
        options.verses,
      ]);
      setLoading(false);
    }, 5000);
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
          <PoemOptions getValues={getValues} />
        </div>
      </div>
      <div className="viewer-container-desktop">
        <PoemViewer
          poem={poem}
          loading={loading}
          chips={chips}
          mobile={mobile}
        />
      </div>
    </div>
  );
}

export default DesktopView;
