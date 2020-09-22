import React from 'react'
import ReactDom from 'react-dom'

import Carousel from './carousel'

const mockData = ['a','b','c']; 

function App(){
    return(
        <Carousel pics={mockData}/>
    )
}

ReactDom.render(
    <App/>,
    document.querySelector('body')
);

// document.body.appendChild(<App/>);