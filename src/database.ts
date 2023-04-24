import {  Purchase, User} from "./types";

export const baseUser: User[] = [
    {
        id: "01",
        name: "Thiago",
        email: "thiago@email.com",
        password: "123456",
    },
    {
        id: "02",
        name:"ludmila",
        email:"ludmila@email.com",
        password:"212121",
    },
    {
        id: "03",
        name: "carol",
        email: "carol@email.com",
        password: "565656",
    },
    {
        id: "04",
        name: "chay",
        email: "chay@email.com",
        password: "898956",
    },
    {
        id: "05",
        name: "james",
        email: "james@email.com",
        password: "145056",
    },
    {
        id: "06",
        name: "mike",
        email: "mike@email.com",
        password: "654656",
    },
    
    {
        id: "07",
        name: "ana",
        email: "ana@email.com",
        password: "321325",
    },
    {
        id: "08",
        name: "bia",
        email: "bia@email.com",
        password: "645678",
    },
    {
        id: "09",
        name: "carla",
        email: "carla@email.com",
        password: "054536",
    },
    {
        id: "10",
        name: "Charlie Brown",
        email: "cbjr@email.com",
        password: "054536",
    },
]

export function createUser(id: string, name: string ,email: string, password: string): void {
    const newUser: User = {
        id,
        name,
        email,
        password,
    }
    baseUser.push(newUser)
    console.log("Cadastro realizado com sucesso")
}

export function getAllUser(): User[] {
    return baseUser
}

export const baseProduct: Product[] = [
    {
        id: "011",
        name: "Caixa de doce",
        price: 50,
        category: "kraft",
       imageUrl: "img0"

    },
    {
        id: "022",
        name: "Caixa de mudança",
        price: 22,
        category: "microondulado",
       imageUrl: "img1"

    },
    {
        id: "033",
        name: "Caixa c/ visor 10 x 20",
        price: 5,
        category: "duplex",
       imageUrl: "img2"

    },
    {
        id: "044",
        name: "Sacola",
        price: 2,
        category: "kraft",
       imageUrl: "img3"

    },
    {
        id: "055",
        name: "Caixa c/ visor 25 x 35",
        price: 12,
        category: "kraft",
        imageUrl: "img4"

    },
    {
        id: "066",
        name: "Caixa estampada 20 x 30",
        price: 10,
        category: "duplex",
        imageUrl: "img5"

    },
    {
        id: "077",
        name: "Caixa p/ ovo de colher 350g",
        price: 4,
        category: "kraft",
        imageUrl: "img6"

    },
    {
        id: "088",
        name: "Caixa p/ tranporte (Correios) 30 x 20 x 10",
        price: 8,
        category: "microondulado",
        imageUrl: "img7"

    },
    {
        id: "099",
        name: "Caixa box 20 x 20 x 10",
        price: 15,
        category: "kraft",
        imageUrl: "img8"

    },
    {
        id: "100",
        name: "Caixa surpresa 27 x 27",
        price: 20,
        category: "cartonada",
        imageUrl: "img9"

    },
]

export type Product = {
    id: string,
    name: string,
    price: number,
    category: string,
    imageUrl: string
}


export const basePurchase: Purchase[] = [  
    {
        id: "c001",
        totalPrice: 30,
        paid: 0,
        buyerId:"01",
    },
    {
        id: "c002",
        totalPrice: 15,
        paid: 1,
        buyerId:"02",
    },
    {
        id: "p01",
        totalPrice: 50,
        paid: 0,
        buyerId:"03",
    },
    {
        id: "p01",
        totalPrice: 20,
        paid: 1,
        buyerId:"04",
    },
]
