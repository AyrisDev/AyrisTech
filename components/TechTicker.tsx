import styles from './TechTicker.module.css';

const TechTicker = () => {
    const techs = ['PYTHON', 'REACT', 'TENSORFLOW', 'SOLIDITY', 'AWS', 'DOCKER', 'KUBERNETES', 'NEXT.JS'];

    return (
        <div className={styles.tickerWrapper}>
            <div className={styles.ticker}>
                {techs.concat(techs).map((tech, index) => (
                    <span key={index} className={styles.techItem}>{tech}</span>
                ))}
            </div>
        </div>
    );
};

export default TechTicker;
