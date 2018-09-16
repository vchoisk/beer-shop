import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Ibeer, Ipurchase } from '../interface'
import { Button } from '../widgets/Button'
import { BeerCard } from '../widgets/BeerCard'
import { BeerContext } from '../context/BeerContext'

import { purchaseBeers } from '../api/api'

import shopBagIcon from '../asset/icons/shopBag.svg'

export const Cart = (props: RouteComponentProps) => {
  const handleDirectToUrl = (path: string) => {
    props.history.push(path)
  }

  const handlePurchase = async (purchaseList: Ipurchase[], cb: () => void) => {
    try {
      const response = await purchaseBeers(purchaseList)

      if (response) {
        console.log(
          `요청하신 맥주 총 ${
            response.totalCount
          }병의 주문이 완료되었습니다. \n 주문금액 총 ${
            response.totalPrice
          }원이 결제 되었습니다.`
        )
      }

      cb()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BeerContext.Consumer>
      {beerContext => {
        const selectedBeerList = Object.keys(beerContext.selectedBeers)
          .filter((id: string) => beerContext.selectedBeers[id].count >= 1)
          .map((id: string) => beerContext.selectedBeers[id].beer)

        return (
          <div className="content cart">
            {selectedBeerList.length >= 1 ? (
              <React.Fragment>
                <div className="cart__beer-card-list">
                  {selectedBeerList.map((beer: Ibeer) => (
                    <BeerCard
                      key={beer.id}
                      beer={beer}
                      count={
                        beerContext.selectedBeers[beer.id] &&
                        beerContext.selectedBeers[beer.id].count
                      }
                      cartCard
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
                    총 구매수량
                    {'  '}
                    <span className="cart__total-value">
                      {Object.keys(beerContext.selectedBeers).reduce(
                        (count: number, id: string) =>
                          count + beerContext.selectedBeers[id].count,
                        0
                      )}
                    </span>
                    {'  '}개
                  </div>
                  <div className="cart__total-amount">
                    총 결제금액
                    {'  '}
                    <span className="cart__total-value">
                      {Object.keys(beerContext.selectedBeers).reduce(
                        (price: number, id: string) =>
                          price +
                          beerContext.selectedBeers[id].count *
                            beerContext.selectedBeers[id].beer.price,
                        0
                      )}
                    </span>
                    {'  '}원
                  </div>
                </div>

                <Button
                  className="cart__purchase-button"
                  primary
                  variant="contained"
                  fullWidth
                  onClick={handlePurchase.bind(
                    null,
                    Object.keys(beerContext.selectedBeers)
                      .filter(
                        (id: string) => beerContext.selectedBeers[id].count >= 1
                      )
                      .map((id: string) => ({
                        id,
                        count: beerContext.selectedBeers[id].count,
                      })),
                    beerContext.resetCart
                  )}
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
