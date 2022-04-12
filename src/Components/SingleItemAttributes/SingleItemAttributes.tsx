import React, {Component, CSSProperties} from 'react';
import styles from "./styles.module.scss"

interface IProps {
    name: string,
    items: {
        value: string
    }[],
    onClick: any
}

class SingleItemAttributes extends Component<IProps, { active: number }> {

    state = {
        active: 0
    }

    mapValues = (i: number) => {
        this.props.onClick((state: any) => {
            return {
                chosenAttributes: {
                    ...state?.chosenAttributes,
                    [this.props.name]: this.props.items[i]
                }
            }
        })
    }

    clickHandler = (i: number) => {
        this.setState({active: i})
        this.mapValues(i)
    }

    componentDidMount() {
        this.mapValues(this.state.active)
    }

    renderAttributes = () => {
        if (this.props.name !== "Color") {
            return this.props.items.map((e, i) => {
                let className = styles.square
                if (this.state.active === i) className = styles.square + " " + styles.active
                return (
                    <div key={i} onClick={() => this.clickHandler(i)} className={className}>
                        <p className={styles.textAttribute}>{e.value}</p>
                    </div>)
            })
        }
        return this.props.items.map((e, i) => {
            const colorProp: CSSProperties = {backgroundColor: e.value}
            let className = styles.colorAttribute
            if (this.state.active === i) className = styles.colorAttribute + " " + styles.activeColor
            return (
                <div style={colorProp} key={i} onClick={() => this.clickHandler(i)} className={className} />
            )
        })
    }

    render() {
        return (
            <div>
                <h3 className={styles.heading}>{this.props.name}:</h3>
                <div className={styles.list}>
                    {this.renderAttributes()}
                </div>
            </div>
        )
    }
}

export default SingleItemAttributes;