import * as React from 'react'

import { Ibeer } from '../interface'

export interface IbeerStore {
  beers: Ibeer[]
  selectedBeers: { [id: string]: Ibeer }
  addBeerToCart?: (beer: Ibeer) => {}
  removeBeerFromCart?: (id: number) => {}
}

export const defaultBeerStore = {
  beers: [],
  selectedBeers: {},
  addBeerToCart: (beer: Ibeer) => {
    alert(1 + 2)
  },
  removeBeerFromCart: (id: number) => {
    alert(1 + 2)
  },
}

export const BeerContext = React.createContext(defaultBeerStore)
