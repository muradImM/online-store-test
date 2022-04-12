import React, {Component} from 'react';
import styles from "./styles.module.scss";
import SingleItemTools from "../SingleItemTools/SingleItemTools";


interface IProps {
    toggle: Function,
    name: string,
    attributes: any,
    brand: string,
    currentPrice: any,
    inStock: boolean,
    id: string,
    prices: any,
    items: any
}

class Modal extends Component <IProps, {}> {

    clickHandler = () => {
        this.props.toggle((state: any) => ({...state, modalIsOpen: false}))
    }

    componentDidMount() {
        document.body.style.overflow ="hidden"
    }

    componentWillUnmount() {
        document.body.style.overflow ="unset"
    }

    render() {
        return (
            <>
                <div onClick={this.clickHandler} className={styles.backdrop}>
                    <div onClick={e => e.stopPropagation()} className={styles.wrapper}>
                        <div className={styles.buttonWrapper}>
                            <button onClick={this.clickHandler} className={styles.closeButton} />
                        </div>
                        <SingleItemTools name={this.props.name}
                                         attributes={this.props.attributes}
                                         brand={this.props.brand}
                                         currentPrice={this.props.currentPrice}
                                         inStock={this.props.inStock}
                                         id={this.props.id}
                                         prices={this.props.prices}
                                         items={this.props.items}
                        />
                    </div>
                </div>

            </>

        );
    }
}

export default Modal;