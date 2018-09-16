import { Ibeer, Itag } from '../../interface'
import beerImg from '../../asset/beer_x1.png'

const defaultDB = {
  beers: [],
  tags: [
    { key: 10, name: '라거' },
    { key: 11, name: '에일' },
    { key: 12, name: '람빅' },
    { key: 13, name: 'IPA' },
    { key: 14, name: '페일에일' },
    { key: 15, name: '에일' },
    { key: 16, name: '필스너' },
    { key: 17, name: '흑맥주' },
    { key: 20, name: '국산맥주' },
    { key: 21, name: '미국산맥주' },
    { key: 22, name: '일본산맥주' },
    { key: 23, name: '중국산맥주' },
    { key: 24, name: '독일산맥주' },
    { key: 30, name: '스위트' },
    { key: 31, name: '비터' },
    { key: 32, name: '드라이' },
    { key: 33, name: '과일향기' },
  ],
}

const tagMapper = {
  10: { key: 10, name: '라거' },
  11: { key: 11, name: '에일' },
  12: { key: 12, name: '람빅' },
  13: { key: 13, name: 'IPA' },
  14: { key: 14, name: '페일에일' },
  15: { key: 15, name: '에일' },
  16: { key: 16, name: '필스너' },
  17: { key: 17, name: '흑맥주' },
  20: { key: 20, name: '국산맥주' },
  21: { key: 21, name: '미국산맥주' },
  22: { key: 22, name: '일본산맥주' },
  23: { key: 23, name: '중국산맥주' },
  24: { key: 24, name: '독일산맥주' },
  30: { key: 30, name: '스위트' },
  31: { key: 31, name: '비터' },
  32: { key: 32, name: '드라이' },
  33: { key: 33, name: '과일향기' },
}

const populateBeer = (db: { beers: Ibeer[]; tags: Itag[] }, count = 10) => {
  const newDB = Object.assign({}, db)

  const getRandInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  for (let i = 0; i < count; i++) {
    const firstTag = tagMapper[getRandInt(10, 17)]
    newDB.beers.push({
      id: i,
      name: `${firstTag.name} ${i}`,
      image: beerImg,
      tags: [
        firstTag,
        tagMapper[getRandInt(20, 24)],
        tagMapper[getRandInt(30, 33)],
      ],
      price: getRandInt(5, 10) * 1000,
      stock: getRandInt(1, 10),
    })
  }

  return newDB
}

export default populateBeer(defaultDB, 1000)
