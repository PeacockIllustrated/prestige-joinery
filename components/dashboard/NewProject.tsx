import React, { useState } from 'react';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { Project } from '../../types';
import ProjectModal from '../tasks/ProjectModal';

interface NewProjectProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const NewProject: React.FC<NewProjectProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = async (projectToSave: Project) => {
    try {
        if (projectToSave.id) {
            const projectRef = doc(db, 'projects', projectToSave.id);
            await updateDoc(projectRef, { ...projectToSave });
        } else {
            const { id, ...newProjectData } = projectToSave;
            await addDoc(collection(db, 'projects'), newProjectData);
        }
    } catch (error) {
        console.error("Error saving project: ", error);
        alert("There was an error saving the project. Please try again.");
    } finally {
        handleCloseModal();
    }
  };

  return (
    <>
      <button
        onClick={() => handleOpenModal()}
        className="flex items-center justify-center bg-prestige-teal text-prestige-charcoal font-bold px-5 py-2.5 rounded-lg shadow-sm hover:bg-opacity-90 transition-transform transform hover:scale-105"
      >
        New Project
      </button>
      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProject}
        />
      )}
    </>
  );
};

export default NewProject;
