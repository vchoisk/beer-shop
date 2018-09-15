import db from 'db.json5on'

const fakeAPI = (method: string, path: string, params?: object) => {
  const fakeRouter = {
    '/api/beers': {
      GET: () =>
        new Promise(
          (
            resolve: (beers: object[]) => any,
            reject: (error: Error) => any
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
          (resolve: (tags: object[]) => any, reject: (error: Error) => any) => {
            if (db.tags) {
              setTimeout(resolve(db.tags))
            } else {
              reject(new Error('No tags!'))
            }
          }
        ),
    },
    '/api/purchase': {
      POST: (purchaseInformation: object[]) =>
        new Promise(
          (resolve: (total: object) => any, reject: (error: Error) => any) => {}
        ),
    },
  }

  return
}

export const fetchBeers = async () => {
  await setTimeout()
}
