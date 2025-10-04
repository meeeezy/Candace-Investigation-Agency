import React, { useState } from 'react';
import type { Operation } from './types';
import { operations } from './data/mockData';
import OperationsDashboard from './components/OperationsDashboard';
import InvestigationView from './components/InvestigationView';

const App: React.FC = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

  const handleSelectOperation = (operation: Operation) => {
    setSelectedOperation(operation);
  };

  const handleBackToDashboard = () => {
    setSelectedOperation(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono p-4 sm:p-8">
      <header className="text-center mb-12 animate-fadeIn">
        <h1 className="text-3xl sm:text-5xl font-bold text-purple-400 neon-text">
          C.I.A
        </h1>
        <p className="text-purple-300 mt-2 text-lg sm:text-xl">Candace Investigation Agency</p>
      </header>
      <main>
        {!selectedOperation ? (
          <OperationsDashboard operations={operations} onSelectOperation={handleSelectOperation} />
        ) : (
          <InvestigationView operation={selectedOperation} onBack={handleBackToDashboard} />
        )}
      </main>
    </div>
  );
};

export default App;