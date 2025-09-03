
import React from 'react';
import Placeholder from '../ui/Placeholder';
import { SettingsIcon } from '../icons/Icons';

const Settings: React.FC = () => {
  return (
    <Placeholder 
      icon={<SettingsIcon />}
      title="Settings"
      message="Manage your account, team members, notification preferences, and other application settings here."
    />
  );
};

export default Settings;