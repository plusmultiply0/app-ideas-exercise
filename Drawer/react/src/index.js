import React from 'react'
import ReactDom from 'react-dom'

import Drawer from './Drawer'

function App(){
    return(
        <Drawer/>
    )
}

ReactDom.render(
    <App/>,
    document.querySelector('body')
);