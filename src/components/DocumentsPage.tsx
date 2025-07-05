import React, { useState } from 'react';
import { SearchIcon, FilterIcon, DownloadIcon, EyeIcon, ChevronUpIcon, ChevronDownIcon, XIcon, AlertCircleIcon, CheckCircleIcon, SendIcon, ClockIcon, CalendarIcon, UserIcon, DollarSignIcon, FileIcon, EditIcon, TagIcon, CheckIcon } from 'lucide-react';
import DocumentsList from './DocumentsList';
import AnalyticsPanel from './AnalyticsPanel';
import BulkAnalyticsPanel from './BulkAnalyticsPanel';
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
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [showBulkAnalyticsPanel, setShowBulkAnalyticsPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState(['All statuses', 'All dates', 'All clients']);
  // Filtres avancés
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  // Add new state for analytical axes
  const [availableAnalyticalAxes] = useState([{
    id: 1,
    name: 'Projet',
    sections: [{
      id: 1,
      name: 'Projet Alpha'
    }, {
      id: 2,
      name: 'Projet Beta'
    }, {
      id: 3,
      name: 'Projet Gamma'
    }]
  }, {
    id: 2,
    name: 'Département',
    sections: [{
      id: 1,
      name: 'Département Tech'
    }, {
      id: 2,
      name: 'Département Marketing'
    }, {
      id: 3,
      name: 'Département IT'
    }]
  }, {
    id: 3,
    name: 'Budget',
    sections: [{
      id: 1,
      name: 'Budget Marketing'
    }, {
      id: 2,
      name: 'Budget IT'
    }, {
      id: 3,
      name: 'Budget R&D'
    }]
  }]);
  const [selectedAnalyticalAxes, setSelectedAnalyticalAxes] = useState([]);
  // Add handler for toggling axes selection
  const handleAnalyticalAxisToggle = axisName => {
    setSelectedAnalyticalAxes(prev => prev.includes(axisName) ? prev.filter(name => name !== axisName) : [...prev, axisName]);
  };
  // Add function to get available sections
  const getAvailableSections = () => {
    const sections = [];
    availableAnalyticalAxes.filter(axis => selectedAnalyticalAxes.includes(axis.name)).forEach(axis => {
      sections.push(...axis.sections);
    });
    return sections;
  };
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
  // Gérer la sélection de documents
  const handleSelectDocument = docIds => {
    setSelectedDocIds(docIds);
  };
  // Gérer la sélection de tous les documents
  const handleSelectAllDocuments = docIds => {
    setSelectedDocIds(docIds);
  };
  // Ouvrir le panneau d'édition en masse
  const handleOpenBulkAnalyticsPanel = () => {
    setShowBulkAnalyticsPanel(true);
  };
  // Fermer le panneau d'édition en masse
  const handleCloseBulkAnalyticsPanel = () => {
    setShowBulkAnalyticsPanel(false);
  };
  // Enregistrer les modifications en masse
  const handleSaveBulkAnalytics = analyticalAxesToApply => {
    // Créer une copie des documents
    const updatedDocuments = documents.map(doc => {
      // Si le document est sélectionné, appliquer les modifications
      if (selectedDocIds.includes(doc.id)) {
        // Créer une copie des axes analytiques existants
        let updatedAxes = [...(doc.analyticalAxes || [])];
        // Pour chaque axe à appliquer
        Object.entries(analyticalAxesToApply).forEach(([axisType, sectionNames]) => {
          if (!sectionNames || sectionNames.length === 0) return; // Ignorer les axes sans sélection
          // Supprimer tous les axes existants de ce type
          updatedAxes = updatedAxes.filter(axis => axis.type !== axisType);
          // Ajouter les nouvelles sélections
          sectionNames.forEach(sectionName => {
            updatedAxes.push({
              type: axisType,
              name: sectionName
            });
          });
        });
        // Retourner le document mis à jour
        return {
          ...doc,
          analyticalAxes: updatedAxes
        };
      }
      // Si le document n'est pas sélectionné, le retourner tel quel
      return doc;
    });
    // Mettre à jour l'état des documents
    setDocuments(updatedDocuments);
    // Fermer le panneau
    setShowBulkAnalyticsPanel(false);
  };
  const removeFilter = filter => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  const clearFilters = () => {
    setStatusFilter('');
    setDateRange('');
    setStartDate('');
    setEndDate('');
    setDocumentType('');
    setDescriptionFilter('');
    setCurrencyFilter('');
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
        {showFilters && <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6 relative shadow-md">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowFilters(false)}>
              <XIcon size={18} />
            </button>
            <div className="flex mb-4">
              <div className="w-full relative">
                <SearchIcon size={18} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status:
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">All statuses</option>
                  <option value="validated">Validé</option>
                  <option value="pending">En attente</option>
                  <option value="rejected">Rejeté</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date range:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex-1 relative">
                    <input type="date" className="w-full border-none p-2 focus:ring-0 focus:outline-none text-sm" placeholder="Start date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <CalendarIcon size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="px-2 text-gray-400 bg-gray-50">—</div>
                  <div className="flex-1 relative">
                    <input type="date" className="w-full border-none p-2 focus:ring-0 focus:outline-none text-sm" placeholder="End date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <CalendarIcon size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                {startDate && endDate && <div className="mt-1 text-xs text-blue-500">
                    {new Date(startDate).toLocaleDateString()} -{' '}
                    {new Date(endDate).toLocaleDateString()}
                  </div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document type:
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2" value={documentType} onChange={e => setDocumentType(e.target.value)}>
                  <option value="">All types</option>
                  <option value="Purchases">Purchases</option>
                  <option value="Sales">Sales</option>
                  <option value="Expenses">Expenses</option>
                  <option value="Receipts">Receipts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description:
                </label>
                <input type="text" placeholder="Description" className="w-full border border-gray-300 rounded-md p-2" value={descriptionFilter} onChange={e => setDescriptionFilter(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency:
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2" value={currencyFilter} onChange={e => setCurrencyFilter(e.target.value)}>
                  <option value="">All currencies</option>
                  <option value="CHF">CHF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value:
                </label>
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <input type="number" placeholder="min" className="w-full border border-gray-300 rounded-md p-2" value={minValue} onChange={e => setMinValue(e.target.value)} />
                    <button className="absolute right-2 top-2.5 text-gray-400">
                      <ChevronUpIcon size={14} />
                    </button>
                  </div>
                  <div className="mx-2 text-gray-400">—</div>
                  <div className="relative flex-1">
                    <input type="number" placeholder="max" className="w-full border border-gray-300 rounded-md p-2" value={maxValue} onChange={e => setMaxValue(e.target.value)} />
                    <button className="absolute right-2 top-2.5 text-gray-400">
                      <ChevronUpIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex justify-end mt-2">
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
            {selectedDocIds.length > 0 ? <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {selectedDocIds.length} document
                  {selectedDocIds.length > 1 ? 's' : ''} sélectionné
                  {selectedDocIds.length > 1 ? 's' : ''}
                </span>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors" onClick={handleOpenBulkAnalyticsPanel}>
                  <TagIcon size={14} />
                  <span>Affecter des axes analytiques</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedDocIds([])}>
                  <XIcon size={16} />
                </button>
              </div> : <>
                <span className="text-sm font-medium text-gray-700">
                  Filters:
                </span>
                <div className="flex gap-2">
                  <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                    <option value="">All statuses</option>
                    <option value="processed">Processed</option>
                    <option value="in_progress">In progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="duplicated">Duplicated</option>
                    <option value="with_question">With question</option>
                    <option value="ignored">Ignored</option>
                  </select>
                  <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                    <option value="">All dates</option>
                    <option value="today">Today</option>
                    <option value="this_week">This week</option>
                    <option value="this_month">This month</option>
                    <option value="this_quarter">This quarter</option>
                    <option value="this_semester">This semester</option>
                    <option value="this_year">This year</option>
                  </select>
                  <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm">
                    <option value="">All types</option>
                    <option value="purchase">Purchase</option>
                    <option value="sales">Sales</option>
                    <option value="banking">Banking</option>
                  </select>
                  <div className="relative">
                    <button className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm flex items-center gap-1" onClick={() => {
                  const menu = document.getElementById('axes-menu');
                  if (menu) menu.classList.toggle('hidden');
                }}>
                      <span>Analytical axes</span>
                      <ChevronDownIcon size={14} />
                    </button>
                    <div id="axes-menu" className="absolute z-10 hidden mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 min-w-[200px]">
                      {availableAnalyticalAxes.map(axis => <div key={axis.id} className="flex items-center mb-1 last:mb-0">
                          <div className={`w-4 h-4 rounded border ${selectedAnalyticalAxes.includes(axis.name) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} flex items-center justify-center cursor-pointer mr-2`} onClick={() => handleAnalyticalAxisToggle(axis.name)}>
                            {selectedAnalyticalAxes.includes(axis.name) && <CheckIcon size={12} className="text-white" />}
                          </div>
                          <span className="text-sm">{axis.name}</span>
                        </div>)}
                    </div>
                  </div>
                  <select className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm" disabled={selectedAnalyticalAxes.length === 0}>
                    <option value="">Analytical sections</option>
                    {selectedAnalyticalAxes.length > 0 && availableAnalyticalAxes.filter(axis => selectedAnalyticalAxes.includes(axis.name)).map(axis => <optgroup key={axis.id} label={axis.name}>
                            {axis.sections.map(section => <option key={section.id} value={section.name}>
                                {section.name}
                              </option>)}
                          </optgroup>)}
                  </select>
                </div>
              </>}
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

        <DocumentsList onOpenAnalyticsPanel={handleOpenAnalyticsPanel} documents={documents} selectedDocIds={selectedDocIds} onSelectDocument={handleSelectDocument} onSelectAllDocuments={handleSelectAllDocuments} />
      </div>

      {/* Panneau d'analyse en superposition */}
      {showAnalyticsPanel && <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-10" onClick={handleCloseAnalyticsPanel}></div>
          <div className="fixed right-0 top-0 bottom-0 z-20">
            <AnalyticsPanel document={selectedDocument} onClose={handleCloseAnalyticsPanel} onSave={handleSaveAnalytics} />
          </div>
        </>}

      {/* Panneau d'analyse en masse */}
      {showBulkAnalyticsPanel && <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-10" onClick={handleCloseBulkAnalyticsPanel}></div>
          <div className="fixed right-0 top-0 bottom-0 z-20">
            <BulkAnalyticsPanel selectedCount={selectedDocIds.length} onClose={handleCloseBulkAnalyticsPanel} onSave={handleSaveBulkAnalytics} />
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