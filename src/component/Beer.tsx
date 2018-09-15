import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { fetchTags } from '../api/api.ts'

import { Itags } from '../interface.ts'

export interface IBeerProps extends RouteComponentProps<any> {
  categories: string[]
}

export class Beer extends React.Component<IBeerProps, {}> {
  state = {
    tags: [],
  }

  componentDidMount = async () => {
    const tags: Itags[] = await fetchTags()

    this.setState({
      tags,
    })
  }

  public render() {
    return (
      <div className="content beer">
        <div className="beer__category-toggle-buttons">Beer</div>
        <div className="beer__beer-card-list">Beer</div>
      </div>
    )
  }
}
