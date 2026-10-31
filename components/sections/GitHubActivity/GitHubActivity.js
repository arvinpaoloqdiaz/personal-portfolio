'use client';

import { useEffect, useState } from 'react';
import styles from './GitHubActivity.module.css';

// Support multiple accounts via NEXT_PUBLIC_GITHUB_USERNAMES (comma-separated).
// Falls back to the legacy NEXT_PUBLIC_GITHUB_USERNAME for backward compatibility.
const RAW_USERNAMES =
  process.env.NEXT_PUBLIC_GITHUB_USERNAMES ||
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
  '';
const GITHUB_USERNAMES = RAW_USERNAMES.split(',')
  .map((u) => u.trim())
  .filter(Boolean);
const PRIMARY_USERNAME = GITHUB_USERNAMES[0] || '';
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

function buildHeaders() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  return headers;
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function shortSha(sha) {
  return sha ? sha.slice(0, 7) : '-------';
}

// Fetch the 3 most-recently-pushed repos for one account and collect
// up to 2 commits per repo authored by that account.
async function fetchCommitsForUser(username) {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=4`,
      { headers: buildHeaders() }
    );
    const repos = await reposRes.json();
    if (!Array.isArray(repos)) return [];

    const commitLists = await Promise.all(
      repos.slice(0, 3).map(async (repo) => {
        try {
          const cRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&per_page=2`,
            { headers: buildHeaders() }
          );
          const data = await cRes.json();
          if (!Array.isArray(data)) return [];
          return data.map((c) => ({
            repo: repo.full_name,
            repoShort: repo.name,
            author: username,
            message: c.commit?.message?.split('\n')[0] || '(no message)',
            sha: c.sha,
            date: c.commit?.author?.date || c.commit?.committer?.date,
            url:
              c.html_url ||
              `https://github.com/${repo.full_name}/commit/${c.sha}`,
          }));
        } catch (_) {
          return [];
        }
      })
    );

    return commitLists.flat();
  } catch (_) {
    return [];
  }
}

// Fetch contributions for one account and return a { date → count } map.
async function fetchContribMapForUser(username) {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    const data = await res.json();
    const map = {};
    (data?.contributions || []).forEach(({ date, count }) => {
      map[date] = count;
    });
    return map;
  } catch (_) {
    return {};
  }
}

