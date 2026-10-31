import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import ProjectsClient from './ProjectsClient';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'All Projects',
  description: 'Explore my portfolio of web development projects.',
};

export default async function ProjectsPage() {
  let projects = [];
  let isDbDown = false;

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      isDbDown = true;
    } else {
      projects = data ?? [];
    }
  } catch {
    isDbDown = true;
  }

  // Derive groups from projects — same logic as old getAllGroups()
  const groups = projects.reduce((acc, project) => {
    if (!acc.find(g => g.slug === project.group_slug)) {
      acc.push({ name: project.group, slug: project.group_slug });
    }
    return acc;
  }, []);

  return (
    <>
      <Navbar />
      <ProjectsClient projects={projects} groups={groups} isDbDown={isDbDown} />
      <Footer />
    </>
  );
}
