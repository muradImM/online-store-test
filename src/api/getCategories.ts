import {client} from "../index";
import {gql} from "@apollo/client";

const getCategories = async () => {
    return await client.query({
        query: gql`{
            categories {
                name
            }
            }`
    }).then(({data}) => data)
}

export default getCategories