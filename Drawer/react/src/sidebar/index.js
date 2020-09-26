import React from 'react'
import "./style.css";

const Siderbar = (props) => {
    const { close} = props;
    return (
        <div className={'siderbar'}>
            <div className={'body'} onClick={close}>close</div>
        </div>
    )
}

export default Siderbar;