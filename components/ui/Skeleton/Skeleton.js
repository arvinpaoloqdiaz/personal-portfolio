import styles from './Skeleton.module.css';

export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonTop}>
        <div className={styles.skeletonIcon}></div>
        <div className={styles.skeletonPill}></div>
      </div>
      <div className={styles.skeletonLine} style={{ width: '45%', height: '1.75rem', margin: '0.75rem 0 0.25rem' }}></div>
      <div className={styles.skeletonLine} style={{ width: '65%', height: '0.75rem', margin: '0.25rem 0 0.75rem' }}></div>
      <div className={styles.skeletonLine} style={{ width: '85%', height: '0.85rem', margin: '0.5rem 0 0' }}></div>
    </div>
  );
}

export function SkeletonText({ width = '100%', height = '1rem' }) {
  return (
    <div
      className={styles.skeletonLine}
      style={{ width, height, margin: '0.25rem 0', borderRadius: '4px' }}
    />
  );
}
