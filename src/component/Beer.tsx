import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface IBeerProps extends RouteComponentProps<any> {
  categories: string[]
}

export class Beer extends React.Component<IBeerProps, {}> {
  public render() {
    return (
      <div className="content beer">
        <div className="beer__category-toggle-buttons">Beer</div>
        <div className="beer__beer-card-list">Beer</div>
      </div>
    )
  }
}
