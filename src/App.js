 
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PoemOptions from './views/PoemOptions'
import PoemViewer from './views/PoemViewer'
import Poemaker from './components/Poemaker/Poemaker'

function App() {

  const [options, setOptions] = useState({})
  const [poem, setPoem] = useState([])
  


  useEffect(() => {
    setPoem(Poemaker(options.paragraphs, options.verses, options.book, options.author)) 
    console.log(poem)
  }, [options])

  const getValues = (values) =>{
    setOptions(values)
    console.log("getValues en app", values)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <PoemOptions getValues={getValues}/>} />
          <Route path="/poemviewer" exact render={(props) => <PoemViewer poem={poem}/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
