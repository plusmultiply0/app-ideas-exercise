import marked from 'marked'
import React from 'react'
import './style.css'

const Editor = (props) => {
    const {state,setState} = props;
    return (
        <div>
            {/* <label htmlFor={'editor'}>123</label> */}
            <textarea id={'editor'} onChange={(e)=>setState(e.target.value)} value={state}/>
        </div>
    )
}

const Preview = (props) => {
    const {state} = props;
    
    let result = marked(state);
    return (
        <div id={'preview'} dangerouslySetInnerHTML={{__html:result}}/>
    )
}

export { Editor, Preview }