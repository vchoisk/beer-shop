import db from './data/db'
import { Itag, Ibeer, Ipurchase } from '../interface'

const beerIdToIndexMapper = db.beers.reduce(
  (mapper: { index: string; id: number }, beer: Ibeer, index: number) =>
    Object.assign({ [String(beer.id)]: index }, mapper),
  {}
)

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

            purchaseList.forEach((purchase: Ipurchase) => {
              // for each purchase check stock and accummulate summary total
              if (
                db.beers[beerIdToIndexMapper[purchase.id]].stock >=
                purchase.count
              ) {
                total.totalCount += purchase.count
                total.totalPrice +=
                  purchase.count *
                  db.beers[beerIdToIndexMapper[purchase.id]].price
              } else {
                // else indicate request invalid
                valid = false
              }
            })

            if (valid) {
              // Update cached db stock of purchased beer
              purchaseList.forEach((purchase: Ipurchase) => {
                db.beers[beerIdToIndexMapper[purchase.id]].stock =
                  db.beers[beerIdToIndexMapper[purchase.id]].stock -
                  purchase.count
              })

              setTimeout(resolve(total))
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
  try {
    const purcahseSummary: {
      totalCount: number
      totalPrice: number
    } | void = await fakeAPI('/api/purchase', 'POST', {
      purchaseList,
    })
    return purcahseSummary
  } catch (error) {
    throw {
      title: '500: 구매 처리중 에러',
      reason: error.message,
    }
  }
}
