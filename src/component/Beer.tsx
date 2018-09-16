import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Button } from '../widgets/Button'
import { BeerCard } from '../widgets/BeerCard'
import { BeerContext } from '../context/BeerContext'

import { fetchTags } from '../api/api'
import { Itag, Ibeer } from '../interface'

export interface IBeerProps extends RouteComponentProps<any> {
  categories: string[]
}

interface IBeerState {
  tags: Itag[]
  selectedTags: { [key: string]: boolean }
}

export class Beer extends React.Component<IBeerProps, IBeerState> {
  public state = {
    tags: [],
    selectedTags: {},
  }

  public componentDidMount = async () => {
    const tags: Itag[] | void = await fetchTags()

    this.setState({
      tags: tags || [],
      selectedTags: tags
        ? tags.reduce(
            (selectedTags: { [key: string]: boolean }, tag: Itag) =>
              Object.assign(selectedTags, { [tag.key]: true }),
            {}
          )
        : {},
    })
  }

  public handleToggleTag = (tag: Itag) => {
    this.setState({
      selectedTags: Object.assign({}, this.state.selectedTags, {
        [tag.key]: !this.state.selectedTags[tag.key],
      }),
    })
  }

  public render() {
    return (
      <div className="content beer">
        <div className="beer__category-toggle-buttons">
          {this.state.tags.map((tag: Itag) => (
            <Button
              key={tag.key}
              className="beer__category-toggle-button toggle-button"
              primary
              variant={
                this.state.selectedTags[tag.key] ? 'contained' : 'bordered'
              }
              onClick={this.handleToggleTag.bind(this, tag)}
            >
              <div className="toggle-button__name">{tag.name}</div>
            </Button>
          ))}
        </div>
        <div className="beer__beer-card-list">
          <BeerContext.Consumer>
            {beerContext =>
              beerContext.beers.map((beer: Ibeer) => (
                <BeerCard
                  beer={{
                    id: 0,
                    name: 'Cass',
                    image: 'a',
                    tags: [
                      { key: 10, name: '라거' },
                      { key: 32, name: '드라이' },
                      { key: 20, name: '국산맥주' },
                    ],
                    price: 500,
                    stock: 6,
                  }}
                />
              ))
            }
          </BeerContext.Consumer>
        </div>
      </div>
    )
  }
}
