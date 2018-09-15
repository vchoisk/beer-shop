import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from './Routes'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
