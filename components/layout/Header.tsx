
import React from 'react';
import { SearchIcon, BellIcon } from '../icons/Icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center flex-shrink-0 border-b border-prestige-gray">
      <h2 className="text-2xl font-bold text-prestige-charcoal">{title}</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 pl-10 pr-4 py-2 border border-prestige-gray rounded-lg focus:ring-prestige-teal focus:border-prestige-teal transition"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-prestige-gray transition">
          <BellIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;