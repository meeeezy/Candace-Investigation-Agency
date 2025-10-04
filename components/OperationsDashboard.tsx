import React from 'react';
import type { Operation } from '../types';
import { FolderIcon } from './icons/FolderIcon';

interface OperationsDashboardProps {
  operations: Operation[];
  onSelectOperation: (operation: Operation) => void;
}

const OperationsDashboard: React.FC<OperationsDashboardProps> = ({ operations, onSelectOperation }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl text-center mb-6 text-purple-400">SELECT OPERATION FILE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => onSelectOperation(op)}
            className="group p-4 border-2 border-purple-700 hover:border-purple-300 bg-gray-900/50 hover:bg-purple-900/30 rounded-lg text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 neon-box"
          >
            <div className="flex items-center mb-3">
              <FolderIcon className="w-10 h-10 mr-4 text-purple-500 group-hover:text-purple-200 transition-colors" />
              <h3 className="text-xl font-bold text-purple-300 group-hover:text-white transition-colors">{op.title}</h3>
            </div>
            <p className="text-purple-400 group-hover:text-purple-200 text-sm transition-colors">{op.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OperationsDashboard;