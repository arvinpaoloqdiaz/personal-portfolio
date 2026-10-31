'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import styles from './FeaturedBlogPosts.module.css';

const BLOG_SITE_URL = process.env.NEXT_PUBLIC_BLOG_SITE_URL || '#';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// ── Skeleton row ────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className={styles.skeletonRow}>
      <div className={styles.skeletonLeft}>
        <div className={styles.skeletonDate} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonExcerpt} />
      </div>
      <div className={styles.skeletonRight} />
    </div>
  );
}

// ── Compressed Post Row ─────────────────────────────────────────────
function PostRow({ post }) {
  const excerpt = stripHtml(post.content).slice(0, 140);
  const postUrl = `${BLOG_SITE_URL}/writing/${post._id}`;

  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.postRow}
    >
      <div className={styles.rowMain}>
        <div className={styles.metaLine}>
          <span className={styles.postDate}>{formatDate(post.publishedOn)}</span>
          {post.tags?.length > 0 && (
            <div className={styles.tagGroup}>
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <h3 className={styles.rowTitle}>{post.title}</h3>
        <p className={styles.rowExcerpt}>
          {excerpt}{excerpt.length >= 140 ? '…' : ''}
        </p>
      </div>

      <div className={styles.rowAction}>
        <span className={styles.readLabel}>Read Article</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.actionIcon} />
      </div>
    </a>
  );
}

// ── Main component ───────────────────────────────────────────────────
export default function FeaturedBlogPosts() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'empty' | 'error'
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/blog/featured');

        if (cancelled) return;

        if (!res.ok) {
          setStatus('error');
          return;
        }

        const json = await res.json();
        if (cancelled) return;

        if (!json.posts || json.posts.length === 0) {
          setStatus('empty');
        } else {
          setPosts(json.posts);
          setStatus('loaded');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Silently hide if no posts or API is truly down
  if (status === 'empty' || status === 'error') return null;

  return (
    <section id="Blog" className={`container ${styles.section}`}>
      {/* ── Section Header ── */}
      <div className="row">
        <div className={`col ${styles.headerSection}`}>
          <span className={styles.eyebrow}>From the Blog</span>
          <h2 className={styles.heading}>Featured Posts</h2>
          <p className={styles.subheading}>
            Articles, write-ups, and lessons from my engineering journey.
          </p>
        </div>
      </div>

      {/* ── Compressed Rows List ── */}
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-lg-10">
          <div className={styles.rowsContainer}>
            {status === 'loading'
              ? [0, 1, 2].map((i) => <SkeletonRow key={i} />)
              : posts.map((post) => <PostRow key={post._id} post={post} />)}
          </div>

          {/* ── View All Link ── */}
          {status === 'loaded' && (
            <div className="text-center mt-4">
              <a
                href={`${BLOG_SITE_URL}/writing`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewAllLink}
              >
                <span>Browse All Articles on My Blog</span>
                <FontAwesomeIcon icon={faArrowRight} className={styles.viewAllIcon} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
