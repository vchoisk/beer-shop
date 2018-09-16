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
      resetCart: this.resetCart,
    })
  }

  public addBeerToCart = (beer: Ibeer) => {
    const newSelectedBeers = Object.assign({}, this.state.selectedBeers)

    if (newSelectedBeers[beer.id]) {
      newSelectedBeers[beer.id].count = newSelectedBeers[beer.id].count + 1
    } else {
      newSelectedBeers[beer.id] = { count: 1, beer }
    }

    this.setState(
      Object.assign({}, this.state, { selectedBeers: newSelectedBeers })
    )
  }

  public removeBeerFromCart = (id: number) => {
    const newSelectedBeers = Object.assign({}, this.state.selectedBeers)

    if (newSelectedBeers[id] && newSelectedBeers[id].count > 0) {
      newSelectedBeers[id].count = newSelectedBeers[id].count - 1
    }

    this.setState(
      Object.assign({}, this.state, { selectedBeers: newSelectedBeers })
    )
  }

  public resetCart = async () => {
    this.setState({ selectedBeers: {} })
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
