import React, { Component } from 'react'

import styles from './style.css'



class Casousel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timer:null,
            index:0,
            
        };
        this.nextPic = this.nextPic.bind(this);
        this.prePic = this.prePic.bind(this);
        this.move = this.move.bind(this);
        this.autoMove=this.autoMove.bind(this);
        this.clearAuto = this.clearAuto.bind(this);
        this.showDot=this.showDot.bind(this);
    }

    nextPic() {
        
        this.move(true);
        let index = this.state.index + 1
        if (index > document.querySelector('.wrap').children.length - 1)
            index = 0;
        
        this.setState({ index });
        this.showDot();
    }
    prePic() {
        
        this.move(false)
        let index = this.state.index - 1
        if (index < 0)
            index = document.querySelector('.wrap').children.length - 1;
        this.setState({ index },);
        this.showDot();
    }

    // 计算每次的移动
    move(next) {
        const getWrap = document.querySelector('.wrap')
        // 假定每张图片宽度相同
        const imgWidth = getWrap.children[0].offsetWidth
        // console.log(imgWidth)
        let left = (getWrap.style.left);
        left=parseInt(left.slice(0,left.length-2))
        // console.log(left)
        const offset = next ? (left - imgWidth) : (left + imgWidth);
        console.log(offset)
        getWrap.style.left = offset + 'px';
        // 图片播到末尾/第一张时，切到第一张/末尾
        if(offset===(-1*getWrap.children.length)*imgWidth){
            getWrap.style.left='0px'
        }else if(offset === imgWidth){
            getWrap.style.left = -1*(getWrap.children.length-1) * imgWidth+'px';
        }
    }

    // 自动轮播
    autoMove(){
        let timer =  setInterval(()=>this.nextPic(),1500);
        this.setState({ timer });
    }
    clearAuto(){
        clearInterval(this.state.timer);
        this.setState({timer:null})
    }

    // 让下方圆点颜色随图片变化
    showDot(){
        const getDot = document.querySelectorAll('.dot');
        for(let i =0 ;i<getDot.length;i++){
            getDot[i].classList.remove('on');
            getDot[i].style.backgroundColor='';
        }                                              
        console.log('index '+this.state.index);
        getDot[this.state.index].classList.add('on');
        getDot[this.state.index].style.backgroundColor='tomato';
    }

    componentDidMount() {
        const getWrap = document.querySelector('.wrap')
        // 预先设置 left 值，便于后续移动图片
        getWrap.style.left = '0px';

        this.autoMove();
        const getDot = document.querySelectorAll('.dot');
        getDot[0].classList.add('on');
    }

    render() {
        const { pics } = this.props;
        return (
            <div className={`${styles.container} container`}
                onMouseEnter={this.clearAuto}
                onMouseLeave={this.autoMove}
            >
                {/* 此处添加left,不会显示到style里？ */}
                <div className={`${styles.wrap} wrap`} 
                    
                style={{ left: '0px;', color: 'blue' }}>
                    {
                        pics.map((item, index) => <img src={item} alt="" key={`pic of ` + index}></img>)
                    }
                </div>
                <div className={styles.allButton}>
                    {
                        pics.map((item, index) => <span className={index === 0 ? `${styles.button} dot` : `${styles.button} dot`} key={`button of ` + index}></span>)
                    }
                </div>
                <a href={`javascript:;`} className={`${styles.arrow} ${styles.arrowLeft} arrowLeft`}
                    onClick={this.prePic}
                >&lt;</a>
                <a href={`javascript:;`} className={`${styles.arrow} ${styles.arrowRight} arrowRight`}
                    onClick={this.nextPic}
                >&gt;</a>
            </div>
        );
    }
}


export default Casousel;
