import SmallCard from '@/components/SmallCard/SmallCard';
import CertificatesModal from '@/components/CertificatesModal/CertificatesModal';
import { faStar, faDiagramProject, faMedal } from '@fortawesome/free-solid-svg-icons';

import { supabase } from '@/lib/supabase';

export default async function StatsCards() {
  const dateStarted = new Date('October 1, 2023');
  const dateNow = new Date();
  let elapsedMonth =
    (dateNow.getFullYear() - dateStarted.getFullYear()) * 12 +
    (dateNow.getMonth() - dateStarted.getMonth());
  if (elapsedMonth < 0) elapsedMonth = 0;

  const [projectsRes, certificatesRes] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('certificates').select('*').order('order_index'),
  ]);

  const projectsCount = projectsRes.count ?? 0;
  const certificates = certificatesRes.data ?? [];

  return (
    <>
      <div className="col-12 col-md-4 order-3 order-md-2">
        <SmallCard
          title="Experience"
          icon={faStar}
          quantity={`~${Math.floor(elapsedMonth / 12)} year ${elapsedMonth % 12} months`}
        />
      </div>
      <div className="col-12 col-md-4 order-4 order-md-2">
        <SmallCard
          title={<a href="#Projects" className="text-link-brand">Projects</a>}
          icon={faDiagramProject}
          quantity={projectsCount}
          subtitle="deployed"
        />
      </div>
      <div className="col-12 col-md-4 order-5 order-md-2">
        <SmallCard
          title={<CertificatesModal certificates={certificates} />}
          icon={faMedal}
          quantity={certificates.length}
          subtitle="certificates"
        />
      </div>
    </>
  );
}
