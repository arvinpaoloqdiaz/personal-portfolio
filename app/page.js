import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Socials from '@/components/ui/Socials/Socials';
import RoleAnimation from '@/components/ui/RoleAnimation/RoleAnimation';
import Carousel from '@/components/sections/Carousel/Carousel';
import TechShowcase from '@/components/sections/TechShowcase/TechShowcase';
import ExperienceSection from '@/components/sections/ExperienceSection/ExperienceSection';
import StatsCards from '@/components/sections/StatsCards/StatsCards';
import StatsCardsSkeleton from '@/components/sections/StatsCards/StatsCardsSkeleton';
import ProjectsSection from '@/components/sections/ProjectsSection/ProjectsSection';
import HeroAvatar from '@/components/ui/HeroAvatar/HeroAvatar';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import homeStyles from './Home.module.css';
import aboutStyles from './About.module.css';

import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Arvin Paolo Diaz | Full-Stack & DevOps Engineer',
  description: 'Personal portfolio of Arvin Paolo Diaz — Full-Stack Developer with a growing focus on DevOps & Cloud.',
};

export default async function Page() {
  let carousel1 = [], carousel2 = [], workList = [], educationList = [];

  try {
    const [
      { data: c1 },
      { data: c2 },
      { data: wData },
      { data: eData }
    ] = await Promise.all([
      supabase.from('skills').select('*').eq('carousel_number', 1).order('order_index'),
      supabase.from('skills').select('*').eq('carousel_number', 2).order('order_index'),
      supabase.from('work_experience').select('*').order('order_index'),
      supabase.from('education').select('*').order('order_index'),
    ]);

    carousel1 = c1 || [];
    carousel2 = c2 || [];
    workList = wData || [];
    educationList = eData || [];
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section id="Home" className={homeStyles.heroWrapper}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <h1 className={homeStyles.heroTitle}>
                Building Fast <span className={homeStyles.heroTitleAccent}>Web Apps</span> &{' '}
                <br className={homeStyles.heroBreak} />
                Smooth <span className={homeStyles.heroTitleAccent}>Deployments</span>
              </h1>
              <div className={homeStyles.roleRow}>
                <RoleAnimation />
              </div>
            </div>
          </div>

          <div className="row gy-5 align-items-center justify-content-center mt-2">
            <div className="col-12 col-lg-5 text-center">
              <HeroAvatar mode={process.env.NEXT_PUBLIC_HERO_PHOTO_MODE || 'professional'} />
            </div>

            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                <p className={homeStyles.bioLead}>
                  Hi, I'm <strong>Arvin Paolo Diaz</strong> — a Web Developer based in the{' '}
                  <em>Philippines</em>. I build practical full-stack web applications and help teams set up simple, reliable build and deployment pipelines.
                </p>

                <div className={homeStyles.ctaRow}>
                  <Button href="#Projects" variant="gradient">
                    View Projects
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Get in Touch
                  </Button>
                </div>

                <div className="mt-2">
                  <Socials />
                </div>

                {/* Stats cards with Suspense skeleton */}
                <div className="row g-3 mt-1">
                  <Suspense fallback={<StatsCardsSkeleton />}>
                    <StatsCards />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="About" className={aboutStyles.aboutSection}>
        <div className="container">
          <div className={aboutStyles.sectionHeader}>
            <span className={aboutStyles.sectionEyebrow}>Background & Journey</span>
            <h2 className={aboutStyles.sectionHeading}>About Me</h2>
          </div>

          <div className={aboutStyles.bentoContainer}>
            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <div className={aboutStyles.bentoCard}>
                  <h3 className={aboutStyles.bentoCardTitle}>
                    From Hardware Engineering to the Web & Cloud
                  </h3>
                  <p className={aboutStyles.bioParagraph}>
                    With a background in <em>Electronics Engineering</em>, I bring practical problem-solving and structured thinking to web development.
                  </p>
                  <p className={aboutStyles.bioParagraph}>
                    As a <em>Full-Stack developer</em> expanding into <strong>DevOps and Cloud workflows</strong>, I enjoy taking projects all the way from clean code to automated builds and smooth hosting setups.
                  </p>
                  <p className={aboutStyles.bioParagraph}>
                    I genuinely enjoy analyzing everyday processes and finding clever, efficient ways to automate them. There's real satisfaction in simplifying complexity and making workflows effortless—especially in an era where agility and automation matter most.
                  </p>
                  <p className={`${aboutStyles.bioParagraph} ${aboutStyles.techStackBlock}`}>
                    <strong>Core Stack:</strong> PHP, React, Next.js, MySQL, Node.js <br />
                    <strong>DevOps & Tools:</strong> Docker, GitHub Actions, Linux, Cloudflare
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className={aboutStyles.ctaBentoCard}>
                  <div>
                    <div className={aboutStyles.ctaPillBadge}>
                      <span className={aboutStyles.ctaPillDot} />
                      <span>Open for Opportunities</span>
                    </div>

                    <h3 className={aboutStyles.bentoCardTitle}>
                      Let's Build Together
                    </h3>
                    <p className={aboutStyles.bioParagraph}>
                      Whether you have an upcoming project, are looking to automate deployments, or need a developer on your team, my inbox is always open. Let's create something reliable and impactful.
                    </p>
                  </div>

                  <div className={aboutStyles.ctaButtonGroup}>
                    <Button
                      href="https://raw.githubusercontent.com/arvinpaoloqdiaz/files/resume/Arvin%20Paolo%20Diaz%20-%20Resume.pdf"
                      variant="gradient"
                      external
                      icon={<FontAwesomeIcon icon={faDownload} />}
                    >
                      Download Resume
                    </Button>
                    <Button href="/contact" variant="secondary">
                      Contact Me
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology / Showcase */}
          <div className="row mt-5 pt-4">
            <div className="col text-center">
              <span className={aboutStyles.sectionEyebrow}>Tech Stack & Tools</span>
              <h2 className={aboutStyles.sectionHeading}>Technologies</h2>
              <p className="text-secondary mt-2 mb-4" style={{ fontSize: '0.95rem' }}>
                Languages, frameworks, and cloud workflows I use to build scalable web applications.
              </p>
            </div>
          </div>
          <TechShowcase fallbackData={[...carousel1, ...carousel2]} />

          {/* Qualifications */}
          <div className="row mt-5 pt-4">
            <div className="col text-center">
              <span className={aboutStyles.sectionEyebrow}>Career Timeline</span>
              <h2 className={aboutStyles.sectionHeading}>Qualifications</h2>
              <p className="text-secondary mt-2 mb-3" style={{ fontSize: '0.95rem' }}>
                My professional experience and academic background.
              </p>
            </div>
          </div>
          <ExperienceSection educationList={educationList} workList={workList} />
        </div>
      </section>

      {/* ── PROJECTS SECTION ── */}
      <Suspense
        fallback={
          <section id="Projects" className="container mt-5 pb-5">
            <div className="row">
              <div className="col text-center">
                <h1>Projects</h1>
                <h6 className="text-secondary">My Work</h6>
              </div>
            </div>
            <div className="row g-4 mt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div className="border rounded p-3" style={{ minHeight: 200 }}>
                    <div className="skeleton-shimmer mb-3" style={{ height: 140, borderRadius: 8, background: 'linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%)', backgroundSize: '800px 100%' }} />
                    <div className="skeleton-shimmer" style={{ height: 16, width: '70%', borderRadius: 4, background: 'linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%)', backgroundSize: '800px 100%' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        }
      >
        <ProjectsSection />
      </Suspense>

      <Footer />
    </>
  );
}
