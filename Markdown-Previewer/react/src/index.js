import React from 'react'
import ReactDom from 'react-dom'

import Container from './components'

const App = () =>
    <>
        <Container/>
    </>

ReactDom.render(
    <App />,
    document.querySelector('body')
)