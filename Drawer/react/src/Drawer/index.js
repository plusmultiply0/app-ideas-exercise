import React from 'react'
import Siderbar from '../sidebar';
import "./style.css";

function Drawer(props) {

    const { children ,isOpen,close} = props;
    return (
        <div className={`drawer ${ isOpen? 'drawOpen' : ''}`}>
            <div className={`drawerContent`}>{children}</div>
            <div className={`drawerSidebar`}>
                <Siderbar close={close}/>
            </div>
            <div className={'drawerOverlay'} onClick={close} />
        </div>
    )
}

export default Drawer;