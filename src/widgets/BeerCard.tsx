import * as React from 'react'

import { Button } from '../widgets/Button'

import { Ibeer, Itag } from '../interface'
import beerImg from '../asset/beer_x1.png'

export interface IBeerCardProps {
  beer: Ibeer
}

export class BeerCard extends React.Component<IBeerCardProps, {}> {
  public render() {
    return (
      <div className="beer-card">
        <div className="beer-card__img-container">
          <img src={beerImg} alt={this.props.beer.name} />
        </div>

        <div className="beer-card__information">
          <div className="beer-card__name">{this.props.beer.name}</div>
          <div className="beer-card__tags">
            {this.props.beer.tags.map((tag: Itag) => (
              <span className="beer-card__tag" key={tag.key}>
                {tag.name}
              </span>
            ))}
          </div>
          <div className="beer-card__price">
            {this.props.beer.price}
            <span>원</span>
          </div>
          <div className="beer-card__counts">
            <div className="beer-card__stock-count">
              <span className="beer-card__stock-label">재고</span>
              {this.props.beer.stock}
            </div>
            <div className="beer-card__card-count">
              <span className="beer-card__count-label">수량</span>
              {this.props.beer.name}
            </div>
          </div>
        </div>
        <div className="beer-card__buttons">
          <Button secondary variant="contained">
            <span>빼기</span>
          </Button>
          <Button primary variant="contained">
            <span>담기</span>
          </Button>
        </div>
      </div>
    )
  }
}
