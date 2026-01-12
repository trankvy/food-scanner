import React from 'react';
import { FoodItem, SafetyLevel, SafetyMetrics } from '../types';

interface ScannerProps {
  onSave: (item: FoodItem) => void;
  onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onSave, onClose }) => {
  // Hardcoded Carbonara Data
  const capturedImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMPrl06_FsBI9HQJrkQsWUY_GC3smNxkSA5Pjln13T3kPMsd3LvDhQGAnKbA2mzgGnWbm-hkG0OHpyM6sdSiXzDKBAZKwS_3rzDFuE6GZ1bhwBAVUEHYgxI4nDphQ46HWuPiJbFPiQE8wFKxm6be2RG0tP02DaG3S2y6_oVQNPkDpTRuUrtgSB7qNSz21c00U71zx-7_CZb_qTaD0swd1CNKXWBfSxH1_Le3SnSyKEkqBqQJYrnFxQ17EpgbdQ3Iv7qwDM0su86w';
  const thumbnailImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe6PtF4slS9Yc19OirdSaaHQgqosbL_ILz8-YSbD8_KyDspL2mASUFsoDDoHqdvMl_YAYSPVE1R44ERTNMGB7gffA2ZdZIKCo4iWU4B3faBm28qnYT_Xm-tueFm5xruC3m2Rwe2YkDIvv4086xo9bvJrQFrPSGbkGLa1JaONjxbuqr6wW6Q9nBtAO6qwqpw0AtMUYoSp5Oad118JcFwfIV9CA2TvDwMZfPvEfza518hhBThBEtVbQVihqyPtQtNRN4MBBd9XflAg';
  
  const result = {
    name: "Pasta Carbonara",
    calories: 850,
    macros: { carbs: 45, protein: 12, fat: 8 },
    safety: {
      diabetesRisk: { level: SafetyLevel.WARNING, text: "High Glycemic Index (GI 65+)" },
      weightMgmt: { level: SafetyLevel.CAUTION, text: "Calorie dense meal (~850 kcal)" },
      generalHealth: { level: SafetyLevel.SAFE, text: "Ingredients verified fresh" }
    },
    primaryTag: 'DAIRY' as const
  };

  const handleSave = () => {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: result.name,
      timestamp: Date.now(),
      imageUrl: capturedImage,
      macros: result.macros,
      safety: result.safety as SafetyMetrics,
      primaryTag: result.primaryTag
    };
    onSave(newItem);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background-dark font-display flex flex-col select-none animate-fade-in">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${capturedImage}')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex justify-between items-start p-6 pt-12">
        <button onClick={onClose} className="bg-white/20 backdrop-blur-md text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Floating ID Card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none -mt-20">
        <div className="absolute top-[25%] right-4 flex flex-col items-end gap-2 animate-slide-in-right">
          
          {/* Identified Food Name */}
          <div className="bg-white/95 backdrop-blur-md pl-3 pr-4 py-2 rounded-full shadow-xl flex items-center gap-3 border border-white/40 transform transition-transform hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined text-lg">restaurant_menu</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-0.5">Identified</p>
              <p className="text-gray-900 font-bold text-sm leading-none whitespace-nowrap">{result.name}</p>
            </div>
          </div>
          
          {/* Macros & Calories */}
          <div className="flex flex-col items-end gap-1.5 mr-2">
            {/* Calories Pill */}
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
              {result.calories} kcal
            </div>

            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
              Carbs: {result.macros.carbs}g
            </div>
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              Protein: {result.macros.protein}g
            </div>
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
              Fat: {result.macros.fat}g
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="relative z-30 w-full px-4 pb-8 flex flex-col gap-5 animate-slide-up">
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-5 shadow-2xl border border-white/40">
          <div className="flex justify-between items-center mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-800">health_metrics</span>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Safety Analysis</h3>
            </div>
          </div>
          
          <div className="grid gap-3">
            {/* Diabetes Risk - Red Warning */}
            <div className="flex items-center gap-3 p-3 bg-red-50/80 rounded-2xl border border-red-100 hover:bg-red-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-red-500 border border-red-100">
                <span className="material-symbols-outlined">bloodtype</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900 text-sm">Diabetes Risk</p>
                  <span className="text-[10px] font-black text-white bg-red-500 px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm shadow-red-200">Warning</span>
                </div>
                <p className="text-xs text-red-700/80 mt-0.5 font-medium truncate">{result.safety.diabetesRisk.text}</p>
              </div>
            </div>

            {/* Weight Mgmt - Yellow Caution */}
            <div className="flex items-center gap-3 p-3 bg-yellow-50/80 rounded-2xl border border-yellow-100 hover:bg-yellow-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-yellow-600 border border-yellow-100">
                <span className="material-symbols-outlined">scale</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900 text-sm">Weight Mgmt</p>
                  <span className="text-[10px] font-black text-white bg-yellow-500 px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm shadow-yellow-200">Caution</span>
                </div>
                <p className="text-xs text-yellow-800/80 mt-0.5 font-medium truncate">{result.safety.weightMgmt.text}</p>
              </div>
            </div>

            {/* General Health - Green Safe */}
            <div className="flex items-center gap-3 p-3 bg-green-50/80 rounded-2xl border border-green-100 hover:bg-green-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-green-400 border border-green-100">
                <span className="material-symbols-outlined font-bold">check</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900 text-sm">General Health</p>
                  <span className="text-[10px] font-black text-white bg-green-400 px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm shadow-green-200">Safe</span>
                </div>
                <p className="text-xs text-green-800/80 mt-0.5 font-medium truncate">{result.safety.generalHealth.text}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around px-2 pt-2">
          
          {/* Left: Thumbnail */}
          <button className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all shadow-lg group overflow-hidden">
             <div className="w-10 h-10 rounded-lg overflow-hidden relative border border-white/20">
                <img 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  src={thumbnailImage}
                  alt="thumbnail"
                />
             </div>
          </button>

          {/* Center: Save / Shutter Button (Green check as per design) */}
          <button onClick={handleSave} className="w-20 h-20 rounded-full border-[5px] border-white/90 bg-transparent p-1.5 flex items-center justify-center relative shadow-2xl active:scale-95 transition-all duration-200">
             <div className="w-full h-full rounded-full bg-green-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_0_20px_rgba(43,238,108,0.6)] border-4 border-white/10"></div>
          </button>

          {/* Right: Flash (Visual) */}
          <button className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all shadow-lg">
             <span className="material-symbols-outlined text-2xl">flash_on</span>
          </button>
        </div>
      </div>
    </div>
  );
};