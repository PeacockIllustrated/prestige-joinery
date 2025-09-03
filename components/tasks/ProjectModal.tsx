import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '../../types';
import { useData } from '../../hooks/useData';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, onSave }) => {
  const { users } = useData();
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'progress'>>({
    name: '',
    description: '',
    status: ProjectStatus.InProgress,
    dueDate: new Date().toISOString().split('T')[0],
    ownerId: users[0]?.id || '',
  });

  useEffect(() => {
    if (project) {
      const formattedProject = { ...project, dueDate: project.dueDate.split('T')[0] };
      setFormData(formattedProject);
    } else {
        setFormData({
            name: '',
            description: '',
            status: ProjectStatus.InProgress,
            dueDate: new Date().toISOString().split('T')[0],
            ownerId: users[0]?.id || '',
        });
    }
  }, [project, users]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.ownerId) {
        alert('Please fill in all required fields.');
        return;
    }
    onSave({ ...(project || { id: '', progress: 0 }), ...formData });
  };

  if (!isOpen) return null;

  const inputStyles = "w-full text-prestige-charcoal bg-white border border-gray-300 rounded-lg px-3 py-2 transition-shadow focus:ring-2 focus:ring-prestige-teal/50 focus:border-prestige-teal focus:outline-none";
  const labelStyles = "block text-sm font-semibold text-prestige-charcoal mb-1";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-prestige-gray">
            <h2 className="text-2xl font-bold text-prestige-charcoal">{project ? 'Edit Project' : 'Create New Project'}</h2>
          </div>

          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label htmlFor="name" className={labelStyles}>Project Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={inputStyles} />
            </div>
            <div>
              <label htmlFor="description" className={labelStyles}>Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className={inputStyles}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <label htmlFor="ownerId" className={labelStyles}>Project Owner</label>
                <select name="ownerId" id="ownerId" value={formData.ownerId} onChange={handleChange} className={inputStyles}>
                  {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="status" className={labelStyles}>Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputStyles}>
                  {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="dueDate" className={labelStyles}>Due Date</label>
                <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className={inputStyles} />
              </div>
            </div>
          </div>

          <div className="p-6 bg-prestige-light-gray flex justify-end items-center rounded-b-xl space-x-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white border border-prestige-gray text-prestige-charcoal font-bold rounded-lg hover:bg-prestige-gray transition">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-prestige-teal text-prestige-charcoal font-bold rounded-lg shadow-sm hover:bg-opacity-90 transition">{project ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
