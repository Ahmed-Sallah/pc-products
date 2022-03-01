import { Product } from "../products/product.model";

export interface Order {
  address: {
    governorate: string,
    area: string,
    street: string
  }
  date: Date,
  items: Product[],
  user: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  }
}
