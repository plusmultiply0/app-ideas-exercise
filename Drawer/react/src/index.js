import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Drawer from './Drawer'
import Main from './mainpage'

class App extends Component {

    constructor(props){
        super(props);
        this.state={
            isOpen:false,
        }
        this.closeBar = this.closeBar.bind(this);
        this.openBar = this.openBar.bind(this);
    }

    closeBar() {
        this.setState({ isOpen: false })
    }

    openBar() {
        this.setState({ isOpen: true })
    }

    render() {
        return (
            <Drawer open={this.openBar} close={this.closeBar} isOpen={this.state.isOpen}>
                <Main open={this.openBar}/>
            </Drawer>
        )
    }
}

ReactDom.render(
    <App />,
    document.querySelector('body')
);
/*
基本思路：
让Drawer组件包含的子组件作为 主要内容显示，
当点击 主要内容区 某个位置时，侧边栏组件显示（遮盖在主内容区上，主内容区颜色变暗）
点击侧边栏组件 以外的区域时，侧边栏组件 消失（往左边滑动消失）
*/