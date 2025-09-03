
import React from 'react';
import Placeholder from '../ui/Placeholder';
import { FolderIcon } from '../icons/Icons';

const Documents: React.FC = () => {
  return (
    <Placeholder 
      icon={<FolderIcon />}
      title="Document Hub"
      message="A secure repository for all project documents, such as blueprints, permits, and risk assessments, with version control to ensure everyone has the latest files."
    />
  );
};

export default Documents;