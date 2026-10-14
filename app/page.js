import { Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Socials from '@/components/Socials/Socials';
import TypeEffect from '@/components/TypeEffect/TypeEffect';
import Carousel from '@/components/Carousel/Carousel';
import ExperienceSection from '@/components/ExperienceSection/ExperienceSection';
import StatsCards from '@/components/StatsCards/StatsCards';
import StatsCardsSkeleton from '@/components/StatsCards/StatsCardsSkeleton';
import ProjectsSection from '@/components/ProjectsSection/ProjectsSection';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import homeStyles from './Home.module.css';
import aboutStyles from './About.module.css';

import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Arvin Paolo Diaz | Web Developer',
  description: 'Personal portfolio of Arvin Paolo Diaz, a full-stack web developer from the Philippines.',
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
              <div className={homeStyles.statusBadge}>
                <span className={homeStyles.statusDot} />
                <span>Available for new projects & opportunities</span>
              </div>
              <h1 className={homeStyles.heroTitle}>
                Crafting Scalable, Modern Web Apps with <span className={homeStyles.heroTitleAccent}>Precision</span>
              </h1>
              <div className={homeStyles.roleRow}>
                <span className={homeStyles.roleBadge}>
                  <TypeEffect />
                </span>
                <span className="text-secondary">•</span>
                <span className="text-secondary">Full-Stack Web Developer</span>
              </div>
            </div>
          </div>

          <div className="row gy-5 align-items-center justify-content-center mt-2">
            <div className="col-12 col-lg-5 text-center">
              <div className={homeStyles.avatarContainer}>
                <div className={homeStyles.avatarGlow} />
                <img
                  src="/images/Arvin-updated.png"
                  className={homeStyles.avatarImage}
                  alt="Arvin Paolo Diaz"
                />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                <p className={homeStyles.bioLead}>
                  Hi, I'm <strong>Arvin Paolo Diaz</strong> — a Full-Stack Web Developer based in the{' '}
                  <em>Philippines</em>. I build robust, human-centered web solutions combining engineering rigor with fluid modern design.
                </p>

                <div className={homeStyles.ctaRow}>
                  <a href="#Projects" className={homeStyles.btnPrimaryCta}>
                    <span>View Projects</span>
                  </a>
                  <Link href="/contact" className={homeStyles.btnSecondaryCta}>
                    <span>Get in Touch</span>
                  </Link>
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
                    From Electronics Engineering to Full-Stack Craft
                  </h3>
                  <p className={aboutStyles.bioParagraph}>
                    I'm a passionate career shifter from the <em>Electronics Engineering</em> industry, now dedicating my focus to full-stack web development. What started as a curious coding passion evolved into a disciplined engineering career after completing an intensive bootcamp centered on modern JavaScript and full-stack systems.
                  </p>
                  <p className={aboutStyles.bioParagraph}>
                    When I'm not writing code, you'll find me exploring emerging tech stacks, participating in engineering discussions, or analyzing systems architecture. I bring an analytical, systematic engineering mindset to every digital product I build.
                  </p>
                  <p className={aboutStyles.bioParagraph}>
                    Currently specializing in <strong>PHP</strong>, <strong>React</strong>, <strong>Next.js</strong>, and <strong>MySQL</strong>, with an active focus on expanding into <strong>DevOps</strong> and cloud deployment workflows.
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className={`${aboutStyles.bentoCard} d-flex flex-column justify-content-between`}>
                  <div>
                    <h3 className={aboutStyles.bentoCardTitle}>
                      Let's Build Together
                    </h3>
                    <p className={aboutStyles.bioParagraph}>
                      Whether you have an upcoming project, want to collaborate on open-source, or need a developer for your team, my inbox is open.
                    </p>
                    <div className={aboutStyles.actionPillsRow}>
                      <Link href="/contact" className={aboutStyles.actionPill}>
                        Contact Me
                      </Link>
                      <a href="#Projects" className={aboutStyles.actionPill}>
                        Explore Work
                      </a>
                      <a
                        href="https://github.com/arvinpaoloqdiaz"
                        target="_blank"
                        rel="noreferrer"
                        className={aboutStyles.actionPill}
                      >
                        GitHub Profile
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top border-secondary-subtle">
                    <a
                      href="https://raw.githubusercontent.com/arvinpaoloqdiaz/files/resume/Arvin%20Paolo%20Diaz%20-%20Resume.pdf"
                      className={aboutStyles.resumePill}
                      download
                    >
                      <FontAwesomeIcon icon={faDownload} />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology / Carousel */}
          <div className="row mt-5">
            <div className="col text-center">
              <h2>Technology</h2>
              <h6 className="text-secondary">Skillset</h6>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <hr className="w-25 mx-auto" style={{ borderColor: 'var(--green-main)', opacity: 0.3 }} />
            </div>
          </div>
          <div className="row carousel-container">
            <div className="row pt-3">
              <Carousel CarouselData={carousel1} reverse={false} />
            </div>
            <div className="row py-3">
              <Carousel CarouselData={carousel2} reverse={true} />
            </div>
          </div>

          {/* Qualifications */}
          <div className="row mt-5">
            <div className="col text-center">
              <h2>Qualifications</h2>
              <h6 className="text-secondary">Current Experience</h6>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <hr className="w-25 mx-auto" style={{ borderColor: 'var(--green-main)', opacity: 0.3 }} />
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
