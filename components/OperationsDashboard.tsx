
import React from 'react';
import type { Operation } from '../types';
import { FolderIcon } from './icons/FolderIcon';
import { CloseIcon } from './icons/CloseIcon';

interface OperationsDashboardProps {
  operations: Operation[];
  onSelectOperation: (operation: Operation) => void;
  isEditing: boolean;
  onDeleteOperation: (operationId: string) => void;
}

const OperationsDashboard: React.FC<OperationsDashboardProps> = ({
  operations,
  onSelectOperation,
  isEditing,
  onDeleteOperation,
}) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl text-center mb-6 text-purple-400">SELECT OPERATION FILE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {operations.map((op) => (
          <div key={op.id} className="relative group">
            <button
              onClick={() => onSelectOperation(op)}
              className="w-full h-full p-4 border-2 border-purple-700 hover:border-purple-300 bg-gray-900/50 hover:bg-purple-900/30 rounded-lg text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 neon-box"
            >
              <div className="flex items-center mb-3">
                <FolderIcon className="w-10 h-10 mr-4 text-purple-500 group-hover:text-purple-200 transition-colors" />
                <h3 className="text-xl font-bold text-purple-300 group-hover:text-white transition-colors">{op.title}</h3>
              </div>
              <p className="text-purple-400 group-hover:text-purple-200 text-sm transition-colors">{op.description}</p>
            </button>
            {isEditing && (
              <button
                onClick={() => onDeleteOperation(op.id)}
                className="absolute top-2 right-2 z-10 p-1 bg-red-900/80 border border-red-700 rounded-full text-red-300 hover:bg-red-800/80 hover:border-red-500 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label={`Delete ${op.title}`}
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationsDashboard;
