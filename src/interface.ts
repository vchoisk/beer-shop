export interface Itag {
  key: number
  name: string
}

export interface Ibeer {
  id: number
  name: string
  image: string
  tags: Itag[]
  price: number
  stock: number
}

export interface Ipurchase {
  id: number
  count: number
}
