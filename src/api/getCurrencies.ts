import {client} from "../index";
import {gql} from "@apollo/client";

const getProduct = async () => {
    return await client.query({
        query: gql`{
            currencies {
                label
                symbol
                }
            }`
    }).then(({data}) => data)
}

export default getProduct