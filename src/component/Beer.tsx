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

  public filterBeer = (beer: Ibeer) => {
    // Display all beer if no tag is selected, or filter beers with no selected tags

    const selectedTagKey = Object.keys(this.state.selectedTags)

    return (
      // Check if no tag is selected 1.no key in selectedTag, 2.no tag in selected tag has true value
      selectedTagKey.length === 0 ||
      selectedTagKey.reduce(
        (noTagSelected: boolean, tagKey: string) =>
          noTagSelected && !this.state.selectedTags[tagKey],
        true
      ) ||
      beer.tags.reduce(
        (tagSelected: boolean, tag: Itag) =>
          tagSelected || this.state.selectedTags[tag.key],
        false
      )
    )
  }

  public sortBeer = (beerA: Ibeer, beerB: Ibeer) => {
    const matchCount = (tags: Itag[]) =>
      tags.reduce(
        (count: number, tag: Itag) =>
          this.state.selectedTags[tag.key] ? count + 1 : count,
        0
      )

    return matchCount(beerB.tags) - matchCount(beerA.tags)
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
                .filter(this.filterBeer)
                .sort(this.sortBeer)
                .slice(0, this.state.pagesDisplayed * 5)
                .map((beer: Ibeer) => (
                  <BeerCard
                    key={beer.id}
                    beer={beer}
                    count={
                      beerContext.selectedBeers[beer.id] &&
                      beerContext.selectedBeers[beer.id].count
                    }
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
