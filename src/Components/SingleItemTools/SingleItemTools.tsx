import React, {Component} from 'react';
import styles from "../../Pages/SingleItemPage/styles.module.scss";
import SingleItemAttributes from "../SingleItemAttributes/SingleItemAttributes";
import {ADD_EXISTED_ITEM, ADD_NEW_ITEM} from "../../util/consts";
import {connect} from "react-redux";

type IProps = {
    brand: string,
    name: string,
    currentPrice: any,
    inStock: boolean,
    id: string,
    items: IItem[],
    prices: any,
    attributes: {
        name: string,
        type: string,
        items: {
            value: string,
        }[]
    }[],
    dispatch: any,
}

interface IState {
    chosenAttributes?: {
        [propName: string]: string | undefined,
    }[]
}

interface IItem {
    id: string,
    attributes: any,
    quantity: number
}

class SingleItemTools extends Component<IProps, IState> {

    addToCart = () => {
        let isNewItem = true

        const item: IItem = {
            id: this.props.id,
            attributes: this.state?.chosenAttributes ? this.state.chosenAttributes : undefined,
            quantity: 1
        }

        const arr = this.props.items.map((e: IItem) => {
            if (e.id === this.props.id && JSON.stringify(e?.attributes) === JSON.stringify(this.state?.chosenAttributes)) {

                isNewItem = false

                return {
                    ...e,
                    quantity: e.quantity + 1
                }
            } else return e
        })

        isNewItem
            ? this.props.dispatch({type: ADD_NEW_ITEM, payload: item})
            : this.props.dispatch({type: ADD_EXISTED_ITEM, payload: arr})

    }

    render() {
        return (
            <div>
                <div>
                    <p className={styles.brand}>
                        {this.props.brand}
                    </p>
                    <p className={styles.name}>
                        {this.props.name}
                    </p>
                </div>
                <div>
                    {this.props.attributes.length > 0
                        ? this.props.attributes.map((e, i) => {
                            return <SingleItemAttributes onClick={this.setState.bind(this)}
                                                         key={i}
                                                         name={e.name}
                                                         items={e.items}/>
                        })
                        : null
                    }
                </div>
                <div>
                    <p className={styles.costTitle}>
                        price:
                    </p>
                    <p className={styles.cost}>
                        {this.props.currentPrice.amount}&nbsp;{this.props.currentPrice.symbol}
                    </p>
                </div>
                {
                    this.props.inStock
                        ? <button className={styles.buyButton} onClick={this.addToCart}>add to cart</button>
                        : <button className={styles.buyButton} disabled>out of stock</button>
                }
            </div>
        );
    }
}

export default connect()(SingleItemTools);