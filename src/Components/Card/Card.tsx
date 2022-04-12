import React, {Component, MouseEventHandler} from 'react';
import styles from "./styles.module.scss"
import {NavigateFunction} from "react-router-dom";
import {mapStateToProps} from "../../store/store";
import {withNavigateRouter} from "../CustomWithRouter";
import cart from "../../icons/cart.svg"
import Modal from "../Modal/Modal";
import {Product} from "../Board/types";

interface IProps extends Product {
    navigate: NavigateFunction
    currency: string
    items: any
}

interface IState {
    modalIsOpen: boolean
    price: {
        amount: string,
        symbol: string
    }
}

class Card extends Component<IProps, IState> {
    state = {
        modalIsOpen: false,
        price: {
            amount: this.props.prices[0].amount,
            symbol: this.props.prices[0].currency.symbol
        }
    }

    clickHandlerItem = () => {
        this.props.navigate(`/${this.props.category + "/:" + this.props.id}`)
    }

    clickHandlerCart: MouseEventHandler = (e) => {
        e.stopPropagation()
        this.setState((state) => ({...state, modalIsOpen: true}))
    }

    currencyRender = () => {
        this.props.prices.map(e => {
            if (e.currency.label === this.props.currency) this.setState({
                price: {
                    amount: e.amount,
                    symbol: e.currency.symbol
                }
            })
            return e
        })
    }

    componentDidMount() {
        this.currencyRender()
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props !== prevProps) {
            this.currencyRender()
        }
    }

    render() {
        return (
            <>
                <div onClick={this.clickHandlerItem} className={
                    this.props.inStock
                        ? styles.wrapper
                        : styles.wrapper + " " + styles.outOfStock
                }>
                    <div className={styles.imgWrapper}>
                        {this.props.inStock
                            ? null
                            : <div className={styles.cover}/>
                        }
                        <img className={styles.img} src={this.props.gallery[0]} alt=""/>
                    </div>
                    <div className={styles.textWrapper}>
                        <p className={styles.name}>
                            {this.props.brand}&nbsp;{this.props.name}
                        </p>
                        <p className={styles.price}>
                            {this.state.price.amount + " " + this.state.price.symbol}
                        </p>
                        {
                            this.props.inStock
                                ? <button onClick={this.clickHandlerCart}
                                          className={styles.buyButton}>
                                    <img src={cart} alt=""/>
                                </button>
                                : null
                        }
                    </div>
                </div>
                {this.state.modalIsOpen && <Modal
                    toggle={this.setState.bind(this)}
                    name={this.props.name}
                    attributes={this.props.attributes}
                    brand={this.props.brand}
                    currentPrice={this.state.price}
                    inStock={this.props.inStock}
                    id={this.props.id}
                    prices={this.props.prices}
                    items={this.props.items}/>
                }
            </>

        )
    }
}

export default mapStateToProps(withNavigateRouter(Card));