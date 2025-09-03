
import React from 'react';
import { DashboardIcon, TasksIcon, CalendarIcon, FolderIcon, DollarSignIcon, UsersIcon, SettingsIcon, ChevronDownIcon, BriefcaseIcon } from '../icons/Icons.tsx';
import { Page } from '../../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Logo: React.FC = () => (
  <div className="p-4 mb-4">
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-prestige-teal flex items-center justify-center font-bold text-prestige-charcoal text-2xl relative">
        <span className="z-10">P</span>
        <div className="absolute left-0 top-0 h-full w-1/3 bg-white opacity-40"></div>
      </div>
      <div>
        <h1 className="text-white text-xl font-bold tracking-tighter leading-tight">PRESTIGE</h1>
        <p className="text-prestige-teal text-xs tracking-widest leading-tight">JOINERY & BUILDING</p>
      </div>
    </div>
    <div className="h-px bg-prestige-teal mt-4 opacity-50"></div>
  </div>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-prestige-teal text-prestige-charcoal shadow-md'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </button>
);

const UserProfile: React.FC = () => (
  <div className="px-6 py-4 mt-auto border-t border-gray-700">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
        <div className="ml-3">
          <p className="text-sm font-semibold text-white">Lee Collins</p>
          <p className="text-xs text-gray-400">Project Manager</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-white">
        <ChevronDownIcon />
      </button>
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  // FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
  const navItems: { icon: React.ReactNode; label: Page }[] = [
    { icon: <DashboardIcon />, label: 'Project Hub' },
    { icon: <TasksIcon />, label: 'Tasks' },
    { icon: <CalendarIcon />, label: 'Schedule' },
    { icon: <BriefcaseIcon />, label: 'Staff' },
    { icon: <FolderIcon />, label: 'Documents' },
    { icon: <DollarSignIcon />, label: 'Financials' },
    { icon: <UsersIcon />, label: 'Client Portal' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ];

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false); // Close sidebar on nav item click on mobile
  };

  return (
    <div className={`w-64 bg-prestige-charcoal text-white flex flex-col flex-shrink-0 fixed md:relative h-full z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <Logo />
      <nav className="flex-1 space-y-2 px-4">
        {navItems.map(({ icon, label }) => (
          <NavItem 
            key={label}
            icon={icon} 
            label={label} 
            active={activePage === label} 
            onClick={() => handleNavClick(label)}
          />
        ))}
      </nav>
      <UserProfile />
    </div>
  );
};

export default Sidebar;
