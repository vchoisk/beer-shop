import * as React from 'react'

import { Button } from '../widgets/Button'

import { Ibeer, Itag } from '../interface'
import beerImg from '../asset/beer_x1.png'

export interface IBeerCardProps {
  beer: Ibeer
  count?: number
  handleAddBeer?: (beer: Ibeer) => {}
  handleRemoveBeer?: (id: number) => {}
}

export const BeerCard = (props: IBeerCardProps) => (
  <div className="beer-card">
    <div className="beer-card__img-container">
      <img src={beerImg} alt={props.beer.name} />
    </div>

    <div className="beer-card__information">
      <div className="beer-card__name">{props.beer.name}</div>
      <div className="beer-card__tags">
        {props.beer.tags.map((tag: Itag) => tag.name).join(', ')}
      </div>
      <div className="beer-card__price">
        {props.beer.price}
        <span className="beer-card__price-label">원</span>
      </div>
      <div className="beer-card__counts">
        <div className="beer-card__stock-count">
          <span className="beer-card__stock-label">재고</span>
          {props.beer.stock}
        </div>
        <div className="beer-card__cart-count">
          <span className="beer-card__count-label">수량</span>
          {props.beer.name}
        </div>
      </div>
    </div>
    <div className="beer-card__buttons">
      <Button
        className="beer-card__button-subtract"
        secondary
        variant="contained"
      >
        <span>빼기</span>
      </Button>
      <Button className="beer-card__button-add" primary variant="contained">
        <span>담기</span>
      </Button>
    </div>
  </div>
)
