
import React, { useState, useMemo } from 'react';
import { ProjectStatus, Page, Project } from '../../types';
import ProjectCard from './ProjectCard';
import { PlusIcon, DashboardIcon } from '../icons/Icons';
import { useData } from '../../hooks/useData';
import Placeholder from '../ui/Placeholder';

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'All'>('All');
  const { projects } = useData();

  const filters: (ProjectStatus | 'All')[] = ['All', ...Object.values(ProjectStatus)];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.status === activeFilter);
  }, [activeFilter, projects]);

  const FilterButton: React.FC<{ filter: ProjectStatus | 'All' }> = ({ filter }) => {
    const isActive = activeFilter === filter;
    return (
      <button
        onClick={() => setActiveFilter(filter)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          isActive
            ? 'bg-prestige-charcoal text-white shadow-md'
            : 'bg-white text-prestige-text hover:bg-prestige-gray'
        }`}
      >
        {filter}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 bg-white p-1 rounded-full border border-prestige-gray">
            {filters.map(f => <FilterButton key={f} filter={f} />)}
        </div>
        <button className="flex items-center justify-center bg-prestige-teal text-prestige-charcoal font-bold px-5 py-2.5 rounded-lg shadow-sm hover:bg-opacity-90 transition-transform transform hover:scale-105">
            <PlusIcon className="w-5 h-5 mr-2" />
            New Project
        </button>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} setActivePage={setActivePage} />
            ))}
        </div>
      ) : (
        <div className="mt-10">
            <Placeholder 
                icon={<DashboardIcon />}
                title="No Projects Found"
                message={`There are no projects with the status "${activeFilter}". Try a different filter or create a new project to get started.`}
            />
        </div>
      )}
    </div>
  );
};

export default Dashboard;