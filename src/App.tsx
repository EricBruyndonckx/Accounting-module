import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocumentsPage from './components/DocumentsPage';
import DashboardPage from './components/DashboardPage';
export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const handleNavigation = page => {
    setCurrentPage(page);
  };
  return <div className="flex w-full h-screen bg-gray-50">
      <Sidebar onNavigation={handleNavigation} activePage={currentPage} />
      {currentPage === 'dashboard' ? <DashboardPage /> : <DocumentsPage />}
    </div>;
}