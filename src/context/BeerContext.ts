import * as React from 'react'

import { Ibeer } from '../interface'

export interface IbeerStore {
  beers: Ibeer[]
  selectedBeers: { [id: string]: Ibeer }
  addBeerToCart?: (beer: Ibeer) => {}
  removeBeerFromCart?: (beer: Ibeer) => {}
}

export const defaultBeerStore = {
  beers: [],
  selectedBeers: {},
  addBeerToCart: undefined,
  removeBeerFromCart: undefined,
}

export const BeerContext = React.createContext(defaultBeerStore)
