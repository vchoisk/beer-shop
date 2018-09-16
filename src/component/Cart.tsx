import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Ibeer } from '../interface'
import { Button } from '../widgets/Button'
import { BeerCard } from '../widgets/BeerCard'
import { BeerContext } from '../context/BeerContext'

import shopBagIcon from '../asset/icons/shopBag.svg'

export const Cart = (props: RouteComponentProps) => {
  const handleDirectToUrl = (path: string) => {
    props.history.push(path)
  }

  return (
    <BeerContext.Consumer>
      {beerContext => {
        const selectedBeerList = beerContext.beers.filter(
          (beer: Ibeer) =>
            beerContext.selectedBeers[beer.id] &&
            beerContext.selectedBeers[beer.id] > 0
        )

        return (
          <div className="content cart">
            {selectedBeerList.length >= 1 ? (
              <React.Fragment>
                <div className="cart__beer-card-list">
                  {selectedBeerList.map((beer: Ibeer) => (
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
                    총 결제금액{' '}
                    <span className="cart__total-value">{10000}</span>원
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
              </React.Fragment>
            ) : (
              <div className="cart__empty-container">
                <div className="cart__empty-img">
                  <img src={shopBagIcon} alt="쇼핑백이 비었네요" />
                </div>
                <div className="cart__empty-statement">카트가 비었습니다</div>
                <div className="cart__empty-guidance">
                  목록에서 원하는 맥주를 <br />
                  카트에 담아보세요
                </div>
                <Button
                  className="cart__purchase-button"
                  primary
                  variant="contained"
                  fullWidth
                  onClick={handleDirectToUrl.bind(null, '/')}
                >
                  <span className="cart__empty-direct-button">
                    목록으로 가기
                  </span>
                </Button>
              </div>
            )}
          </div>
        )
      }}
    </BeerContext.Consumer>
  )
}
