import {client} from "../index";
import {gql} from "@apollo/client";

export interface ISingleItem {
    id: string,
    name: string,
    inStock: boolean,
    gallery: string[],
    description: string,
    category: string,
    attributes: {
        name: string,
        type: string,
        items: {
            value: string,
        }[]
    }[],
    brand: string,
    prices: {
        amount: string
        currency: {
            label: string
            symbol: string
        }
    }[]
}

const getProduct = async (id: string) => {
    return await client
        .query<{product: ISingleItem}>({
            query: gql`
                     { product(id: "${id}") {
                            id
                            name
                            inStock
                            gallery
                            description
                            category
                             prices {
                              amount
                              currency {
                                label
                                symbol
                              }
                            }
                            attributes{
                              name
                              type
                              items{
                                value
                              }
                            }
                            brand
                     }
                     }`
        })
}

export default getProduct