import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from "./styles.module.scss"

class Link extends Component<{link: string, title: string}, {}> {
    render() {
        return (
            <NavLink
                className={({isActive}) => isActive
                    ? `${styles.active} ${styles.navItem}`
                    : styles.navItem
                }
                to={this.props.link}>{this.props.title}</NavLink>
        )
    }
}

export default Link;