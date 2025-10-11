
import React, { useState } from 'react';
import type { Operation, Person } from './types';
import { operations as initialOperations } from './data/mockData';
import OperationsDashboard from './components/OperationsDashboard';
import InvestigationView from './components/InvestigationView';
import { LockIcon } from './components/icons/LockIcon';
import { UnlockIcon } from './components/icons/UnlockIcon';

const App: React.FC = () => {
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectOperation = (operation: Operation) => {
    // Find the latest version of the operation from the state
    const currentOperation = operations.find(op => op.id === operation.id) || operation;
    setSelectedOperation(currentOperation);
  };

  const handleBackToDashboard = () => {
    setSelectedOperation(null);
  };

  const handleUpdatePerson = (operationId: string, personId: string, updatedPerson: Partial<Person>) => {
    setOperations(prevOps =>
      prevOps.map(op => {
        if (op.id === operationId) {
          const updatedPeople = op.people.map(p =>
            p.id === personId ? { ...p, ...updatedPerson } : p
          );
          const updatedOp = { ...op, people: updatedPeople };
          // Also update the selectedOperation state if it's the one being edited
          if (selectedOperation?.id === operationId) {
            setSelectedOperation(updatedOp);
          }
          return updatedOp;
        }
        return op;
      })
    );
  };
  
  const handleRemovePerson = (operationId: string, personId: string) => {
    setOperations(prevOps =>
      prevOps.map(op => {
        if (op.id === operationId) {
          const updatedPeople = op.people.filter(p => p.id !== personId);
          const updatedConnections = op.connections.filter(
            c => c.source !== personId && c.target !== personId
          );
           const updatedOp = { ...op, people: updatedPeople, connections: updatedConnections };
           if (selectedOperation?.id === operationId) {
            setSelectedOperation(updatedOp);
          }
          return updatedOp;
        }
        return op;
      })
    );
  };

  const handleAddPerson = (operationId: string, newPersonName: string) => {
    const newPerson: Person = {
      id: `${newPersonName.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      name: newPersonName,
      profile: '',
      mentions: [],
    };

    setOperations(prevOps =>
      prevOps.map(op => {
        if (op.id === operationId) {
          const updatedPeople = [...op.people, newPerson];
          const updatedOp = { ...op, people: updatedPeople };
          if (selectedOperation?.id === operationId) {
            setSelectedOperation(updatedOp);
          }
          return updatedOp;
        }
        return op;
      })
    );
  };

  const handleDeleteOperation = (operationId: string) => {
    if (window.confirm('Are you sure you want to delete this entire operation file? This action is permanent and cannot be undone.')) {
      setOperations(prevOps => prevOps.filter(op => op.id !== operationId));
    }
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono p-4 sm:p-8">
      <header className="relative text-center mb-12 animate-fadeIn">
        <h1 className="text-3xl sm:text-5xl font-bold text-purple-400 neon-text">
          C.I.A
        </h1>
        <p className="text-purple-300 mt-2 text-lg sm:text-xl">Candace Investigation Agency</p>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-0 right-0 p-2 text-purple-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-full"
          aria-label={isEditing ? 'Lock editing' : 'Unlock editing'}
        >
          {isEditing ? <UnlockIcon className="w-6 h-6" /> : <LockIcon className="w-6 h-6" />}
        </button>
      </header>
      <main>
        {!selectedOperation ? (
          <OperationsDashboard
            operations={operations}
            onSelectOperation={handleSelectOperation}
            isEditing={isEditing}
            onDeleteOperation={handleDeleteOperation}
          />
        ) : (
          <InvestigationView
            operation={selectedOperation}
            onBack={handleBackToDashboard}
            isEditing={isEditing}
            onUpdatePerson={handleUpdatePerson}
            onRemovePerson={handleRemovePerson}
            onAddPerson={handleAddPerson}
          />
        )}
      </main>
    </div>
  );
};

export default App;
