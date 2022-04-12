export const CART = "/cart"

export const USD = "USD"
export const GBP = "GBP"
export const AUD = "AUD"
export const JPY = "JPY"
export const RUB = "RUB"
export type allCurrencies = typeof USD | typeof GBP | typeof AUD | typeof JPY | typeof RUB

export const ADD_NEW_ITEM = "ADD_NEW_ITEM"
export const ADD_EXISTED_ITEM = "ADD_EXISTED_ITEM"
export const REMOVE_ITEMS = "REMOVE_ITEMS"
export type itemActions = typeof ADD_NEW_ITEM | typeof ADD_EXISTED_ITEM | typeof REMOVE_ITEMS