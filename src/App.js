 
import { useState, useEffect } from 'react'
import DesktopView from './views/DesktopView/DesktopView'
import MobileView from './views/MobileView/MobileView'
import './App.css'

function App() {

  const [mobile, setMobile] = useState(false)


  useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange);
    console.log("first loading", window.innerWidth)
  }, [])

  const handleWindowSizeChange = () => {
  window.innerWidth >= 768 ? setMobile(false) : setMobile(true)
  }

  return (
    <div className="App">
      {mobile ?
        <MobileView />
      :
        <DesktopView />  
      }
    </div>
  );
}

export default App;
