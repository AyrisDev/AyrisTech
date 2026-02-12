import { useTranslations } from 'next-intl';
import styles from './AboutTeam.module.css';

const team = [
    {
        name: 'Sarah Jenkins',
        role: 'CHIEF EXECUTIVE OFFICER',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop'
    },
    {
        name: 'David Chen',
        role: 'CHIEF TECHNOLOGY OFFICER',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop'
    },
    {
        name: 'Elena Rodriguez',
        role: 'HEAD OF PRODUCT DESIGN',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop'
    },
    {
        name: 'Marcus Johnson',
        role: 'LEAD ENGINEER',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop'
    }
];

const AboutTeam = () => {
    const t = useTranslations('About.team');

    return (
        <section className={styles.team}>
            <div className={styles.container}>
                <h2 className={styles.title}>{t('title')}</h2>

                <div className={styles.grid}>
                    {team.map((member, index) => (
                        <div key={index} className={styles.memberCard}>
                            <div className={styles.imageOverlayContainer}>
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url(${member.image})` }}
                                ></div>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.name}>{member.name}</h4>
                                <p className={styles.role}>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutTeam;
