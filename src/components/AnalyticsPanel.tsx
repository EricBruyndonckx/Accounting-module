import React, { useEffect, useState } from 'react';
import { XIcon, TagIcon, BarChartIcon, PlusIcon, TrashIcon, EditIcon, FolderIcon, UsersIcon, DollarSignIcon, CheckIcon } from 'lucide-react';
// Données de test
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
const AnalyticsPanel = ({
  document,
  onClose,
  onSave
}) => {
  // État pour les axes et sections analytiques
  const [analyticalAxes, setAnalyticalAxes] = useState([{
    id: 1,
    name: 'Projet',
    icon: <BarChartIcon size={16} className="text-blue-500" />,
    iconId: 'chart',
    color: 'text-blue-500',
    sections: projectOptions
  }, {
    id: 2,
    name: 'Département',
    icon: <TagIcon size={16} className="text-green-500" />,
    iconId: 'tag',
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
  // État pour les sélections actuelles (maintenant un objet avec des tableaux pour les valeurs multiples)
  const [documentAxes, setDocumentAxes] = useState({});
  // État pour la création/édition d'axes
  const [isCreatingAxis, setIsCreatingAxis] = useState(false);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [currentAxisForSection, setCurrentAxisForSection] = useState(null);
  const [newAxisName, setNewAxisName] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [editingAxis, setEditingAxis] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('tag');
  // État pour gérer l'affichage des sections
  const [expandedAxes, setExpandedAxes] = useState({});
  // Liste des icônes disponibles
  const availableIcons = [{
    id: 'tag',
    icon: <TagIcon size={16} className="text-gray-500" />,
    label: 'Tag'
  }, {
    id: 'chart',
    icon: <BarChartIcon size={16} className="text-blue-500" />,
    label: 'Graphique'
  }, {
    id: 'folder',
    icon: <FolderIcon size={16} className="text-yellow-500" />,
    label: 'Dossier'
  }, {
    id: 'user',
    icon: <UsersIcon size={16} className="text-purple-500" />,
    label: 'Utilisateur'
  }, {
    id: 'dollar',
    icon: <DollarSignIcon size={16} className="text-green-500" />,
    label: 'Finance'
  }];
  // Fonction pour obtenir l'icône par son ID
  const getIconById = iconId => {
    const found = availableIcons.find(item => item.id === iconId);
    return found ? found.icon : availableIcons[0].icon;
  };
  // Initialiser les sélections à partir du document
  useEffect(() => {
    if (document && document.analyticalAxes) {
      const axesMap = {};
      // Regrouper les axes par type
      document.analyticalAxes.forEach(axis => {
        if (axis.type && axis.name) {
          if (!axesMap[axis.type]) {
            axesMap[axis.type] = [];
          }
          // Ajouter le nom à la liste des valeurs pour ce type
          if (!axesMap[axis.type].includes(axis.name)) {
            axesMap[axis.type].push(axis.name);
          }
        }
      });
      setDocumentAxes(axesMap);
    }
  }, [document]);
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
        name: newAxisName,
        icon: getIconById(selectedIcon),
        iconId: selectedIcon
      } : axis));
      setEditingAxis(null);
    } else {
      // Mode création
      const newAxis = {
        id: Date.now(),
        name: newAxisName,
        icon: getIconById(selectedIcon),
        iconId: selectedIcon,
        color: 'text-gray-500',
        sections: []
      };
      setAnalyticalAxes([...analyticalAxes, newAxis]);
    }
    setNewAxisName('');
    setSelectedIcon('tag');
    setIsCreatingAxis(false);
  };
  // Supprimer un axe
  const handleDeleteAxis = axisId => {
    setAnalyticalAxes(analyticalAxes.filter(axis => axis.id !== axisId));
    // Mettre à jour les sélections du document
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
    setSelectedIcon(axis.iconId || 'tag');
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
  // Gérer le changement de sélection d'axe pour un document (sélection multiple)
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
    // Convertir les sélections en format attendu
    const updatedAxes = [];
    // Pour chaque type d'axe avec des sélections
    Object.entries(documentAxes).forEach(([type, names]) => {
      // Pour chaque nom sélectionné pour ce type
      if (Array.isArray(names)) {
        names.forEach(name => {
          if (name) {
            // Ignorer les valeurs vides
            updatedAxes.push({
              type,
              name
            });
          }
        });
      }
    });
    // Créer une copie mise à jour du document
    const updatedDocument = {
      ...document,
      analyticalAxes: updatedAxes
    };
    // Si onSave est fourni, appeler la fonction avec le document mis à jour
    if (onSave) {
      onSave(updatedDocument);
    }
    // Fermer le panneau
    onClose();
  };
  return <div className="w-80 bg-white border-l border-gray-200 h-full overflow-auto flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <h2 className="font-medium">Détails du document</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Document</p>
          <p className="font-medium">{document.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500 mr-2">Montant:</span>
            <span className="font-medium">
              {document.amount.toFixed(2)} {document.currency}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-500 mr-2">Date:</span>
            <span className="font-medium">{document.date}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h3 className="font-medium">Axes analytiques</h3>
          <button onClick={() => {
          if (analyticalAxes.length < 8) {
            setIsCreatingAxis(true);
            setEditingAxis(null);
            setNewAxisName('');
            setSelectedIcon('tag');
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
            {/* Sélecteur d'icône */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Icône</label>
              <div className="flex flex-wrap gap-2">
                {availableIcons.map(iconOption => <button key={iconOption.id} type="button" onClick={() => setSelectedIcon(iconOption.id)} className={`p-2 rounded-md flex flex-col items-center ${selectedIcon === iconOption.id ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'}`} title={iconOption.label}>
                    {iconOption.icon}
                    <span className="text-xs mt-1">{iconOption.label}</span>
                  </button>)}
              </div>
            </div>
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
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4" onClick={handleSave}>
          Enregistrer
        </button>
      </div>
    </div>;
};
export default AnalyticsPanel;