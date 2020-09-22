import React from 'react'

function Casousel(props) {
    const { pics } = props;
    return (
        <div className={'container'}>
            <div className={'wrap'}>
                {
                    pics.map((item,index) => <img src={item} alt="" key={`pic of `+index}></img>)
                }
            </div>
            <div className={'buttons'}>
                {
                    pics.map((index) => <span className={index === 0 ? 'on' : ''}  key={`button of `+index}>{index}</span>)
                }
            </div>
            <a href={`javascript:;`} className={`arrow arrowLeft`}>&lt;</a>
            <a href={`javascript:;`} className={`arrow arrowRight`}>&gt;</a>
        </div>
    );
}

export default Casousel;
