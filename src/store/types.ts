import {allCurrencies, itemActions} from "../util/consts";

export interface IActionItem {
    type: itemActions,
    payload?:IItem | IItem[]
}

export interface IActionValue {
    type: allCurrencies | string
}

export interface IItem {
    attributes: any
    id: string
    quantity: number
}