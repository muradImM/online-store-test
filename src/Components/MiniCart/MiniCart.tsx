import React, {Component} from 'react';
import styles from "./styles.module.scss";
import CartTemplate from "../CartTemplate/CartTemplate";

interface IProps {
    toggle: Function
}

class MiniCart extends Component<IProps, {}> {

    clickHandlerClose = () => {
        this.props.toggle((state: any) => ({...state, isCartShow: false}))
    }

    render() {
        return (
            <>
                <div onClick={this.clickHandlerClose} className={styles.backdrop}/>
                <div className={styles.wrapper}>
                    <CartTemplate miniCartHandler={this.clickHandlerClose} type={"overlay"}/>
                </div>
            </>

        )
    }
}

export default MiniCart;