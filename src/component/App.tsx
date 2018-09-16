import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from './Routes'
import { BeerContext, defaultBeerStore } from '../context/BeerContext'

import { fetchBeers } from '../api/api'
import { Ibeer } from '../interface'

class App extends React.Component<{}, {}> {
  public state = {
    ...defaultBeerStore,
  }

  public componentDidMount = async () => {
    const beers = await fetchBeers()

    this.setState({
      beers,
      selectedBeers: {},
      addBeerToCart: this.addBeerToCart,
      removeBeerFromCart: this.removeBeerFromCart,
    })
  }

  public addBeerToCart = (beer: Ibeer) => {
    const newSelectedBeers = Object.assign({}, this.state.selectedBeers)

    newSelectedBeers[beer.id] = newSelectedBeers[beer.id]
      ? newSelectedBeers[beer.id] + 1
      : 1

    this.setState(
      Object.assign({}, this.state, { selectedBeers: newSelectedBeers })
    )
  }

  public removeBeerFromCart = (id: number) => {
    const newSelectedBeers = Object.assign({}, this.state.selectedBeers)

    if (newSelectedBeers[id] && newSelectedBeers[id] > 0) {
      newSelectedBeers[id] = newSelectedBeers[id] - 1
    }

    this.setState(
      Object.assign({}, this.state, { selectedBeers: newSelectedBeers })
    )
  }

  public render() {
    return (
      <div className="app">
        <BrowserRouter>
          <BeerContext.Provider value={this.state}>
            <Routes />
          </BeerContext.Provider>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
