import React, { useEffect, useState } from 'react';
import { XIcon, TagIcon, BarChartIcon, PlusIcon, TrashIcon, EditIcon } from 'lucide-react';
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
    color: 'text-blue-500',
    sections: projectOptions
  }, {
    id: 2,
    name: 'Département',
    icon: <TagIcon size={16} className="text-green-500" />,
    color: 'text-green-500',
    sections: departmentOptions
  }, {
    id: 3,
    name: 'Client',
    icon: <TagIcon size={16} className="text-purple-500" />,
    color: 'text-purple-500',
    sections: clientOptions
  }]);
  // État pour les sélections actuelles
  const [documentAxes, setDocumentAxes] = useState({});
  // État pour la création/édition d'axes
  const [isCreatingAxis, setIsCreatingAxis] = useState(false);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [currentAxisForSection, setCurrentAxisForSection] = useState(null);
  const [newAxisName, setNewAxisName] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [editingAxis, setEditingAxis] = useState(null);
  // Initialiser les sélections à partir du document
  useEffect(() => {
    if (document && document.analyticalAxes) {
      const axesMap = {};
      document.analyticalAxes.forEach(axis => {
        if (axis.type && axis.name) {
          axesMap[axis.type] = axis.name;
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
  // Gérer le changement de sélection d'axe pour un document
  const handleAxisSelectionChange = (axisName, sectionName) => {
    setDocumentAxes({
      ...documentAxes,
      [axisName]: sectionName
    });
  };
  // Enregistrer les modifications
  const handleSave = () => {
    // Convertir les sélections en format attendu
    const updatedAxes = Object.entries(documentAxes).filter(([_, value]) => value) // Filtrer les valeurs vides
    .map(([type, name]) => ({
      type,
      name
    }));
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
          {analyticalAxes.map(axis => <div key={axis.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {axis.icon}
                  <span className="text-sm font-medium ml-1">{axis.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => {
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
                  <button onClick={() => handleEditAxis(axis)} className="text-gray-500 hover:text-gray-700 p-1" title="Modifier l'axe">
                    <EditIcon size={14} />
                  </button>
                  <button onClick={() => handleDeleteAxis(axis.id)} className="text-red-500 hover:text-red-700 p-1" title="Supprimer l'axe">
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
              <select className="w-full p-2 border border-gray-300 rounded-md text-sm" value={documentAxes[axis.name] || ''} onChange={e => handleAxisSelectionChange(axis.name, e.target.value)}>
                <option value="">Sélectionner</option>
                {axis.sections.map(section => <option key={section.id} value={section.name}>
                    {section.name}
                  </option>)}
              </select>
            </div>)}
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4" onClick={handleSave}>
          Enregistrer
        </button>
      </div>
    </div>;
};
export default AnalyticsPanel;