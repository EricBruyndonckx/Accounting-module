import React, { useState } from 'react';
import { XIcon, TagIcon, BarChartIcon, PlusIcon, TrashIcon, EditIcon, UsersIcon, FolderIcon, DollarSignIcon, CheckCircleIcon, ChevronUpIcon, CheckIcon } from 'lucide-react';
// Données de test (les mêmes que dans AnalyticsPanel.tsx)
const projectOptions = [{
  id: 1,
  name: 'Projet Alpha'
}, {
  id: 2,
  name: 'Projet Beta'
}, {
  id: 3,
  name: 'Projet Gamma'
}, {
  id: 4,
  name: 'Projet Delta'
}];
const departmentOptions = [{
  id: 1,
  name: 'Département Tech'
}, {
  id: 2,
  name: 'Département Marketing'
}, {
  id: 3,
  name: 'Département IT'
}, {
  id: 4,
  name: 'Département Finance'
}];
const clientOptions = [{
  id: 1,
  name: 'Valyana'
}, {
  id: 2,
  name: 'Valom'
}, {
  id: 3,
  name: 'Eric'
}];
const BulkAnalyticsPanel = ({
  selectedCount,
  onClose,
  onSave
}) => {
  // État pour les axes et sections analytiques
  const [analyticalAxes, setAnalyticalAxes] = useState([{
    id: 1,
    name: 'Projet',
    icon: <FolderIcon size={16} className="text-blue-500" />,
    iconId: 'folder',
    color: 'text-blue-500',
    sections: projectOptions
  }, {
    id: 2,
    name: 'Département',
    icon: <BarChartIcon size={16} className="text-green-500" />,
    iconId: 'chart',
    color: 'text-green-500',
    sections: departmentOptions
  }, {
    id: 3,
    name: 'Client',
    icon: <UsersIcon size={16} className="text-purple-500" />,
    iconId: 'user',
    color: 'text-purple-500',
    sections: clientOptions
  }, {
    id: 4,
    name: 'Budget',
    icon: <DollarSignIcon size={16} className="text-yellow-500" />,
    iconId: 'dollar',
    color: 'text-yellow-500',
    sections: [{
      id: 1,
      name: 'Budget Marketing'
    }, {
      id: 2,
      name: 'Budget IT'
    }, {
      id: 3,
      name: 'Budget R&D'
    }, {
      id: 4,
      name: 'Budget Opérationnel'
    }]
  }, {
    id: 5,
    name: 'Catégorie',
    icon: <FolderIcon size={16} className="text-indigo-500" />,
    iconId: 'folder',
    color: 'text-indigo-500',
    sections: [{
      id: 1,
      name: 'Matériel'
    }, {
      id: 2,
      name: 'Logiciel'
    }, {
      id: 3,
      name: 'Services'
    }, {
      id: 4,
      name: 'Formation'
    }]
  }, {
    id: 6,
    name: 'Priorité',
    icon: <TagIcon size={16} className="text-red-500" />,
    iconId: 'tag',
    color: 'text-red-500',
    sections: [{
      id: 1,
      name: 'Haute'
    }, {
      id: 2,
      name: 'Moyenne'
    }, {
      id: 3,
      name: 'Basse'
    }]
  }]);
  // État pour les sélections actuelles (modifié pour supporter les sélections multiples)
  const [documentAxes, setDocumentAxes] = useState({});
  // État pour la création/édition d'axes
  const [isCreatingAxis, setIsCreatingAxis] = useState(false);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [currentAxisForSection, setCurrentAxisForSection] = useState(null);
  const [newAxisName, setNewAxisName] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [editingAxis, setEditingAxis] = useState(null);
  // État pour gérer l'affichage des sections
  const [expandedAxes, setExpandedAxes] = useState({});
  // Ajouter un nouvel axe
  const handleAddAxis = () => {
    if (analyticalAxes.length >= 8) {
      alert('Vous ne pouvez pas ajouter plus de 8 axes analytiques.');
      return;
    }
    if (newAxisName.trim() === '') {
      alert("Le nom de l'axe ne peut pas être vide.");
      return;
    }
    if (editingAxis) {
      // Mode édition
      setAnalyticalAxes(analyticalAxes.map(axis => axis.id === editingAxis.id ? {
        ...axis,
        name: newAxisName
      } : axis));
      setEditingAxis(null);
    } else {
      // Mode création
      const newAxis = {
        id: Date.now(),
        name: newAxisName,
        icon: <TagIcon size={16} className="text-gray-500" />,
        color: 'text-gray-500',
        sections: []
      };
      setAnalyticalAxes([...analyticalAxes, newAxis]);
    }
    setNewAxisName('');
    setIsCreatingAxis(false);
  };
  // Supprimer un axe
  const handleDeleteAxis = axisId => {
    setAnalyticalAxes(analyticalAxes.filter(axis => axis.id !== axisId));
    // Mettre à jour les sélections
    const updatedAxes = {
      ...documentAxes
    };
    const axisToDelete = analyticalAxes.find(axis => axis.id === axisId);
    if (axisToDelete && updatedAxes[axisToDelete.name]) {
      delete updatedAxes[axisToDelete.name];
      setDocumentAxes(updatedAxes);
    }
  };
  // Éditer un axe
  const handleEditAxis = axis => {
    setNewAxisName(axis.name);
    setEditingAxis(axis);
    setIsCreatingAxis(true);
  };
  // Ajouter une section à un axe
  const handleAddSection = () => {
    if (!currentAxisForSection) return;
    const axis = analyticalAxes.find(a => a.id === currentAxisForSection);
    if (!axis) return;
    if (axis.sections.length >= 15) {
      alert('Vous ne pouvez pas ajouter plus de 15 sections à cet axe.');
      return;
    }
    if (newSectionName.trim() === '') {
      alert('Le nom de la section ne peut pas être vide.');
      return;
    }
    const newSection = {
      id: Date.now(),
      name: newSectionName
    };
    setAnalyticalAxes(analyticalAxes.map(a => a.id === currentAxisForSection ? {
      ...a,
      sections: [...a.sections, newSection]
    } : a));
    setNewSectionName('');
    setIsCreatingSection(false);
    setCurrentAxisForSection(null);
  };
  // Gérer le changement de sélection d'axe (sélection multiple)
  const handleAxisSelectionChange = (axisName, sectionName) => {
    setDocumentAxes(prev => {
      const currentSelections = prev[axisName] || [];
      // Si la section est déjà sélectionnée, la retirer
      if (currentSelections.includes(sectionName)) {
        return {
          ...prev,
          [axisName]: currentSelections.filter(name => name !== sectionName)
        };
      }
      // Sinon, l'ajouter
      else {
        return {
          ...prev,
          [axisName]: [...currentSelections, sectionName]
        };
      }
    });
  };
  // Basculer l'affichage des sections pour un axe
  const toggleAxisExpanded = axisId => {
    setExpandedAxes(prev => ({
      ...prev,
      [axisId]: !prev[axisId]
    }));
  };
  // Enregistrer les modifications
  const handleSave = () => {
    // Appeler la fonction onSave avec les axes analytiques à appliquer
    onSave(documentAxes);
  };
  return <div className="w-80 bg-white border-l border-gray-200 h-full overflow-auto flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <h2 className="font-medium">Édition en masse</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <div className="px-4 py-3 bg-blue-50 border border-blue-100 rounded-md flex items-center mb-4">
            <div className="mr-3 bg-blue-100 rounded-full p-2">
              <TagIcon size={16} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">
                {selectedCount} document{selectedCount > 1 ? 's' : ''}{' '}
                sélectionné{selectedCount > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-blue-600">
                Les modifications seront appliquées à tous les documents
                sélectionnés
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h3 className="font-medium">Axes analytiques à appliquer</h3>
          <button onClick={() => {
          if (analyticalAxes.length < 8) {
            setIsCreatingAxis(true);
            setEditingAxis(null);
            setNewAxisName('');
          } else {
            alert('Vous ne pouvez pas ajouter plus de 8 axes analytiques.');
          }
        }} className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
            <PlusIcon size={14} className="mr-1" />
            Ajouter un axe
          </button>
        </div>
        {/* Formulaire d'ajout/édition d'axe */}
        {isCreatingAxis && <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">
              {editingAxis ? "Modifier l'axe" : 'Nouvel axe analytique'}
            </h4>
            <input type="text" placeholder="Nom de l'axe" value={newAxisName} onChange={e => setNewAxisName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => {
            setIsCreatingAxis(false);
            setEditingAxis(null);
          }} className="px-3 py-1 text-sm border border-gray-300 rounded-md">
                Annuler
              </button>
              <button onClick={handleAddAxis} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">
                {editingAxis ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </div>}
        {/* Formulaire d'ajout de section */}
        {isCreatingSection && <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">
              Nouvelle section pour{' '}
              {analyticalAxes.find(a => a.id === currentAxisForSection)?.name}
            </h4>
            <input type="text" placeholder="Nom de la section" value={newSectionName} onChange={e => setNewSectionName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => {
            setIsCreatingSection(false);
            setCurrentAxisForSection(null);
          }} className="px-3 py-1 text-sm border border-gray-300 rounded-md">
                Annuler
              </button>
              <button onClick={handleAddSection} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">
                Ajouter
              </button>
            </div>
          </div>}
        {/* Liste des axes et leurs sélections */}
        <div className="space-y-4 mb-6">
          {analyticalAxes.map(axis => <div key={axis.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 cursor-pointer" onClick={() => toggleAxisExpanded(axis.id)}>
                <div className="flex items-center">
                  {axis.icon}
                  <span className="text-sm font-medium ml-1">{axis.name}</span>
                  {documentAxes[axis.name] && documentAxes[axis.name].length > 0 && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                        {documentAxes[axis.name].length}
                      </span>}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={e => {
                e.stopPropagation();
                if (axis.sections.length < 15) {
                  setIsCreatingSection(true);
                  setCurrentAxisForSection(axis.id);
                  setNewSectionName('');
                } else {
                  alert('Vous ne pouvez pas ajouter plus de 15 sections à cet axe.');
                }
              }} className="text-blue-500 hover:text-blue-700 p-1" title="Ajouter une section">
                    <PlusIcon size={14} />
                  </button>
                  <button onClick={e => {
                e.stopPropagation();
                handleEditAxis(axis);
              }} className="text-gray-500 hover:text-gray-700 p-1" title="Modifier l'axe">
                    <EditIcon size={14} />
                  </button>
                  <button onClick={e => {
                e.stopPropagation();
                handleDeleteAxis(axis.id);
              }} className="text-red-500 hover:text-red-700 p-1" title="Supprimer l'axe">
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
              {/* Liste des sections avec cases à cocher pour sélection multiple */}
              {expandedAxes[axis.id] && <div className="p-2 max-h-48 overflow-y-auto">
                  {axis.sections.length > 0 ? <div className="space-y-1">
                      {axis.sections.map(section => <div key={section.id} className="flex items-center p-1.5 hover:bg-gray-50 rounded cursor-pointer" onClick={() => handleAxisSelectionChange(axis.name, section.name)}>
                          <div className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${documentAxes[axis.name]?.includes(section.name) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                            {documentAxes[axis.name]?.includes(section.name) && <CheckIcon size={12} className="text-white" />}
                          </div>
                          <span className="text-sm">{section.name}</span>
                        </div>)}
                    </div> : <p className="text-sm text-gray-500 p-2">
                      Aucune section disponible
                    </p>}
                </div>}
            </div>)}
        </div>
        <div className="border-t pt-4 mt-4">
          <p className="text-sm text-gray-500 mb-4">
            Les axes sélectionnés seront appliqués à tous les documents
            sélectionnés. Les axes existants avec le même nom seront remplacés.
          </p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors" onClick={handleSave}>
            Appliquer aux {selectedCount} document{selectedCount > 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>;
};
export default BulkAnalyticsPanel;