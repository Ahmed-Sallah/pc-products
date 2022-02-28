export interface Product {
  _id?: string
  type: ['motherboards', 'cpu', 'ram', 'ssd', 'hdd', 'gpu', 'case', 'psu', 'fans-cooler', 'monitor', 'accessories']
  name: string
  price: number
  brand: string
  image: string
  availability: boolean
}
