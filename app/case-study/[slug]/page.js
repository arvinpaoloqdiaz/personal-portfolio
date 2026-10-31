import { notFound } from 'next/navigation';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './CaseStudy.module.css';

const CASE_STUDIES_DIR = join(process.cwd(), 'content', 'case-studies');

// Generate static params for all markdown files
export async function generateStaticParams() {
  try {
    const files = readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith('.md'));
    return files.map((f) => ({ slug: f.replace(/\.md$/, '') }));
  } catch {
    return [];
  }
}

// Generate page metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const file = readFileSync(join(CASE_STUDIES_DIR, `${slug}.md`), 'utf8');
    const { data } = matter(file);
    return {
      title: `${data.title} | Case Study — Arvin Paolo Diaz`,
      description: data.excerpt || '',
    };
  } catch {
    return { title: 'Case Study | Arvin Paolo Diaz' };
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const filePath = join(CASE_STUDIES_DIR, `${slug}.md`);

  let frontmatter, content;
  try {
    const raw = readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    frontmatter = parsed.data;
    content = parsed.content;
  } catch {
    notFound();
  }

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <Navbar />

      <main className={styles.pageWrapper}>
        <div className="container">
          {/* Back link */}
          <div className={styles.backRow}>
            <Link href="/#CaseStudies" className={styles.backLink}>
              <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
              Back to Case Studies
            </Link>
          </div>

          {/* Article */}
          <article className={styles.article}>
            {/* Header */}
            <header className={styles.articleHeader}>
              {frontmatter.tags?.length > 0 && (
                <div className={styles.tagRow}>
                  {frontmatter.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
              <h1 className={styles.articleTitle}>{frontmatter.title}</h1>
              {frontmatter.excerpt && (
                <p className={styles.articleExcerpt}>{frontmatter.excerpt}</p>
              )}
              {formattedDate && (
                <p className={styles.articleDate}>{formattedDate}</p>
              )}
            </header>

            {/* Cover image */}
            {frontmatter.cover && (
              <div className={styles.coverWrapper}>
                <img
                  src={frontmatter.cover}
                  alt={frontmatter.title}
                  className={styles.coverImage}
                />
              </div>
            )}

            {/* Markdown body */}
            <div className={styles.prose}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

