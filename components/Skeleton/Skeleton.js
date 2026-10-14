import styles from './Skeleton.module.css';

export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonIcon}></div>
      <div className={styles.skeletonLine} style={{ width: '60%', margin: '0.5rem auto' }}></div>
      <div className={styles.skeletonLine} style={{ width: '80%', margin: '0.25rem auto' }}></div>
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
