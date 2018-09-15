import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'

import { Button } from '../widgets/Button'

import menu from '../asset/icons/menu.svg'
import menuSelected from '../asset/icons/menu-selected.svg'
import cart from '../asset/icons/cart.svg'
import cartSelected from '../asset/icons/cart-selected.svg'

class HeaderWithoutRouter extends React.Component<RouteComponentProps, {}> {
  public handleNavigateTo = (path: string) => {
    this.props.history.push(path)
  }

  public render() {
    const { location } = this.props

    const pathToNameMapper = {
      '/': '맥주담기',
      '/cart': '내 카트',
    }

    return (
      <div className="header">
        <h1 className="header__title">Beer Shop</h1>
        <div className="header__nav-bar nav-bar">
          <h2 className="nav-bar__current-location">
            {pathToNameMapper[location.pathname]}
          </h2>
          <div className="nav-bar__icon-buttons">
            <Button onClick={this.handleNavigateTo.bind(this, '/')}>
              <img
                className="nav-bar__icon-button--shop"
                src={location.pathname === '/' ? menuSelected : menu}
                alt="go to shop"
              />
            </Button>
            <Button onClick={this.handleNavigateTo.bind(this, '/cart')}>
              <img
                className="nav-bar__icon-button--cart"
                src={location.pathname === '/cart' ? cartSelected : cart}
                alt="go to cart"
              />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export const Header = withRouter(HeaderWithoutRouter)
