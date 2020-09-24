import React from 'react'
import ReactDom from 'react-dom'

import Carousel from './carousel'

import one from '../assets/pics/1.jpg'
import two from '../assets/pics/2.jpg'
import three from '../assets/pics/3.jpg'
import four from '../assets/pics/4.jpg'
import five from '../assets/pics/5.jpg'
import six from '../assets/pics/6.jpg'
import seven from '../assets/pics/7.jpg'

const picArray = [one,two,three,four,five,six,seven]; 

function App(){
    return(
        <Carousel pics={picArray}/>
    )
}

ReactDom.render(
    <App/>,
    document.querySelector('body')
);