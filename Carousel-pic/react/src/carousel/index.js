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
        this.changePic=this.changePic.bind(this);
        // 
        this.debounce = this.debounce.bind(this);
    }

    nextPic(e) {
        // 阻止默认行为
        // e&&e.preventDefault();
        this.move(true);
        let index = this.state.index + 1
        if (index > document.querySelector('.wrap').children.length - 1)
            index = 0;
        this.setState({ index });
        // 原先是根据state里index值，更新数据
        // 直接传参数更新如何？切换图片的同时，圆点颜色会立即更新√
        this.showDot(index);
    }

    prePic(e) {
        e&&e.preventDefault();
        this.move(false)
        let index = this.state.index - 1
        if (index < 0)
            index = document.querySelector('.wrap').children.length - 1;
        this.setState({ index });
        this.showDot(index);
    }

    // 计算每次的移动
    move(next) {
        const getWrap = document.querySelector('.wrap')
        // 假定每张图片宽度相同
        const imgWidth = getWrap.children[0].offsetWidth
        
        let left = (getWrap.style.left);
        left=parseInt(left.slice(0,left.length-2))
        
        const offset = next ? (left - imgWidth) : (left + imgWidth);
        
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
    showDot(index){
        const getDot = document.querySelectorAll('.dot');
        for(let i =0 ;i<getDot.length;i++){
            getDot[i].classList.remove('on');
            getDot[i].style.backgroundColor='';
        }                                              
        
        getDot[index].classList.add('on');
        getDot[index].style.backgroundColor='tomato';
    }

    // 点击圆点，让相应图片显示
    changePic(e){
        const getDot = document.querySelectorAll('.dot');
        let i = 0,q=0;
        getDot.forEach((item)=>item === e.target?q=i:i++)
        // 更新圆点
        this.showDot(q);
        // 更新图片
        let dis = this.state.index - q;

        const getWrap = document.querySelector('.wrap')
        // 假定每张图片宽度相同
        const imgWidth = getWrap.children[0].offsetWidth
     
        let left = (getWrap.style.left);
        left = parseInt(left.slice(0, left.length - 2))
        let offset = dis*imgWidth + left;
        
        getWrap.style.left = offset + 'px';
        this.setState({index:q})
    }
    
    // 防抖函数
    debounce(func,delay){
        let timer;
        return function(...args){
            clearTimeout(timer);
            timer=setTimeout(()=>func(args),delay);
        }
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
                    
                style={{ left: '0px', color: 'blue' }}>
                    {
                        pics.map((item, index) => <img src={item} alt="" key={`pic of ` + index}></img>)
                    }
                </div>
                <div className={styles.allButton}>
                    {
                        pics.map((item, index) => <span className={index === 0 ? `${styles.button} dot` : `${styles.button} dot`} 
                            key={`button of ` + index}
                            onClick={this.changePic}
                        ></span>)
                    }
                </div>
                <a href={``} className={`${styles.arrow} ${styles.arrowLeft} arrowLeft`}
                    onClick={this.prePic}
                >&lt;</a>
                <a href={`javascript:;`} className={`${styles.arrow} ${styles.arrowRight} arrowRight`}
                    onClick={this.debounce(this.nextPic,1000)}
                >&gt;</a>
            </div>
        );
    }
}


export default Casousel;
