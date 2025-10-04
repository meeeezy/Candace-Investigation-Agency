// FIX: Implemented the full content for the InvestigationView component.
import React, { useState } from 'react';
import type { Operation, Person } from '../types';
import SpiderMap from './SpiderMap';
import ProfileModal from './ProfileModal';

interface InvestigationViewProps {
  operation: Operation;
  onBack: () => void;
}

const InvestigationView: React.FC<InvestigationViewProps> = ({ operation, onBack }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleNodeClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-300">{operation.title}</h2>
          <p className="text-purple-400 mt-1">{operation.description}</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 border-2 border-purple-700 hover:border-purple-300 bg-gray-900/50 hover:bg-purple-900/30 text-purple-300 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 whitespace-nowrap"
        >
          &lt; Back to Dashboard
        </button>
      </div>

      <div className="relative border-2 border-purple-700 rounded-lg bg-gray-900/50 p-4 h-[70vh] neon-box-strong">
        <SpiderMap
          people={operation.people}
          connections={operation.connections}
          onNodeClick={handleNodeClick}
        />
      </div>

      {selectedPerson && (
        <ProfileModal
          person={selectedPerson}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default InvestigationView;
