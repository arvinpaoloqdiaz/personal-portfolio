import styles from './SmallCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SmallCard({ title, quantity, subtitle, icon }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconCircle}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      </div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.valueRow}>
        <span className={styles.quantity}>{quantity}</span>
        {subtitle && <span className={styles.subtitle}> {subtitle}</span>}
      </div>
    </div>
  );
}

