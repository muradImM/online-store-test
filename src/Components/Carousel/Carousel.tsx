import React, {Component} from 'react';
import styles from "./styles.module.scss";

class Carousel extends Component<{ arr: string[] }, { active: number, position: number }> {

    state = {
        active: 0,
        position: 0
    }

    clickHandler = (key: number) => {
        this.setState({active: key})
    }

    arrowUp = () => {
        const distance = this.state.position + 264
        this.setState({position: Math.min(distance, 0)})
    }

    arrowDown = () => {
        const distance = this.state.position - 264
        const max = -(this.props.arr.length - 1) * 130
        this.setState({position: Math.max(distance, max)})
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.imgWrapper}>
                    <div className={styles.container} style={{transform: `translateY(${this.state.position}px)`}}>
                        {this.props.arr.map((e, i) => <img className={styles.img} key={i}
                                                           onClick={() => this.clickHandler(i)} src={e} alt=""/>)}
                    </div>
                    {
                        this.props.arr.length > 5
                            ? <div>
                                <button className={styles.arrowUp + " " + styles.arrow} onClick={this.arrowUp}>up</button>
                                <button className={styles.arrowDown + " " + styles.arrow}  onClick={this.arrowDown}>down</button>
                            </div>
                            : null
                    }
                </div>
                <div className={styles.mainImgContainer}>
                    <img src={this.props.arr[this.state.active]} alt=""/>
                </div>

            </div>
        );
    }
}

export default Carousel;