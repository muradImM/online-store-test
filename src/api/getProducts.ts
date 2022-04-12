import {client} from "../index";
import {Product} from "../Components/Board/types";
import {gql} from "@apollo/client";

const getProducts = async (category: string) => {
    return await client
        .query<{ category: { products: Product[] } }>({
            query: gql`
                     { category(input: {title: "${category}"}) {
                        name
                        products {
                            category
                            inStock
                            attributes{
                                name
                                type
                                items{
                                    value
                                }
                            }
                            name
                            brand
                            id
                            prices {
                                amount
                                currency {
                                    label
                                    symbol
                                }
                            }
                            gallery
                        }
                     }
                     }`
        })
}

export default getProducts