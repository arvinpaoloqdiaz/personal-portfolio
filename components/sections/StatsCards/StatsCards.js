import StatsCardsClient from './StatsCardsClient';
import { supabase } from '@/lib/supabase';

export default async function StatsCards() {
  const dateStarted = new Date('October 1, 2023');
  const dateNow = new Date();
  let elapsedMonth =
    (dateNow.getFullYear() - dateStarted.getFullYear()) * 12 +
    (dateNow.getMonth() - dateStarted.getMonth());
  if (elapsedMonth < 0) elapsedMonth = 0;

  const years = Math.floor(elapsedMonth / 12);
  const months = elapsedMonth % 12;
  const experienceFormatted = `${years}y ${months}m`;

  const [projectsRes, certificatesRes] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('certificates').select('*').order('order_index'),
  ]);

  const projectsCount = projectsRes.count ?? 0;
  const certificates = certificatesRes.data ?? [];

  return (
    <StatsCardsClient
      experienceFormatted={experienceFormatted}
      projectsCount={projectsCount}
      certificates={certificates}
    />
  );
}
