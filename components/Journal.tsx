import React, { useEffect, useRef } from 'react';
import { Memory, ObjectType } from '../types';
import { X, BookOpen, Map as MapIcon } from 'lucide-react';

interface JournalProps {
  memories: Memory[];
  activeMemoryId: string | null;
  isLoading: boolean;
  onClose: () => void;
}

const Journal: React.FC<JournalProps> = ({ memories, activeMemoryId, isLoading, onClose }) => {
  const activeMemory = memories.find(m => m.id === activeMemoryId);
  const contentRef = useRef<HTMLDivElement>(null);

  // Typewriter effect check (simplified for React render)
  
  if (!activeMemory && !isLoading && memories.length === 0) return null;

  return (
    <div className={`absolute top-0 right-0 h-full w-full md:w-1/3 bg-[#f4ece0] border-l-2 border-[#4a4036] shadow-2xl p-8 overflow-y-auto transition-transform duration-500 flex flex-col z-20 ${activeMemoryId || isLoading ? 'translate-x-0' : 'translate-x-full md:translate-x-[95%]'}`}>
      
      {/* Handle to pull out if collapsed (visual cue only, logic handled by parent usually, but here just a close btn) */}
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-[#e0d4c0] rounded-full text-[#4a4036]">
        <X size={24} />
      </button>

      <div className="mt-8 mb-6">
        <h2 className="text-3xl font-display text-[#2c2c2c] border-b border-[#2c2c2c] pb-2 inline-block">
            {isLoading ? "Deciphering..." : (activeMemory?.title || "Chronicles of Zaira")}
        </h2>
      </div>

      <div className="flex-grow font-serif text-lg leading-relaxed text-[#3c3c3c]">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-4 bg-[#dcd3c0] rounded w-3/4"></div>
             <div className="h-4 bg-[#dcd3c0] rounded w-full"></div>
             <div className="h-4 bg-[#dcd3c0] rounded w-5/6"></div>
             <p className="text-sm italic mt-4 text-[#6b6b6b]">Tracing the lines of the city...</p>
          </div>
        ) : activeMemory ? (
          <div className="animate-fadeIn" ref={contentRef}>
            <p className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[#2c2c2c]">
              {activeMemory.content}
            </p>
            <div className="mt-8 pt-4 border-t border-[#dcd3c0] text-sm text-[#6b6b6b] italic flex justify-between">
               <span>Source: {activeMemory.objectType.toLowerCase().replace('_', ' ')}</span>
               <span>{new Date(activeMemory.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-[#6b6b6b] italic mt-20">
             <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
             <p>Select an object in the city to read its memory.</p>
          </div>
        )}
      </div>

      {/* Mini List of discovered memories */}
      {!isLoading && !activeMemoryId && memories.length > 0 && (
         <div className="mt-8">
            <h3 className="font-display text-xl mb-4">Collected Memories</h3>
            <ul className="space-y-3">
              {memories.map(m => (
                <li key={m.id} className="p-3 bg-[#ffffff] bg-opacity-50 border border-[#dcd3c0] shadow-sm text-sm cursor-pointer hover:bg-white transition-colors">
                   <span className="font-bold block">{m.title}</span>
                   <span className="text-xs text-gray-500 truncate block">{m.content.substring(0, 40)}...</span>
                </li>
              ))}
            </ul>
         </div>
      )}
    </div>
  );
};

export default Journal;
