import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocumentsPage from './components/DocumentsPage';
export function App() {
  return <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <DocumentsPage />
    </div>;
}