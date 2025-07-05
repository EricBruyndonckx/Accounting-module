import React, { useState } from 'react';
import { SearchIcon, FilterIcon, DownloadIcon, EyeIcon, ChevronUpIcon, ChevronDownIcon, XIcon, AlertCircleIcon, CheckCircleIcon, SendIcon, ClockIcon, CalendarIcon, UserIcon, DollarSignIcon, FileIcon } from 'lucide-react';
import DocumentsList from './DocumentsList';
import AnalyticsPanel from './AnalyticsPanel';
const mockDocuments = [{
  id: 1,
  status: 'validated',
  uploadDate: 'Jul 4, 2025',
  date: 'Jul 1, 2025',
  type: 'Purchases',
  description: 'Ringler Informatik Sa K74S1CA1d17KUA0Uplsb2jUZ0lA',
  currency: 'CHF',
  amount: 345.9,
  analyticalAxes: [{
    type: 'Projet',
    name: 'Projet Alpha'
  }, {
    type: 'Département',
    name: 'Département Tech'
  }]
}, {
  id: 2,
  status: 'validated',
  uploadDate: 'Jul 4, 2025',
  date: 'Jul 4, 2025',
  type: 'Purchases',
  description: 'Wp Engine 639437',
  currency: 'USD',
  amount: 49.0,
  analyticalAxes: [{
    type: 'Projet',
    name: 'Projet Beta'
  }, {
    type: 'Département',
    name: 'Département Marketing'
  }]
}, {
  id: 3,
  status: 'validated',
  uploadDate: 'Jul 4, 2025',
  date: 'Jul 4, 2025',
  type: 'Purchases',
  description: 'Wordfence',
  currency: 'USD',
  amount: 149.0,
  analyticalAxes: [{
    type: 'Projet',
    name: 'Projet Alpha'
  }, {
    type: 'Département',
    name: 'Département Tech'
  }]
}, {
  id: 4,
  status: 'validated',
  uploadDate: 'Jul 3, 2025',
  date: 'Jul 2, 2025',
  type: 'Purchases',
  description: 'Gerber Systems & Networks Sàrl - July 2025 - № 108682',
  currency: 'CHF',
  amount: 153.23,
  analyticalAxes: [{
    type: 'Projet',
    name: 'Projet Delta'
  }, {
    type: 'Département',
    name: 'Département IT'
  }]
}, {
  id: 5,
  status: 'validated',
  uploadDate: 'Jul 2, 2025',
  date: 'May 30, 2025',
  type: 'Purchases',
  description: 'Isagency - May 2025 - № DUPLICAT',
  currency: 'EUR',
  amount: 100.0,
  analyticalAxes: [{
    type: 'Projet',
    name: 'Projet Gamma'
  }, {
    type: 'Département',
    name: 'Département Marketing'
  }]
}];
const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState(mockDocuments);
  const [activeFilters, setActiveFilters] = useState(['All statuses', 'All dates', 'All clients']);
  // Filtres
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [customerFilter, setCustomerFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('ALL');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const handleOpenAnalyticsPanel = document => {
    setSelectedDocument(document);
    setShowAnalyticsPanel(true);
  };
  const handleCloseAnalyticsPanel = () => {
    setShowAnalyticsPanel(false);
  };
  const handleSaveAnalytics = updatedDocument => {
    // Mettre à jour le document dans la liste
    const updatedDocuments = documents.map(doc => doc.id === updatedDocument.id ? updatedDocument : doc);
    setDocuments(updatedDocuments);
  };
  const removeFilter = filter => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  const clearFilters = () => {
    setStatusFilter('All statuses');
    setCustomerFilter('');
    setStartDate('');
    setEndDate('');
    setCurrencyFilter('ALL');
    setMinValue('');
    setMaxValue('');
    setActiveFilters(['All statuses', 'All dates', 'All clients']);
  };
  return <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {/* En-tête avec titre et totaux */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="flex items-center gap-4">
            {/* Barre de recherche comme dans l'image */}
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <input type="text" placeholder="Rechercher dans les documents..." className="w-full py-2 px-4 border-none focus:ring-0 focus:outline-none rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <div className="flex items-center pr-2">
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowFilters(!showFilters)}>
                    <ChevronDownIcon size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 ml-1">
                    <SearchIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Importer un document
            </button>
          </div>
        </div>

        {/* Panneau de filtres avancés */}
        {showFilters && <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowFilters(false)}>
              <XIcon size={18} />
            </button>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status:
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option>All statuses</option>
                  <option>Draft</option>
                  <option>Overdue</option>
                  <option>Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer:
                </label>
                <input type="text" placeholder="Customer name" className="w-full border border-gray-300 rounded-md p-2" value={customerFilter} onChange={e => setCustomerFilter(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date range:
                </label>
                <div className="flex items-center">
                  <input type="date" className="flex-1 border border-gray-300 rounded-md p-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
                  <span className="px-2">—</span>
                  <input type="date" className="flex-1 border border-gray-300 rounded-md p-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency:
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2" value={currencyFilter} onChange={e => setCurrencyFilter(e.target.value)}>
                  <option>ALL</option>
                  <option>CHF</option>
                  <option>EUR</option>
                  <option>USD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value:
                </label>
                <div className="flex items-center">
                  <select className="flex-1 border border-gray-300 rounded-md p-2" value={minValue} onChange={e => setMinValue(e.target.value)}>
                    <option value="">min</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span className="px-2">—</span>
                  <select className="flex-1 border border-gray-300 rounded-md p-2" value={maxValue} onChange={e => setMaxValue(e.target.value)}>
                    <option value="">max</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                  </select>
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>}

        {/* Statistiques */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard number="12" label="Documents envoyés" change="+3 vs dernier mois" icon={<SendIcon size={24} />} color="bg-blue-100 text-blue-500" />
          <StatCard number="24" label="Documents traités" change="+5 vs dernier mois" icon={<CheckCircleIcon size={24} />} color="bg-green-100 text-green-500" />
          <StatCard number="8" label="Documents en attente" change="-2 vs dernier mois" icon={<ClockIcon size={24} />} color="bg-orange-100 text-orange-500" />
          <StatCard number="3" label="Documents bloqués" change="+1 vs dernier mois" icon={<AlertCircleIcon size={24} />} color="bg-red-100 text-red-500" />
        </div>

        {/* Barre de filtres rapides et bouton d'export */}
        <div className="flex items-center justify-between mb-6 py-3 px-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            <div className="flex gap-2">
              <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                <option>All statuses</option>
                <option>Draft</option>
                <option>Overdue</option>
                <option>Paid</option>
              </select>
              <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                <option>All dates</option>
                <option>Today</option>
                <option>This week</option>
                <option>This month</option>
              </select>
              <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                <option>All clients</option>
                <option>WeCount SA</option>
                <option>Valyana</option>
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50">
            <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Export Excel</span>
          </button>
        </div>

        <DocumentsList onOpenAnalyticsPanel={handleOpenAnalyticsPanel} documents={documents} />
      </div>

      {/* Panneau d'analyse en superposition */}
      {showAnalyticsPanel && <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-10" onClick={handleCloseAnalyticsPanel}></div>
          <div className="fixed right-0 top-0 bottom-0 z-20">
            <AnalyticsPanel document={selectedDocument} onClose={handleCloseAnalyticsPanel} onSave={handleSaveAnalytics} />
          </div>
        </>}
    </div>;
};
const StatCard = ({
  number,
  label,
  change,
  icon,
  color
}) => {
  return <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start">
      <div className="flex-1">
        <div className="text-2xl font-bold">{number}</div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xs text-gray-500 mt-1">{change}</div>
      </div>
      <div className={`rounded-full p-2 ${color}`}>{icon}</div>
    </div>;
};
export default DocumentsPage;