export default function GitHubActivity() {
  const [countMap, setCountMap] = useState(null);
  const [recentCommits, setRecentCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!PRIMARY_USERNAME) return;

    const fetchAll = async () => {
      setLoading(true);
      try {
        // Commits: fetch all accounts in parallel, merge, pick top 5
        const allCommitArrays = await Promise.all(
          GITHUB_USERNAMES.map((u) => fetchCommitsForUser(u))
        );
        const mergedCommits = allCommitArrays
          .flat()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentCommits(mergedCommits);

        // Heatmap: fetch all accounts in parallel, sum counts per date
        const allContribMaps = await Promise.all(
          GITHUB_USERNAMES.map((u) => fetchContribMapForUser(u))
        );
        const merged = {};
        allContribMaps.forEach((map) => {
          Object.entries(map).forEach(([date, count]) => {
            merged[date] = (merged[date] || 0) + count;
          });
        });
        setCountMap(merged);
      } catch (e) {
        console.error('GitHub fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (!PRIMARY_USERNAME) return null;

  return (
    <section id="GitHub" className={`container ${styles.section}`}>
      <div className={styles.sectionInner}>
        {/* Section Header */}
        <div className={styles.sectionMeta}>
          <span className={styles.eyebrow}>Open Source</span>
          <h2 className={styles.heading}>GitHub Activity</h2>
          <p className={styles.subheading}>
            A live view of commits and contributions across my public repositories.
          </p>
        </div>

        {/* Activity Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <svg className={styles.githubIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Code Activity
              </h3>
              <p className={styles.cardSubtitle}>Fresh off the keyboard</p>
            </div>
            <a
              href={`https://github.com/${PRIMARY_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAllLink}
            >
              GitHub →
            </a>
          </div>

          {loading ? (
            <div className={styles.skeleton}>
              <div className={styles.skeletonCommits} />
              <div className={styles.skeletonHeatmap} />
            </div>
          ) : (
            <>
              {recentCommits.length > 0 && (
                <div className={styles.commitList}>
                  {recentCommits.map((c, i) => (
                    <a
                      key={i}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.commitRow}
                    >
                      <code className={styles.sha}>{shortSha(c.sha)}</code>
                      <span className={styles.commitMsg}>{c.message}</span>
                      <span className={styles.commitRight}>
                        {GITHUB_USERNAMES.length > 1 && (
                          <span className={styles.commitAuthor}>{c.author}</span>
                        )}
                        <span className={styles.commitRepo}>{c.repoShort}</span>
                        <span className={styles.commitTime}>{timeAgo(c.date)}</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {countMap && (
                <HeatmapGrid countMap={countMap} setTooltip={setTooltip} />
              )}
            </>
          )}

          {tooltip && (
            <div
              className={styles.tooltip}
              style={{ top: tooltip.y, left: tooltip.x }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HeatmapGrid({ countMap, setTooltip }) {
  const today = new Date();

  // Dynamic level thresholds
  const allCounts = Object.values(countMap).filter((n) => n > 0);
  const maxCount = allCounts.length > 0 ? Math.max(...allCounts) : 1;
  const t1 = Math.ceil(maxCount * 0.25);
  const t2 = Math.ceil(maxCount * 0.5);
  const t3 = Math.ceil(maxCount * 0.75);

  function getLevel(count) {
    if (count === 0) return 0;
    if (count <= t1) return 1;
    if (count <= t2) return 2;
    if (count <= t3) return 3;
    return 4;
  }

  const startMonth = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  const startSunday = new Date(startMonth);
  startSunday.setDate(startMonth.getDate() - startMonth.getDay());

  const currentSunday = new Date(today);
  currentSunday.setDate(today.getDate() - today.getDay());

  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const numWeeks = Math.round((currentSunday - startSunday) / msPerWeek) + 1;

  function toLocalDateKey(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const weeks = [];
  for (let w = 0; w < numWeeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startSunday);
      date.setDate(startSunday.getDate() + w * 7 + d);
      if (date > today || date < startMonth) {
        week.push(null);
      } else {
        const key = toLocalDateKey(date);
        week.push({ date: key, count: countMap[key] || 0 });
      }
    }
    weeks.push(week);
  }

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstValidDay = week.find((d) => d !== null);
    if (!firstValidDay) return;
    const month = parseInt(firstValidDay.date.split('-')[1], 10) - 1;
    if (month !== lastMonth) {
      monthLabels.push({ pct: (wi / numWeeks) * 100, label: MONTHS[month] });
      lastMonth = month;
    }
  });

  function handleMouseEnter(e, day) {
    if (!day) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cardEl = e.currentTarget.closest(`.${styles.card}`);
    if (!cardEl) return;
    const cardRect = cardEl.getBoundingClientRect();
    setTooltip({
      x: rect.left - cardRect.left + rect.width / 2,
      y: rect.top - cardRect.top - 38,
      text: `${day.count} contribution${day.count !== 1 ? 's' : ''} · ${day.date}`,
    });
  }

  return (
    <div className={styles.heatmapWrapper}>
      <div className={styles.monthRow}>
        {monthLabels.map(({ pct, label }) => (
          <span
            key={pct}
            className={styles.monthLabel}
            style={{ left: `${pct}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {weeks.map((week, wi) => (
          <div key={wi} className={styles.weekCol}>
            {week.map((day, di) => (
              <div
                key={di}
                className={`${styles.cell} ${
                  day !== null
                    ? styles[`level${getLevel(day.count)}`]
                    : styles.cellFuture
                }`}
                onMouseEnter={(e) => handleMouseEnter(e, day)}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </div>
        ))}
      </div>

      <p className={styles.heatmapNote}>↳ past 6 months of contribution activity</p>
    </div>
  );
}

