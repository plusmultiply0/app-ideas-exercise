import React from 'react'

import styles from './style.css'

function Casousel(props) {
    const { pics } = props;
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                {
                    pics.map((item,index) => <img src={item} alt="" key={`pic of `+index}></img>)
                }
            </div>
            <div className={styles.allButton}>
                {
                    pics.map((item, index) => <span className={index === 0 ? `${styles.button} on` : `${styles.button}`}  key={`button of `+index}></span>)
                }
            </div>
            <a href={`javascript:;`} className={`${styles.arrow} ${styles.arrowLeft}`}>&lt;</a>
            <a href={`javascript:;`} className={`${styles.arrow} ${styles.arrowRight}`}>&gt;</a>
        </div>
    );
}

export default Casousel;
