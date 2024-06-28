import styles from "./style.module.css";

const LoadingButton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loadingDots}>
                <div className={styles.dot} id={styles.dot1}></div>
                <div className={styles.dot} id={styles.dot2}></div>
                <div className={styles.dot} id={styles.dot3}></div>
            </div>    
        </div>
    );
}

export default LoadingButton;

