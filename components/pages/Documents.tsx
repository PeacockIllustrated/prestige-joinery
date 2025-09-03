import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import ProjectSelector from '../documents/ProjectSelector';
import DocumentManager from '../documents/DocumentManager';

const Documents: React.FC = () => {
  const { projects, documents, costs } = useData();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id || null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectDocuments = documents.filter(doc => doc.projectId === selectedProjectId);

  return (
    <div className="flex h-full bg-white rounded-xl shadow-md border border-prestige-gray/50 overflow-hidden">
      <div className="w-1/3 border-r border-prestige-gray flex flex-col">
        <div className="p-4 border-b border-prestige-gray">
          <h2 className="text-xl font-bold text-prestige-charcoal">Projects</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ProjectSelector
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
          />
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        <DocumentManager
          project={selectedProject || null}
          documents={projectDocuments}
          costs={costs}
        />
      </div>
    </div>
  );
};

export default Documents;