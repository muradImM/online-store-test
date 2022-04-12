import React, {Component} from 'react';
import {withParamsRouter} from "../../Components/CustomWithRouter";
import getProduct, {ISingleItem} from "../../api/getProduct";
import styles from "./styles.module.scss"
import Carousel from "../../Components/Carousel/Carousel";
import {mapStateToProps, tDispatch} from "../../store/store";
import {IItem} from "../../store/types";
import SingleItemTools from "../../Components/SingleItemTools/SingleItemTools";
import parse from 'html-react-parser';

type Props = {
    params: {
        id: string
    },
    currency: string,
    dispatch: tDispatch,
    items: IItem[]
}

export interface IState extends ISingleItem {
    currentPrice?: {
        amount: string,
        symbol: string
    },
    chosenAttributes?: {
        [propName: string]: string,
    }[]
}

class SingleItem extends Component<Props, IState> {

    renderCurrency = () => {

        this.state?.prices?.map(e => {
            if (e.currency.label === this.props.currency) {

                this.setState((state) => {
                    return {
                        ...state,
                        currentPrice: {amount: e.amount, symbol: e.currency.symbol}
                    }
                })
            }
            return e
        })
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any) {

        if (this.props !== prevProps) {
            this.renderCurrency()
        }
    }

    componentDidMount() {

        getProduct(this.props.params.id.slice(1))
            .then(e => {
                let value: {
                    amount: string,
                    symbol: string
                }
                e.data.product.prices.map(e => {
                    if (e.currency.label === this.props.currency) {
                        value = {
                            amount: e.amount,
                            symbol: e.currency.symbol
                        }
                    }
                    return e
                })
                this.setState((state) => {
                    return {
                        ...state,
                        ...e.data.product,
                        currentPrice: value
                    }

                })
            })
    }

    renderDescription = () => {
        return this.state?.description && parse(this.state.description)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div>
                        {this.state?.gallery
                            ? <Carousel arr={this.state.gallery}/>
                            : null
                        }
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoWrapper}>
                            {this.state
                                ? <SingleItemTools name={this.state.name}
                                                   attributes={this.state?.attributes}
                                                   brand={this.state.brand}
                                                   currentPrice={this.state.currentPrice}
                                                   inStock={this.state.inStock}
                                                   id={this.state.id}
                                                   prices={this.state.prices}
                                                   items={this.props.items}
                                />
                                : null
                            }
                            <div className={styles.descriptions}>
                                {this.renderDescription()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default mapStateToProps(withParamsRouter(SingleItem))