import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'

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
          <div className="nav-bar__icon-buttons">buttons</div>
        </div>
      </div>
    )
  }
}

export const Header = withRouter(HeaderWithoutRouter)
