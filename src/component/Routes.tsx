import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Header } from './Header'
import { Home } from './Home'
import { Cart } from './Cart'
import { NotFound } from './NotFound'

export class Routes extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}
