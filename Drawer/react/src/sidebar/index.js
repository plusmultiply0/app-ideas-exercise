import React from 'react'
import "./style.css";

const Siderbar = (props) => {
    const { setOpen} = props;
    return (
        <div className={'siderbar'}>
            <div className={'body'} onClick={() => setOpen(false)}>close</div>
        </div>
    )
}

export default Siderbar;