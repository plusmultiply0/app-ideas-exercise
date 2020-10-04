import React from 'react'
import Siderbar from '../sidebar';
import "./style.css";

function Drawer(props) {

    const { children, isOpen, setOpen } = props;
    return (
        <div className={`drawer ${isOpen ? 'drawOpen' : ''}`}>
            <div className={`drawerContent`}>{children}</div>
            <div className={`drawerSidebar`}>
                <Siderbar setOpen={setOpen} />
            </div>
            <div className={'drawerOverlay'} onClick={() => setOpen(false)} />
        </div>
    )
}

export default Drawer;