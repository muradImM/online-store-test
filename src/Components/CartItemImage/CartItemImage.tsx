//@ts-nocheck

import React, {Component} from 'react';
import styles from "./styles.module.scss";

class CartItemImage extends Component {
    state = {
        active: 0
    }

    changeImage = (direction, count) => {

        if (direction === "next") {
            this.setState(() => ({active: this.state.active + 1 >= count ? 0 : this.state.active + 1}))
        }

        this.setState(() => ({active: this.state.active - 1 < 0 ? count - 1 : this.state.active - 1}))
    }

    render() {
        return (
            <div className={styles.imgWrapper}>
                {this.props.arr.length > 1 && this.props.type === "page" && <>
                    <button onClick={() => this.changeImage("next", this.props.arr.length)}
                            className={`${styles.arrow} ${styles.arrowNext}`}/>
                    <button onClick={() => this.changeImage("prev", this.props.arr.length)}
                            className={`${styles.arrow} ${styles.arrowPrev}`}/>
                </>}
                <img className={styles.img}
                     src={this.props.arr[this.state.active]}
                     alt=""/>
            </div>
        );
    }
}

export default CartItemImage;