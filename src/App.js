import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PoemOptions from './views/PoemOptions.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={PoemOptions} />
          <Route path="/poemviewer" exact component={() => {}} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
