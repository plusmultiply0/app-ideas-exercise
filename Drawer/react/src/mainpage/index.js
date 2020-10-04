import React from 'react'
import "./style.css";

const Main = (props)=>{
    const { setOpen} = props
    return(
        <div className={'main'}>
            <div className={'head'} onClick={() => setOpen(true)}>open sidebar</div>
            <div className={'body'}></div>
            <div className={'bottom'}></div>
        </div>
    )
}

export default Main;