// FIX: Implemented the full content for the ProfileModal component.
import React from 'react';
import type { Person } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ProfileModalProps {
  person: Person;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ person, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn p-4" 
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 sm:p-8 max-w-2xl w-full relative neon-box-strong animate-slideUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-400 hover:text-white transition-colors"
          aria-label="Close profile"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-4">{person.name}</h3>
        <p className="text-purple-200 mb-6">{person.profile}</p>

        <div className="border-t border-purple-700 pt-4">
          <h4 className="text-xl text-purple-400 mb-3">Key Mentions:</h4>
          <ul className="list-disc list-inside space-y-2 text-purple-300">
            {person.mentions.map((mention, index) => (
              <li key={index}>{mention}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
