import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './Home'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
