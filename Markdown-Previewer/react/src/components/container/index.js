import React, { useState } from 'react'
import { Editor, Preview } from '../previewer'
import 'normalize.css'
import './style.css'

const Container = () => {
    const [state,setState] = useState(`**yes**`)
    return (
        <div id={'container'}>
            <Editor state={state} setState={setState}/>
            <Preview state={state} setState={setState}/>
        </div>)
}

export default Container