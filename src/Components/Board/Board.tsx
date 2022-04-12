import React, {Component} from "react";
import styles from "./styles.module.scss";
import Card from "../Card/Card";
import {IState, Props} from "./types";
import getProducts from "../../api/getProducts";

class Board extends Component<Props, IState> {

    componentDidMount() {
        getProducts(this.props.path)
            .then(e => this.setState({
                products: e.data.category.products
            }))
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props !== prevProps) {
            getProducts(this.props.path)
                .then(e => this.setState({
                    products: e.data.category.products
                }))
        }
    }

    render() {

        return (
            <>
                <h1 className={styles.title}>{this.props.heading}</h1>
                <div className={styles.gridWrapper}>
                    {this.state?.products?.map(e => <Card key={e.id} {...e}/>)}
                </div>
            </>
        );
    }
}

export default Board;