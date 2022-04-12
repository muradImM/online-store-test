import {client} from "../index";
import {gql} from "@apollo/client";

export interface ISingleItemCart {
    attributes: any;
    name: string,
    gallery: string[],
    brand: string,
    prices: {
        amount: string
        currency: {
            label: string
            symbol: string
        }
    }[]
}

const getProductInfoForCart = async (id: string) => {
    return await client
        .query<{product: ISingleItemCart}>({
            query: gql`
                     { product(id: "${id}") {
                        name
                        id
                        brand
                        attributes{
                              name
                              type
                              items{
                                value
                              }
                            }
                        gallery
                        prices {
                          amount
                          currency {
                            label
                            symbol
                          }
                        }
                     }
                     }`
        })
}

export default getProductInfoForCart