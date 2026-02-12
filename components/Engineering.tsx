import { useTranslations } from 'next-intl';
import styles from './Engineering.module.css';

const Engineering = () => {
    const t = useTranslations('HomePage.Engineering');
    return (
        <section className={styles.engineering}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>{t('badge')}</span>
                    <h2 className={styles.title}>{t('titleLine1')}<br />{t('titleLine2')}</h2>
                    <p className={styles.description}>
                        {t('desc')}
                    </p>

                    <ul className={styles.features}>
                        <li>
                            <span className={styles.featureIcon}>🚀</span>
                            <div>
                                <strong>{t('items.rapid.title')}</strong>
                                <p>{t('items.rapid.desc')}</p>
                            </div>
                        </li>
                        <li>
                            <span className={styles.featureIcon}>🔒</span>
                            <div>
                                <strong>{t('items.security.title')}</strong>
                                <p>{t('items.security.desc')}</p>
                            </div>
                        </li>
                        <li>
                            <span className={styles.featureIcon}>🏗️</span>
                            <div>
                                <strong>{t('items.arch.title')}</strong>
                                <p>{t('items.arch.desc')}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={styles.visual}>
                    <div className={styles.codeWindow}>
                        <div className={styles.codeHeader}>
                            <div className={styles.dots}>
                                <span className={styles.dotRed}></span>
                                <span className={styles.dotYellow}></span>
                                <span className={styles.dotGreen}></span>
                            </div>
                            <span className={styles.fileName}>main.blockchain.ts</span>
                        </div>
                        <div className={styles.codeContent}>
                            <pre>
                                <code>
                                    {`import { AyrisNetwork } from '@ayris/core';

async function deployNode() {
  const node = new AyrisNetwork({
    region: 'EU-West',
    consensus: 'ProofOfTrust'
  });

  await node.initialize();
  console.log('Node active');
}`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Engineering;
