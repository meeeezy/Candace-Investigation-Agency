import React, { useState } from 'react';
import type { Operation, Person } from '../types';
import SpiderMap from './SpiderMap';
import ProfileModal from './ProfileModal';

interface InvestigationViewProps {
  operation: Operation;
  onBack: () => void;
  isEditing: boolean;
  onUpdatePerson: (operationId: string, personId: string, updatedPerson: Partial<Person>) => void;
  onRemovePerson: (operationId: string, personId: string) => void;
  onAddPerson: (operationId: string, personName: string) => void;
}

const InvestigationView: React.FC<InvestigationViewProps> = ({
  operation,
  onBack,
  isEditing,
  onUpdatePerson,
  onRemovePerson,
  onAddPerson
}) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleNodeClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };
  
  const handleAddClick = () => {
    const personName = prompt("Enter the name of the new person:");
    if (personName) {
      onAddPerson(operation.id, personName);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-300">{operation.title}</h2>
          <p className="text-purple-400 mt-1">{operation.description}</p>
        </div>
        <div className="flex items-center gap-4">
          {isEditing && (
             <button
              onClick={handleAddClick}
              className="px-4 py-2 border-2 border-purple-400 bg-purple-900/50 hover:bg-purple-800/50 text-purple-200 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              + Add Person
            </button>
          )}
          <button
            onClick={onBack}
            className="px-4 py-2 border-2 border-purple-700 hover:border-purple-300 bg-gray-900/50 hover:bg-purple-900/30 text-purple-300 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 whitespace-nowrap"
          >
            &lt; Back to Dashboard
          </button>
        </div>
      </div>

      <div className="relative border-2 border-purple-700 rounded-lg bg-gray-900/50 p-4 h-[70vh] neon-box">
        <SpiderMap
          key={operation.id + JSON.stringify(operation.people)}
          people={operation.people}
          connections={operation.connections}
          onNodeClick={handleNodeClick}
        />
      </div>

      {selectedPerson && (
        <ProfileModal
          person={selectedPerson}
          onClose={handleCloseModal}
          isEditing={isEditing}
          onUpdate={(updatedPerson) => onUpdatePerson(operation.id, selectedPerson.id, updatedPerson)}
          onDelete={() => {
            onRemovePerson(operation.id, selectedPerson.id);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default InvestigationView;
