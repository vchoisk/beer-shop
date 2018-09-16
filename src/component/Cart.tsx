import * as React from 'react'

import { Ibeer } from '../interface'

import { Button } from '../widgets/Button'
import { BeerCard } from '../widgets/BeerCard'
import { BeerContext } from '../context/BeerContext'

export const Cart = () => {
  return (
    <BeerContext.Consumer>
      {beerContext => {
        return (
          <div className="content cart">
            <div className="cart__beer-card-list">
              {beerContext.beers.map((beer: Ibeer) => (
                <BeerCard
                  key={beer.id}
                  beer={beer}
                  count={beerContext.selectedBeers[beer.id]}
                  handleAddBeer={beerContext.addBeerToCart.bind(null, beer)}
                  handleRemoveBeer={beerContext.removeBeerFromCart.bind(
                    null,
                    beer.id
                  )}
                />
              ))}
            </div>

            <div className="cart__summary">
              <div className="cart__total-count">
                총 구매수량 <span className="cart__total-value">{1}</span>개
              </div>
              <div className="cart__total-amount">
                총 결제금액 <span className="cart__total-value">{10000}</span>원
              </div>
            </div>

            <Button
              className="cart__purchase-button"
              primary
              variant="contained"
              fullWidth
            >
              <span className="cart__purchase-button-text">구매하기</span>
            </Button>
          </div>
        )
      }}
    </BeerContext.Consumer>
  )
}
