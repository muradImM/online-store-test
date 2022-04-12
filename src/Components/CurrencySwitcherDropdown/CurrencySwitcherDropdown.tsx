import React, {Component} from 'react';
import styles from "./styles.module.scss";
import {tDispatch} from "../../store/store";

interface IProps {
    dispatch: tDispatch,
    currencies: any,
    chosenCurrency: string,
    setState: Function
}

class CurrencySwitcherDropdown extends Component<IProps, {}> {
    onListClick = (e: { symbol: string, label: string }): void => {
        this.props.setState((state: any) => ({...state, chosenCurrency: e.symbol}))

        this.props.dispatch({type: e.label})
    }

    someF = (e: any) => {
        if (!e.target.closest(".js__dropdown")) this.props.setState((state: any) => ({...state, isShow: false}))
    }

    componentDidMount() {
        document.addEventListener("click", this.someF)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.someF)
    }

    render() {
        return (
            <div className={styles.dropdownList}>
                {this.props.currencies.map((e: any) => <button
                    className={this.props.chosenCurrency === e.symbol
                        ? `${styles.dropdownListItem} ${styles.active}`
                        : styles.dropdownListItem
                    }
                    key={e.label}
                    value={e.label}
                    onClick={() => this.onListClick(e)}
                >
                    <span>{e.symbol}</span>{e.label}
                </button>)}
            </div>
        );
    }
}

export default CurrencySwitcherDropdown;