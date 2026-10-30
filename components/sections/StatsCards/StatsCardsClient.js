'use client';

import { useState } from 'react';
import SmallCard from '@/components/ui/SmallCard/SmallCard';
import CertificatesModal from '@/components/ui/CertificatesModal/CertificatesModal';
import { faBriefcase, faDiagramProject, faMedal } from '@fortawesome/free-solid-svg-icons';

/**
 * Modern Reinvented Interactive Stats Cards Client Component
 */
export default function StatsCardsClient({
  experienceFormatted,
  projectsCount = 0,
  certificates = []
}) {
  const [showCertsModal, setShowCertsModal] = useState(false);

  return (
    <>
      {/* 1. Experience Metric Card */}
      <div className="col-12 col-md-4 order-3 order-md-2">
        <SmallCard
          title="Industry Experience"
          icon={faBriefcase}
          quantity={experienceFormatted}
          subtitle="Full-Stack &amp; DevOps"
          badge="Active"
        />
      </div>

      {/* 2. Projects Metric Card (Jump Link to #Projects) */}
      <div className="col-12 col-md-4 order-4 order-md-2">
        <SmallCard
          title="Featured Projects"
          icon={faDiagramProject}
          quantity={projectsCount}
          subtitle="Apps &amp; Deployments"
          href="#Projects"
        />
      </div>

      {/* 3. Certifications Card (Opens modern full-screen modal) */}
      <div className="col-12 col-md-4 order-5 order-md-2">
        <SmallCard
          title="Verified Credentials"
          icon={faMedal}
          quantity={certificates.length}
          subtitle="Certificates"
          onClick={() => setShowCertsModal(true)}
        />
      </div>

      {/* Modal Dialog */}
      <CertificatesModal
        certificates={certificates}
        show={showCertsModal}
        onHide={() => setShowCertsModal(false)}
      />
    </>
  );
}

