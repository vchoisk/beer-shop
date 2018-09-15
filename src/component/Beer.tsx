import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { fetchTags } from '../api/api'

import { Itags } from '../interface'

export interface IBeerProps extends RouteComponentProps<any> {
  categories: string[]
}

interface IBeerState {
  tags: Itags[]
}

export class Beer extends React.Component<IBeerProps, IBeerState> {
  public state = {
    tags: [],
  }

  public componentDidMount = async () => {
    const tags: Itags[] | void = await fetchTags()

    this.setState({
      tags: tags || [],
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
