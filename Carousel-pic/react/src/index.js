import react from 'react'
import ReactDom from 'react-dom'

import Carousel from './carousel'

function App(){
    return(
        <Carousel/>
    )
}

ReactDom.render(
    <App/>,
    document.querySelector('#root')
);