
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import { Page } from './types';
import Tasks from './components/pages/Tasks';
import Schedule from './components/pages/Schedule';
import Documents from './components/pages/Documents';
import Financials from './components/pages/Financials';
import ClientPortal from './components/pages/ClientPortal';
import Settings from './components/pages/Settings';
import Staff from './components/pages/Staff';
import { useData } from './hooks/useData';
import LoadingSpinner from './components/ui/LoadingSpinner';


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Project Hub');
  const { loading } = useData();

  const renderContent = () => {
    switch (activePage) {
      case 'Project Hub':
        return <Dashboard setActivePage={setActivePage} />;
      case 'Tasks':
        return <Tasks />;
      case 'Schedule':
        return <Schedule />;
      case 'Staff':
        return <Staff />;
      case 'Documents':
        return <Documents />;
      case 'Financials':
        return <Financials />;
      case 'Client Portal':
        return <ClientPortal />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-prestige-light-gray font-sans text-prestige-charcoal">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={activePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-prestige-light-gray p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// FIX: Corrected a typo in the export statement from 'export a default' to 'export default'.
export default App;