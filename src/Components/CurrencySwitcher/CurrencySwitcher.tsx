import React, {Component} from 'react';
import styles from "./styles.module.scss";
import {mapStateToProps, tDispatch} from "../../store/store";
import getCurrencies from "../../api/getCurrencies";
import CurrencySwitcherDropdown from "../CurrencySwitcherDropdown/CurrencySwitcherDropdown";

class CurrencySwitcher extends Component<{ dispatch: tDispatch }, any> {

    state = {
        isShow: false,
        currencies: [{label: "", symbol: ""}],
        chosenCurrency: "$"
    }

    componentDidMount() {

        getCurrencies()
            .then(({currencies}) => this.setState((state: any) => ({...state, currencies})))
    }

    toggleDropdown = () => {
        this.setState((state: any) => ({...state, isShow: !this.state.isShow}))
    }

    render() {

        return (
            <div onClick={this.toggleDropdown} className={styles.switcherWrapper + " js__dropdown"}>

                <button className={this.state.isShow
                    ? `${styles.dropdownButton} ${styles.active}`
                    : styles.dropdownButton
                }>
                    {this.state?.chosenCurrency}
                </button>
                {this.state.isShow && <CurrencySwitcherDropdown
                    dispatch={this.props.dispatch}
                    currencies={this.state.currencies}
                    chosenCurrency={this.state.chosenCurrency}
                    setState={this.setState.bind(this)}/>}
            </div>
        )
    }
}

export default mapStateToProps(CurrencySwitcher);