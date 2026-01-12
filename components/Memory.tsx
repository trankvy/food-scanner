import React, { useState } from 'react';
import { FoodItem } from '../types';

interface MemoryProps {
  items: FoodItem[];
}

type FilterType = 'All' | 'Safe' | 'Warning' | 'Allergies';

export const Memory: React.FC<MemoryProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    // 1. Search Filter
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // 2. Category Filter
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Safe') return item.primaryTag === 'SAFE';
    // Warning includes explicitly UNSAFE items and high-risk ALLERGY items
    if (activeFilter === 'Warning') return item.primaryTag === 'UNSAFE' || item.primaryTag === 'ALLERGY' || item.primaryTag === 'UNKNOWN';
    // Allergies includes explicitly ALLERGY items and DAIRY (intolerances)
    if (activeFilter === 'Allergies') return item.primaryTag === 'ALLERGY' || item.primaryTag === 'DAIRY';
    
    return true;
  });

  const getFilterButtonClass = (filter: FilterType) => {
    const base = "flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-transform active:scale-95 text-sm";
    if (activeFilter === filter) {
      return `${base} bg-pale-mint font-semibold text-black shadow-sm`;
    }
    return `${base} bg-surface-light dark:bg-surface-dark font-medium text-text-main dark:text-white ring-1 ring-black/5 dark:ring-white/10 hover:bg-gray-50 dark:hover:bg-gray-800`;
  };

  return (
    <div className="flex-1 px-4 pb-32 pt-2 animate-fade-in font-display">
      
      {/* Search Bar & Filters */}
      <div className="mb-6 sticky top-[70px] z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md py-2 -mx-4 px-4 transition-colors duration-300">
        <div className="relative flex h-12 w-full items-center overflow-hidden rounded-full bg-surface-light dark:bg-surface-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all focus-within:ring-2 focus-within:ring-primary mb-3">
          <div className="flex w-12 items-center justify-center text-text-main dark:text-gray-400">
            <span className="material-symbols-outlined text-2xl">search</span>
          </div>
          <input 
            className="h-full w-full border-none bg-transparent p-0 pr-4 text-base font-medium text-text-main dark:text-white placeholder:text-text-main dark:placeholder:text-gray-500 focus:ring-0 outline-none" 
            placeholder="Search..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto py-1 scrollbar-hide">
          <button onClick={() => setActiveFilter('All')} className={getFilterButtonClass('All')}>
            All
          </button>
          <button onClick={() => setActiveFilter('Safe')} className={getFilterButtonClass('Safe')}>
            Safe
          </button>
          <button onClick={() => setActiveFilter('Warning')} className={getFilterButtonClass('Warning')}>
            Warning
          </button>
          <button onClick={() => setActiveFilter('Allergies')} className={getFilterButtonClass('Allergies')}>
            Allergies
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-gray-400 flex flex-col items-center">
            <span className="material-symbols-outlined text-5xl mb-3 opacity-50">search_off</span>
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm opacity-70">Try adjusting your filters</p>
          </div>
        ) : (
          filteredItems.map((item) => {
             // Logic to determine tag style based on primaryTag
             const isUnsafe = item.primaryTag === 'UNSAFE' || item.primaryTag === 'ALLERGY';
             const isDairy = item.primaryTag === 'DAIRY';
             const isSafe = item.primaryTag === 'SAFE';
             const isUnknown = item.primaryTag === 'UNKNOWN';

             let tagBg = 'bg-pale-mint';
             let tagText = 'text-black';
             let icon = null;
             let label = 'Safe';
             let subtitle = 'Scanned recently';
             let subColor = 'text-gray-200';

             if (isUnsafe) {
                 tagBg = 'bg-danger backdrop-blur-sm';
                 tagText = 'text-white';
                 icon = 'warning';
                 label = 'Do Not Eat';
                 subtitle = 'Contains allergens';
                 subColor = 'text-red-200';
             } else if (isDairy) {
                 tagBg = 'bg-orange-500 backdrop-blur-sm';
                 tagText = 'text-white';
                 icon = 'sentiment_stressed';
                 label = 'Dairy';
                 subtitle = 'Lactose Warning';
                 subColor = 'text-orange-200';
             } else if (isUnknown) {
                 tagBg = 'bg-gray-500 backdrop-blur-sm';
                 tagText = 'text-white';
                 icon = 'help';
                 label = 'Unknown';
                 subtitle = 'Analysis Failed';
                 subColor = 'text-gray-300';
             } else if (isSafe) {
                 tagBg = 'bg-pale-mint shadow-sm';
                 tagText = 'text-black';
                 label = 'Safe';
                 if (item.name.toLowerCase().includes('avocado')) subtitle = 'Scanned Today';
                 else if (item.name.toLowerCase().includes('kale')) subtitle = 'Nutrient Dense';
                 else if (item.name.toLowerCase().includes('salmon')) subtitle = 'High Protein';
                 else if (item.name.toLowerCase().includes('salad')) subtitle = 'Scanned Yesterday';
             }
             
             // Override subtitle for specific demo items if needed, or rely on logic above
             if (item.name === 'Peanut Satay') subtitle = 'Contains Peanuts';

             return (
                <div 
                  key={item.id} 
                  className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 shadow-md transition-transform hover:scale-[1.02] active:scale-95 transform-gpu animate-fade-in"
                  style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Tag */}
                  <div className={`absolute left-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 ${tagBg}`}>
                    {icon && <span className={`material-symbols-outlined ${tagText} text-[16px]`}>{icon}</span>}
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${tagText}`}>
                        {label}
                    </span>
                  </div>

                  {/* Icon Top Right */}
                  <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                     <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>

                  <div className="mt-auto p-4">
                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white">{item.name}</h3>
                    <p className={`mt-1 text-xs font-medium ${subColor}`}>
                       {subtitle}
                    </p>
                  </div>
                </div>
             );
          })
        )}
      </div>
    </div>
  );
};