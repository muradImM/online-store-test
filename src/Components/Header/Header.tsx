import React, {Component} from 'react';
import styles from "./styles.module.scss";
import {mapStateToProps, tDispatch} from "../../store/store";
import Link from "../Link/Link";
import cart from "../../icons/cart.svg"
import {IItem} from "../../store/types";
import MiniCart from "../MiniCart/MiniCart";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import brandIcon from "../../icons/brandIcon.svg";

interface IProps {
    dispatch: tDispatch,
    currency: string,
    items: [] | IItem[],
    categories: string[]
}

class Header extends Component<IProps, { quantity: number, isCartShow: boolean }> {

    state = {
        quantity: 0,
        isCartShow: false,
        categories: []
    }

    clickHandlerCart = () => {
        this.setState((state) => ({...state, isCartShow: !this.state.isCartShow}))
    }

    countOfItems = () => {
        let count = 0
        this.props.items.map(e => count = count + e.quantity)
        this.setState(() => ({quantity: count}))
        return count
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{ quantity: number }>, snapshot?: any) {
        if (this.props !== prevProps) this.countOfItems()
    }

    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    {
                        this.props.categories.map((e, i) => {
                            return e === "all"
                                ? <Link key={i} link={"/"} title={e}/>
                                : <Link key={i} link={e} title={e}/>
                        })
                    }
                </nav>
                <img src={brandIcon} alt=""/>
                <div className={styles.toolsWrapper}>
                    <CurrencySwitcher/>
                    <div className={styles.cartWrapper}>
                        <div className={styles.badge}>{this.state.quantity}</div>
                        <button className={styles.cartButton} onClick={this.clickHandlerCart}>
                            <img src={cart} alt=""/></button>
                        {this.state.isCartShow && <MiniCart toggle={this.setState.bind(this)}/>}
                    </div>
                </div>
            </header>
        );
    }
}

export default mapStateToProps(Header)