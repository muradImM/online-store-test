export type Product = {
    category: string,
    name: string,
    id: any,
    attributes: {
        name: string,
        items: {
            value: string
        }[]
    }[],
    inStock: boolean,
    brand: string,
    prices: {
        amount: string,
        currency: {
            label: string,
            symbol: string
        }
    }[],
    gallery: any
}

export interface IState {
    products?: Product[],
}

export type Props = {
    heading: string,
    path: string,
}