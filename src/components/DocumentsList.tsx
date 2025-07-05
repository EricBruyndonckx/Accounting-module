import React, { useEffect, useState, Fragment } from 'react';
import { CheckCircleIcon, EyeIcon, DownloadIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, MoreVerticalIcon, TagIcon, BarChartIcon, UsersIcon, FolderIcon, DollarSignIcon, CalendarIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
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
  }, {
    type: 'Client',
    name: 'Valyana'
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
// Fonction pour obtenir l'icône d'un axe analytique
const getAxisIcon = axisType => {
  const iconMap = {
    Projet: <FolderIcon size={12} />,
    Département: <BarChartIcon size={12} />,
    Client: <UsersIcon size={12} />,
    Budget: <DollarSignIcon size={12} />,
    Équipe: <UsersIcon size={12} />,
    Catégorie: <TagIcon size={12} />,
    Priorité: <ChevronUpIcon size={12} />,
    Statut: <CheckCircleIcon size={12} />
  };
  return iconMap[axisType] || <TagIcon size={12} />;
};
// Fonction pour obtenir la couleur d'un axe analytique
const getAxisColor = axisType => {
  const colorMap = {
    Projet: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    Département: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    Client: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    Budget: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
    Équipe: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    Catégorie: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
    Priorité: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
    Statut: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
  };
  return colorMap[axisType] || 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
};
// Fonction pour convertir une date au format "MMM D, YYYY" en objet Date
const parseDate = dateString => {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  const parts = dateString.split(' ');
  const month = months[parts[0]];
  const day = parseInt(parts[1].replace(',', ''));
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
};
// Fonction pour comparer deux valeurs selon leur type
const compareValues = (valueA, valueB, key) => {
  // Pour les dates
  if (key === 'date' || key === 'uploadDate') {
    const dateA = parseDate(valueA);
    const dateB = parseDate(valueB);
    return dateA - dateB;
  }
  // Pour les montants
  if (key === 'amount') {
    return valueA - valueB;
  }
  // Pour les textes
  return String(valueA).localeCompare(String(valueB));
};
const DocumentsList = ({
  onOpenAnalyticsPanel,
  documents = mockDocuments,
  selectedDocIds = [],
  onSelectDocument = () => {},
  onSelectAllDocuments = () => {}
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [sortedDocuments, setSortedDocuments] = useState([...documents]);
  const [expandedRows, setExpandedRows] = useState({});
  // Effet pour trier les documents lorsque sortConfig change
  useEffect(() => {
    let sortableDocuments = [...documents];
    if (sortConfig.key) {
      sortableDocuments.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        const comparison = compareValues(valueA, valueB, sortConfig.key);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }
    setSortedDocuments(sortableDocuments);
  }, [sortConfig, documents]);
  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({
      key,
      direction
    });
  };
  const getSortIcon = key => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />;
  };
  const toggleRowExpanded = docId => {
    setExpandedRows(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };
  // Vérifier si tous les documents sont sélectionnés
  const allSelected = documents.length > 0 && selectedDocIds.length === documents.length;
  // Vérifier si certains documents sont sélectionnés (mais pas tous)
  const someSelected = selectedDocIds.length > 0 && selectedDocIds.length < documents.length;
  // Gérer la sélection de tous les documents
  const handleSelectAll = () => {
    if (allSelected) {
      // Si tous sont sélectionnés, désélectionner tous
      onSelectAllDocuments([]);
    } else {
      // Sinon, sélectionner tous
      onSelectAllDocuments(documents.map(doc => doc.id));
    }
  };
  // Gérer la sélection individuelle d'un document
  const handleSelectDocument = docId => {
    if (selectedDocIds.includes(docId)) {
      // Si déjà sélectionné, désélectionner
      onSelectDocument(selectedDocIds.filter(id => id !== docId));
    } else {
      // Sinon, ajouter à la sélection
      onSelectDocument([...selectedDocIds, docId]);
    }
  };
  return <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="w-12 px-4 py-3">
              <div className={`w-5 h-5 rounded border ${allSelected ? 'bg-blue-500 border-blue-500' : someSelected ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} flex items-center justify-center cursor-pointer`} onClick={handleSelectAll}>
                {allSelected && <CheckIcon size={14} className="text-white" />}
                {someSelected && <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>}
              </div>
            </th>
            <th className="px-4 py-3 text-left">
              <button className="flex items-center text-sm font-medium text-gray-700" onClick={() => handleSort('status')}>
                Statut {getSortIcon('status')}
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button className="flex items-center text-sm font-medium text-gray-700" onClick={() => handleSort('uploadDate')}>
                Date d'import {getSortIcon('uploadDate')}
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button className="flex items-center text-sm font-medium text-gray-700" onClick={() => handleSort('date')}>
                Date {getSortIcon('date')}
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button className="flex items-center text-sm font-medium text-gray-700" onClick={() => handleSort('type')}>
                Type {getSortIcon('type')}
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button className="flex items-center text-sm font-medium text-gray-700" onClick={() => handleSort('description')}>
                Description {getSortIcon('description')}
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button className="flex items-center text-sm font-medium text-gray-700" onClick={() => handleSort('currency')}>
                Devise {getSortIcon('currency')}
              </button>
            </th>
            <th className="px-4 py-3 text-right">
              <button className="flex items-center justify-end text-sm font-medium text-gray-700" onClick={() => handleSort('amount')}>
                Montant {getSortIcon('amount')}
              </button>
            </th>
            <th className="px-4 py-3 text-center">
              <span className="text-sm font-medium text-gray-700">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDocuments.map(doc => <Fragment key={doc.id}>
              <tr className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ${expandedRows[doc.id] ? 'bg-gray-50' : ''} ${selectedDocIds.includes(doc.id) ? 'bg-blue-50' : ''}`}>
                <td className="px-4 py-4">
                  <div className={`w-5 h-5 rounded border ${selectedDocIds.includes(doc.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} flex items-center justify-center cursor-pointer`} onClick={() => handleSelectDocument(doc.id)}>
                    {selectedDocIds.includes(doc.id) && <CheckIcon size={14} className="text-white" />}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <CheckCircleIcon size={12} className="mr-1" />
                      Validé
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <CalendarIcon size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">
                      {doc.uploadDate}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <CalendarIcon size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">{doc.date}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                    {doc.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 truncate max-w-xs">
                      {doc.description}
                    </span>
                    {doc.analyticalAxes && doc.analyticalAxes.length > 0 && <div className="flex flex-wrap gap-1 mt-2">
                        {doc.analyticalAxes.slice(0, 2).map((axis, index) => <div key={index} className={`text-xs px-2 py-0.5 rounded-md border flex items-center transition-all duration-200 ${getAxisColor(axis.type)}`}>
                            {getAxisIcon(axis.type)}
                            <span className="ml-1 truncate max-w-[100px]">
                              {axis.name}
                            </span>
                          </div>)}
                        {doc.analyticalAxes.length > 2 && <button className="text-xs px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors duration-200 flex items-center" onClick={() => toggleRowExpanded(doc.id)}>
                            +{doc.analyticalAxes.length - 2}
                            <ChevronRightIcon size={12} className={`ml-1 transition-transform duration-200 ${expandedRows[doc.id] ? 'rotate-90' : ''}`} />
                          </button>}
                      </div>}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-700 font-medium">
                    {doc.currency}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-medium text-gray-800">
                    {doc.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <EyeIcon size={16} />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200" onClick={() => onOpenAnalyticsPanel(doc)}>
                      <MoreVerticalIcon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
              {/* Ligne pour les axes analytiques supplémentaires - visible uniquement si la ligne est étendue */}
              {expandedRows[doc.id] && doc.analyticalAxes && doc.analyticalAxes.length > 2 && <tr className="bg-gray-50 border-b border-gray-200 animate-fadeIn">
                    <td className="py-3" colSpan={9}>
                      <div className="flex flex-wrap gap-2 px-4 py-2 ml-20">
                        {doc.analyticalAxes.slice(2).map((axis, index) => <div key={index} className={`text-xs px-3 py-1.5 rounded-md border flex items-center transition-all duration-200 ${getAxisColor(axis.type)}`}>
                            {getAxisIcon(axis.type)}
                            <span className="ml-1.5 font-medium">
                              {axis.type}:
                            </span>
                            <span className="ml-1">{axis.name}</span>
                          </div>)}
                      </div>
                    </td>
                  </tr>}
            </Fragment>)}
        </tbody>
      </table>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>;
};
export default DocumentsList;