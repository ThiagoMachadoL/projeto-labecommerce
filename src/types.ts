export type User = {
  id: string,
  name:string,
  email: string,
  password: string,
}

export type Product = {
  id: string,
  name: string,
  category: string,
  price: number,
  imageUrl: string
}

export type Purchase = {
  id: string,
  buyerId: string,
  totalPrice: number,
  paid: number
}