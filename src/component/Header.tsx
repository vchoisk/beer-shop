import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'

import menu from '../asset/icons/menu.svg'
import menuSelected from '../asset/icons/menu-selected.svg'
import cart from '../asset/icons/cart.svg'
import cartSelected from '../asset/icons/cart-selected.svg'

class HeaderWithoutRouter extends React.Component<RouteComponentProps, {}> {
  public render() {
    const pathToTextMapper = {
      '/': '맥주담기',
      '/cart': '내 카트',
    }

    return (
      <div className="header">
        <h1 className="header__title">Beer Shop</h1>
        <div className="header__nav-bar nav-bar">
          <div className="nav-bar__current-location">
            {pathToTextMapper[this.props.location.pathname]}
          </div>
          <div className="nav-bar__icon-buttons">
            <img
              className="nav-bar__icon-button--shop"
              src={this.props.location.pathname === '/' ? menuSelected : menu}
              alt="go to shop"
            />
            <img
              className="nav-bar__icon-button--cart"
              src={
                this.props.location.pathname === '/cart' ? cartSelected : cart
              }
              alt="go to cart"
            />
          </div>
        </div>
      </div>
    )
  }
}

export const Header = withRouter(HeaderWithoutRouter)
