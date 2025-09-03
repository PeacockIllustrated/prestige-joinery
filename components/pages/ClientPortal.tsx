
import React from 'react';
import Placeholder from '../ui/Placeholder';
import { UsersIcon } from '../icons/Icons';

const ClientPortal: React.FC = () => {
  return (
    <Placeholder 
      icon={<UsersIcon />}
      title="Client Portal"
      message="A professional, web-based portal where clients can log in to view project progress, see key photos, and provide digital approvals."
    />
  );
};

export default ClientPortal;