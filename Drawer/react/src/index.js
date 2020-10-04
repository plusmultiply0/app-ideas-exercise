import React, { useState } from 'react'
import ReactDom from 'react-dom'

import Drawer from './Drawer'
import Main from './mainpage'

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Drawer setOpen={setIsOpen} isOpen={isOpen}>
            <Main setOpen={setIsOpen} />
        </Drawer>
    )
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