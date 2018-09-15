export interface Itags {
  id: number
  name: string
}

export interface Ibeer {
  id: number
  name: string
  image: string
  tags: Itags[]
  price: number
  stock: number
}
