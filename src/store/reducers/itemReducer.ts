import {ADD_EXISTED_ITEM, ADD_NEW_ITEM, REMOVE_ITEMS} from "../../util/consts";
import {IActionItem} from "../types";

function itemReducer(state: any = {items: []}, action: IActionItem) {

    switch (action.type) {
        case ADD_NEW_ITEM:
            return {...state, items: [...state.items, action.payload]}
        case ADD_EXISTED_ITEM:
            return {...state, items: action.payload}
        case REMOVE_ITEMS:
            return {...state, items: []}
        default:
            return state
    }
}

export default itemReducer