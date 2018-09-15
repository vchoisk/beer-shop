import db from './data/db'
import { Itags, Ibeer, Ipurchase } from '../interface'

const fakeAPI = (
  url: string,
  method: string,
  params?: { purchaseList: Ipurchase[] }
) => {
  const fakeRouter = {
    '/api/beers': {
      GET: () =>
        new Promise(
          (resolve: (beers: {}[]) => any, reject: (error: Error) => any) => {
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
          (
            resolve: (tags: { id: number; name: string }[]) => any,
            reject: (error: Error) => any
          ) => {
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
            resolve: (total: { totalCount: number; totalPrice: number }) => any,
            reject: (error: Error) => any
          ) => {
            let valid = true

            let total = {
              totalCount: 0,
              totalPrice: 0,
            }

            const beerStock = db.beers.reduce(
              (stockMapper: object, beer: Ibeer) =>
                Object.assign({ [beer.id]: beer }, stockMapper),
              {}
            )

            purchaseList.forEach((purchase: Ipurchase) => {
              if (beerStock[purchase.id].stock <= purchase.count) {
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

  fakeRouter[url][method](params && params.purchaseList)
}

export const fetchBeers = async () => {
  const beers: Ibeer[] = await fakeAPI('/api/beers', 'GET')

  return beers
}

export const fetchTags = async () => {
  const tags: Itags[] = await fakeAPI('/api/tags', 'GET')

  return tags
}
