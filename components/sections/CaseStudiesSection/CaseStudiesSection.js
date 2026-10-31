import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookOpen, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import styles from './CaseStudiesSection.module.css';
import caseStudiesData from '@/data/case-studies.json';

export default function CaseStudiesSection() {
  const published = caseStudiesData.filter((cs) => !cs.draft);

  if (published.length === 0) return null;

  return (
    <section id="CaseStudies" className={`container ${styles.section}`}>
      {/* ── Section Header ── */}
      <div className="row">
        <div className={`col ${styles.headerSection}`}>
          <span className={styles.eyebrow}>Deep Dives</span>
          <h2 className={styles.heading}>Case Studies</h2>
          <p className={styles.subheading}>
            End-to-end breakdowns of real problems I solved — decisions, trade-offs, and outcomes.
          </p>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="row g-4 mt-2">
        {published.map((cs) => (
          <div key={cs.slug} className="col-12 col-md-6 col-lg-4">
            <Link href={`/case-study/${cs.slug}`} className="text-decoration-none h-100 d-block">
              <div className={styles.card}>
                {/* Top bar with decorative badge & icon */}
                <div className={styles.cardTopRow}>
                  <div className={styles.iconBox}>
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  <div className={styles.caseBadge}>
                    <FontAwesomeIcon icon={faCodeBranch} className={styles.branchIcon} />
                    <span>Case Study</span>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.cardBody}>
                  {cs.tags?.length > 0 && (
                    <div className={styles.tagRow}>
                      {cs.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <h3 className={styles.cardTitle}>{cs.title}</h3>
                  <p className={styles.cardExcerpt}>{cs.excerpt}</p>
                </div>

                {/* Action Footer */}
                <div className={styles.cardFooter}>
                  <span className={styles.readLink}>Read Full Breakdown</span>
                  <div className={styles.arrowCircle}>
                    <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
