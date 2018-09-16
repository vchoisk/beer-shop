import db from './data/db'
import { Itag, Ibeer, Ipurchase } from '../interface'

const fakeAPI = (
  url: string,
  method: string,
  params?: { purchaseList: Ipurchase[] }
) => {
  const fakeRouter = {
    '/api/beers': {
      GET: () =>
        new Promise(
          (
            resolve: (beers: object) => void,
            reject: (error: Error) => void
          ) => {
            if (db.beers) {
              setTimeout(resolve(db.beers))
            } else {
              reject(new Error('No beer!'))
            }
          }
        ),
    },
    '/api/tags': {
      GET: () =>
        new Promise(
          (resolve: (tags: Itag[]) => void, reject: (error: Error) => void) => {
            if (db.tags) {
              setTimeout(resolve(db.tags))
            } else {
              reject(new Error('No tags!'))
            }
          }
        ),
    },
    '/api/purchase': {
      POST: (purchaseList: Ipurchase[]) =>
        new Promise(
          (
            resolve: (
              total: { totalCount: number; totalPrice: number }
            ) => void,
            reject: (error: Error) => void
          ) => {
            let valid = true

            const total = {
              totalCount: 0,
              totalPrice: 0,
            }

            const beerStock = db.beers.reduce(
              (stockMapper, beer) =>
                Object.assign({ [String(beer.id)]: beer }, stockMapper),
              {}
            )

            purchaseList.forEach((purchase: Ipurchase) => {
              if (beerStock[purchase.id].stock >= purchase.count) {
                total.totalCount += purchase.count
                total.totalPrice +=
                  purchase.count * beerStock[purchase.id].price
              } else {
                valid = false
              }
            })

            if (valid) {
              resolve(total)
            } else {
              reject(new Error('not valid counts in the request'))
            }
          }
        ),
    },
  }

  return fakeRouter[url][method](params && params.purchaseList)
}

export const fetchBeers = async () => {
  const beers: Ibeer[] | void = await fakeAPI('/api/beers', 'GET')

  return beers
}

export const fetchTags = async () => {
  const tags: Itag[] | void = await fakeAPI('/api/tags', 'GET')

  return tags
}

export const purchaseBeers = async (purchaseList: Ipurchase[]) => {
  const tags: Itag[] | void = await fakeAPI('/api/purchase', 'POST', {
    purchaseList,
  })

  return tags
}
