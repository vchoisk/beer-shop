import * as React from 'react'

import { Ibeer } from '../interface'

export interface IBeerCardProps {
  beer: Ibeer
}

export class BeerCard extends React.Component<IBeerCardProps, {}> {
  public render() {
    return (
      <div className="beer-card">
        <div className="beer-card__img-container">{this.props.beer.name}</div>
        <div className="beer-card__information">{this.props.beer.name}</div>
        <div className="beer-card__buttons">{this.props.beer.name}</div>
      </div>
    )
  }
}
