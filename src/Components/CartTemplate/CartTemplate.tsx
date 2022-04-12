//@ts-nocheck

import React, {Component} from 'react';
import {mapStateToProps} from "../../store/store";
import getProductInfoForCart from "../../api/getProductInfoForCart";
import {ADD_EXISTED_ITEM, CART, REMOVE_ITEMS} from "../../util/consts";
import {Link} from "react-router-dom";
import styles from "./styles.module.scss"
import CartItemImage from "../CartItemImage/CartItemImage";

class CartTemplate extends Component<{ type: "overlay" | "page", miniCartHandler?: any }> {

    state = {
        products: [],
        quantity: 0,
    }

    componentDidMount = () => {
        this.getProducts()
    }

    getProducts = () => {
        if (this.props?.items?.length > 0) {
            this.props.items.map(item => {
                getProductInfoForCart(item.id)
                    .then(e => {
                        this.setState(state => {
                                return {
                                    ...state,
                                    products: [
                                        ...state.products,
                                        {
                                            ...e.data.product,
                                            chosenAttributes: item.attributes,
                                            quantity: item.quantity
                                        }
                                    ],
                                    activeImage: {
                                        ...state.activeImage,
                                        [item.id]: 0
                                    }
                                }
                            }
                        )
                    })
                return item
            })
        }
    }

    renderPrice = arr => {
        let price
        arr.map(e => {
            if (e.currency.label === this.props.currency) {
                price = `${e.currency.symbol}${e.amount}`
            }
            return e
        })
        return price
    }

    renderAttributes = (all, chosen) => {

        return all.map((e, i) => {
            if (e.name !== "Color") {
                return <React.Fragment key={i}>
                    <p className={styles.attrName}>{e.name}:</p>
                    <div className={styles.attrWrapper}>
                        {e.items?.map(el => {
                            return el.value === chosen[e.name].value
                                ? <p className={`${styles.chosenAttr} ${styles.attr}`}
                                     key={`${e.name}${el.value}`}>{el.value}</p>
                                : <p className={styles.attr} key={`${e.name}${el.value}`}>{el.value}</p>
                        })}
                    </div>
                </React.Fragment>
            }
            return <React.Fragment key={i}>
                <p className={styles.attrName}>{e.name}:</p>
                <div className={styles.attrWrapper}>
                    {e.items.map(el => {
                        return el.value === chosen[e.name].value
                            ?
                            <p className={`${styles.chosenColor} ${styles.color}`} key={`${e.name}${el.value}`} style={{
                                backgroundColor: `${el.value}`,
                            }}/>
                            : <p className={styles.color} key={`${e.name}${el.value}`} style={{
                                backgroundColor: `${el.value}`
                            }}/>
                    })}
                </div>
            </React.Fragment>
        })
    }

    renderTotalPriceOrTax = (type) => {
        let total = 0
        let symbol
        this.state.products.map(e => {

            e.prices.map(item => {
                if (item.currency.label === this.props.currency) {
                    total = total + item.amount * e.quantity
                    symbol = item.currency.symbol
                }
                return item
            })
            return e
        })
        if (type === "price") return symbol + "" + total.toFixed(2)

        return symbol + "" + (total / 100 * 21).toFixed(2)
    }

    changeItemQuantity = (item, action) => {

        const arr = this.props.items.map(e => {
            if (e.id === item.id && JSON.stringify(e?.attributes) === JSON.stringify(item.chosenAttributes)) {
                if (action === "remove" && e.quantity - 1 <= 0) return "removed"
                return {
                    ...e,
                    quantity: action === "add" ? e.quantity + 1 : e.quantity - 1
                }
            }
            return e
        })

        const arrFiltered = arr.filter(e => e !== "removed")

        this.setState((state) => {

            const newState = state.products.map(e => {
                if (e.id === item.id && JSON.stringify(e?.chosenAttributes) === JSON.stringify(item.chosenAttributes)) {
                    if (action === "remove" && e.quantity - 1 <= 0) return "removed"
                    return {
                        ...e,
                        quantity: action === "add" ? e.quantity + 1 : e.quantity - 1
                    }
                }
                return e
            })

            const arrFiltered = newState.filter(e => e !== "removed")

            return {...state, products: arrFiltered}
        })

        this.props.dispatch({type: ADD_EXISTED_ITEM, payload: arrFiltered})
    }

    buyButtonHandler = () => {
        this.props.dispatch({type: REMOVE_ITEMS})
        this.setState(() => ({
            products: [],
            quantity: 0,
        }))
    }

    render() {
        return (
            <div className={this.props.type === "page"
                ? styles.container
                : styles.overlay
            }>
                {this.props.type === "page"
                    ? <p className={styles.headline}>CART</p>
                    : <p className={styles.headline}><strong>My bag,</strong> {this.state.products.length} items</p>
                }
                <div className={styles.itemsWrapper}>
                    {this.state?.products.map((e, i) => {
                        return <div className={styles.item} key={i}>
                            <div>
                                <p className={styles.brand}>{e.brand}</p>
                                <p className={styles.name}>{e.name}</p>
                                <p className={styles.price}>{e.prices && this.renderPrice(e.prices)}</p>
                                {e.attributes.length > 0 && this.renderAttributes(e.attributes, e.chosenAttributes)}
                            </div>
                            <div className={styles.imgBtnWrapper}>
                                <div className={styles.buttonsWrapper}>
                                    <button className={styles.changeQuantityButton}
                                            onClick={() => this.changeItemQuantity(e, "add")}>+
                                    </button>
                                    <p className={styles.quantity}>{e.quantity}</p>
                                    <button className={styles.changeQuantityButton}
                                            onClick={() => this.changeItemQuantity(e, "remove")}>-
                                    </button>
                                </div>
                                <CartItemImage type={this.props.type} arr={e.gallery}/>
                            </div>
                        </div>
                    })}
                </div>
                {
                    this.state.products.length > 0 && this.props.type === "page" && <>
                        <p className={styles.textInfo}>Tax 21%: <strong>{this.renderTotalPriceOrTax("tax")}</strong></p>
                        <p className={styles.textInfo}>Quantity: <strong>{this.state.products.length}</strong></p>
                        <p className={styles.textInfo}>Total: <strong>{this.renderTotalPriceOrTax("price")}</strong></p>
                        <button className={styles.buyButton} onClick={this.buyButtonHandler}>order</button>
                    </>
                }
                {
                    this.state.products.length > 0 && this.props.type === "overlay" && <>
                        <div className={styles.priceWrapper}>
                            <p className={styles.textInfo}>Total: <strong></strong></p>
                            <p className={styles.totalPrice}>{this.renderTotalPriceOrTax("price")}</p>
                        </div>
                        <Link className={styles.link} onClick={this.props.miniCartHandler} to={CART}>view bag</Link>
                    </>
                }
            </div>
        )
    }
}

export default mapStateToProps(CartTemplate);