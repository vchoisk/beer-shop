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
  pagesDisplayed: number
}

export class Beer extends React.Component<IBeerProps, IBeerState> {
  public state = {
    tags: [],
    selectedTags: {},
    pagesDisplayed: 1,
  }

  public componentDidMount = async () => {
    const tags: Itag[] | void = await fetchTags()

    this.setState({
      tags: tags || [],
      selectedTags: {},
    })
  }

  public handleToggleTag = (tag: Itag) => {
    this.setState({
      selectedTags: Object.assign({}, this.state.selectedTags, {
        [tag.key]: !this.state.selectedTags[tag.key],
      }),
    })
  }

  public handleShowMore = () => {
    this.setState({
      pagesDisplayed: this.state.pagesDisplayed + 1,
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
              beerContext.beers
                .slice(0, this.state.pagesDisplayed * 5)
                .map((beer: Ibeer) => (
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
                ))
            }
          </BeerContext.Consumer>
        </div>
        <div className="beer__show-more-button-container">
          <Button
            className="beer__show-more-button"
            onClick={this.handleShowMore}
          >
            <div className="show-more-button__name">더보기 +</div>
          </Button>
        </div>
      </div>
    )
  }
}
