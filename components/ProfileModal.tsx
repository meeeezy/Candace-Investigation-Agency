import React, { useState, useEffect } from 'react';
import type { Person } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ProfileModalProps {
  person: Person;
  onClose: () => void;
  isEditing: boolean;
  onUpdate: (updatedPerson: Partial<Person>) => void;
  onDelete: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ person, onClose, isEditing, onUpdate, onDelete }) => {
  const [editablePerson, setEditablePerson] = useState<Person>(person);

  useEffect(() => {
    setEditablePerson(person);
  }, [person]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditablePerson({ ...editablePerson, profile: e.target.value });
  };
  
  const handleMentionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditablePerson({ ...editablePerson, mentions: e.target.value.split('\n') });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setEditablePerson({ ...editablePerson, imageUrl: event.target.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSave = () => {
    onUpdate(editablePerson);
    onClose();
  };

  const handleDelete = () => {
    if(window.confirm(`Are you sure you want to delete ${person.name}? This action cannot be undone.`)) {
        onDelete();
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn p-4" 
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 sm:p-8 max-w-2xl w-full relative neon-box max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-400 hover:text-white transition-colors z-10"
          aria-label="Close profile"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 sm:w-1/3">
                 <div className="w-full aspect-square bg-gray-800 border-2 border-purple-700 rounded-md flex items-center justify-center overflow-hidden">
                    {editablePerson.imageUrl ? (
                        <img src={editablePerson.imageUrl} alt={editablePerson.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-purple-400 text-sm">No Image</span>
                    )}
                 </div>
                 {isEditing && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-purple-300 mb-2" htmlFor="image-upload">
                            Upload Image
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-900/50 file:text-purple-200 hover:file:bg-purple-800/50"
                        />
                    </div>
                 )}
            </div>

            <div className="flex-grow sm:w-2/3">
                <h3 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-4">{person.name}</h3>
                {isEditing ? (
                    <textarea
                        value={editablePerson.profile}
                        onChange={handleProfileChange}
                        className="w-full h-24 p-2 bg-gray-800 border-2 border-purple-700 rounded-md text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                ) : (
                    <p className="text-purple-200 mb-6">{person.profile}</p>
                )}

                <div className="border-t border-purple-700 pt-4 mt-4">
                    <h4 className="text-xl text-purple-400 mb-3">Key Mentions:</h4>
                    {isEditing ? (
                         <textarea
                            value={editablePerson.mentions.join('\n')}
                            onChange={handleMentionsChange}
                            className="w-full h-32 p-2 bg-gray-800 border-2 border-purple-700 rounded-md text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            placeholder="Enter one mention per line"
                        />
                    ) : (
                        <ul className="list-disc list-inside space-y-2 text-purple-300">
                            {person.mentions.map((mention, index) => (
                                <li key={index}>{mention}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-between items-center">
            <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-900/50 border-2 border-red-700 text-red-300 rounded-lg hover:bg-red-800/50 hover:border-red-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                Delete Person
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-purple-900/50 border-2 border-purple-500 text-purple-200 rounded-lg hover:bg-purple-800/50 hover:border-purple-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
