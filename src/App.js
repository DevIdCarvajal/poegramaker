 
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PoemOptions from './views/PoemOptions/PoemOptions'
import PoemViewer from './views/PoemViewer/PoemViewer'
import Poemaker from './components/Poemaker/Poemaker'
import './App.css'

function App() {

  const [options, setOptions] = useState({})
  const [poem, setPoem] = useState(null)
  
  useEffect(() => {
    setPoem({
      paragraphs: options.paragraphs,
      verses: options.verses,
      text: Poemaker(options.paragraphs, options.verses, options.book, options.author)
    }) 
  }, [options])

  const getValues = (values) =>{
    setOptions(values)
  }

  return (
    <div className="App">
      <div className="options-container">
        <PoemOptions getValues={getValues}/>
      </div>
      <div className="viewer-container">
        { poem ? <PoemViewer poem={poem}/> : null }
      </div>
    </div>
  );
}

export default App;
