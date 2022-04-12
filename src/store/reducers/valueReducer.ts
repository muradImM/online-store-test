import {AUD, GBP, JPY, RUB, USD} from "../../util/consts";
import {IActionValue} from "../types";

function valueReducer(state = {value: USD}, action: IActionValue) {

    switch (action.type) {
        case USD:
            return {value: USD}
        case GBP:
            return {value: GBP}
        case AUD:
            return {value: AUD}
        case JPY:
            return {value: JPY}
        case RUB:
            return {value: RUB}
        default:
            return state
    }
}

export default valueReducer