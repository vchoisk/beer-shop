import * as React from 'react'

import { Ibeer } from '../interface'

export interface IBeerCardProps {
  beer: Ibeer
}

export class BeerCard extends React.Component<IBeerCardProps, {}> {
  public render() {
    return <div>{this.props.beer.name}</div>
  }
}
