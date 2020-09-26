import React from 'react'
import styles from './style.css'

function Drawer(props) {
    const { children, sidebar } = props;
    return (
        <div>
            <div>{children}</div>
            <div>{sidebar}</div>
            <div />
        </div>
    )
}

export default Drawer;