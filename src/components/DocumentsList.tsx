import React, { useEffect, useState, Fragment } from 'react';
import { CheckCircleIcon, EyeIcon, DownloadIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
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
// Fonction pour obtenir la couleur d'un axe analytique
const getAxisColor = axisType => {
  const colorMap = {
    Projet: 'bg-blue-100 text-blue-800',
    Département: 'bg-green-100 text-green-800',
    Client: 'bg-purple-100 text-purple-800',
    // Couleurs pour d'autres axes potentiels
    Budget: 'bg-yellow-100 text-yellow-800',
    Équipe: 'bg-red-100 text-red-800',
    Catégorie: 'bg-indigo-100 text-indigo-800',
    Priorité: 'bg-pink-100 text-pink-800',
    Statut: 'bg-teal-100 text-teal-800'
  };
  return colorMap[axisType] || 'bg-gray-100 text-gray-800';
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
  documents = mockDocuments
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [sortedDocuments, setSortedDocuments] = useState([...documents]);
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
  return <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="w-12 px-4 py-3">
              <input type="checkbox" className="rounded" />
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
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-4">
                  <CheckCircleIcon size={20} className="text-green-500" />
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {doc.uploadDate}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{doc.date}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{doc.type}</td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {doc.description}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {doc.currency}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 text-right">
                  {doc.amount.toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <EyeIcon size={18} />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => onOpenAnalyticsPanel(doc)}>
                      <MoreVerticalIcon size={18} />
                    </button>
                  </div>
                </td>
              </tr>
              {/* Ligne pour les axes analytiques */}
              {doc.analyticalAxes && doc.analyticalAxes.length > 0 && <tr className="bg-gray-50">
                  <td className="px-4 py-2" colSpan={9}>
                    <div className="flex flex-wrap gap-2 py-1">
                      {doc.analyticalAxes.map((axis, index) => <div key={index} className={`text-xs px-2 py-1 rounded-md inline-flex items-center ${getAxisColor(axis.type)}`}>
                          <span className="font-medium">{axis.type}:</span>
                          <span className="ml-1">{axis.name}</span>
                        </div>)}
                    </div>
                  </td>
                </tr>}
            </Fragment>)}
        </tbody>
      </table>
    </div>;
};
export default DocumentsList;