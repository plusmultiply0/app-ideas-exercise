import React from 'react'
import "./style.css";

const Main = (props)=>{
    const {open} = props
    return(
        <div className={'main'}>
            <div className={'head'} onClick={open}>open sidebar</div>
            <div className={'body'}></div>
            <div className={'bottom'}></div>
        </div>
    )
}

export default Main;