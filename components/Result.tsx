import React from 'react';
import { FoodItem, SafetyLevel } from '../types';

interface ResultProps {
  item: FoodItem;
  onDone: () => void;
  onBack: () => void;
}

export const Result: React.FC<ResultProps> = ({ item, onDone, onBack }) => {
  // Helper to determine styling based on Safety Level
  const getSafetyStyles = (level: SafetyLevel) => {
    switch (level) {
      case SafetyLevel.WARNING:
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-100 dark:border-red-900/40',
          iconColor: 'text-red-600 dark:text-red-400',
          titleColor: 'text-red-950 dark:text-red-100',
          textColor: 'text-red-800 dark:text-red-200',
          icon: 'dangerous'
        };
      case SafetyLevel.CAUTION:
        return {
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-100 dark:border-amber-900/40',
          iconColor: 'text-amber-600 dark:text-amber-400',
          titleColor: 'text-amber-950 dark:text-amber-100',
          textColor: 'text-amber-800 dark:text-amber-200',
          icon: 'warning'
        };
      case SafetyLevel.SAFE:
      default:
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-100 dark:border-green-900/40',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-950 dark:text-green-100',
          textColor: 'text-green-800 dark:text-green-200',
          icon: 'check_circle'
        };
    }
  };

  const diabetesStyle = getSafetyStyles(item.safety.diabetesRisk.level);
  const weightStyle = getSafetyStyles(item.safety.weightMgmt.level);
  const healthStyle = getSafetyStyles(item.safety.generalHealth.level);

  // Total Calories approximate (using 4-4-9 rule)
  const calories = (item.macros.protein * 4) + (item.macros.carbs * 4) + (item.macros.fat * 9);

  return (
    <div className="relative w-full h-full flex flex-col bg-white dark:bg-[#000000] overflow-y-auto no-scrollbar font-luxury text-gray-900 dark:text-gray-100">
      
      {/* Hero Image Section */}
      <div className="relative h-80 w-full shrink-0">
        <img 
          alt={item.name} 
          className="w-full h-full object-cover" 
          src={item.imageUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/10 pointer-events-none"></div>
        
        {/* Header Nav */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 pt-8">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/30 transition shadow-lg border border-white/10"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <h2 className="text-white font-semibold tracking-wide text-sm opacity-90 drop-shadow-md">Scan Results</h2>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/30 transition shadow-lg border border-white/10">
              <span className="material-symbols-outlined text-lg">ios_share</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/30 transition shadow-lg border border-white/10">
              <span className="material-symbols-outlined text-xl">more_horiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="relative -mt-10 bg-white dark:bg-[#000000] rounded-t-[32px] px-6 pt-8 flex flex-col gap-6 z-0 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] pb-12">
        {/* Pull Indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        
        {/* Title Block */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">AI Analysis Complete</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl font-extrabold leading-tight text-black dark:text-white tracking-tight">
                {item.name}
            </h1>
            <button className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1C1C1E] border border-gray-100 dark:border-gray-800 shadow-sm active:scale-95 transition text-gray-900 dark:text-white">
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
          </div>
        </div>

        {/* Macros */}
        <div className="flex flex-col gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Energy Card */}
          <div className="bg-white dark:bg-[#1C1C1E] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-luxury-sm flex items-center gap-5 w-full">
            <div className="w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100 dark:border-orange-500/20">
              <span className="material-symbols-outlined text-3xl">local_fire_department</span>
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest mb-0.5">Energy</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-black dark:text-white">{calories}</span>
                <span className="text-base font-bold text-gray-400">kcal</span>
              </div>
            </div>
          </div>

          {/* Detailed Macros Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-luxury-sm flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                <span className="material-symbols-outlined text-xl">water_drop</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest">Protein</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black tracking-tight text-black dark:text-white">{item.macros.protein}</span>
                  <span className="text-xs font-bold text-gray-400">g</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-luxury-sm flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 flex items-center justify-center border border-yellow-100 dark:border-yellow-500/20">
                <span className="material-symbols-outlined text-xl">grain</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest">Carbs</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black tracking-tight text-black dark:text-white">{item.macros.carbs}</span>
                  <span className="text-xs font-bold text-gray-400">g</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-luxury-sm flex flex-col items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center border border-purple-100 dark:border-purple-500/20">
                <span className="material-symbols-outlined text-xl">water_drop</span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest">Fats</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-black tracking-tight text-black dark:text-white">{item.macros.fat}</span>
                  <span className="text-xs font-bold text-gray-400">g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Insight Section */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-luxury border border-gray-100 dark:border-gray-800 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="material-symbols-outlined text-xl">health_and_safety</span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-black dark:text-white">Safety Insight</h3>
              <p className="text-xs text-gray-500 font-semibold">AI-verified scan analysis</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className={`group flex flex-col gap-2 p-5 rounded-2xl transition-colors ${diabetesStyle.bg} ${diabetesStyle.border} border`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-xl ${diabetesStyle.iconColor}`}>{diabetesStyle.icon}</span>
                <span className={`text-sm font-black tracking-tight ${diabetesStyle.titleColor}`}>Diabetes Risk</span>
              </div>
              <p className={`text-xs leading-relaxed font-medium pl-8 ${diabetesStyle.textColor}`}>
                 {item.safety.diabetesRisk.text}
              </p>
            </div>

            <div className={`group flex flex-col gap-2 p-5 rounded-2xl transition-colors ${weightStyle.bg} ${weightStyle.border} border`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-xl ${weightStyle.iconColor}`}>{weightStyle.icon}</span>
                <span className={`text-sm font-black tracking-tight ${weightStyle.titleColor}`}>Weight Management</span>
              </div>
              <p className={`text-xs leading-relaxed font-medium pl-8 ${weightStyle.textColor}`}>
                  {item.safety.weightMgmt.text}
              </p>
            </div>

            <div className={`group flex flex-col gap-2 p-5 rounded-2xl transition-colors ${healthStyle.bg} ${healthStyle.border} border`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-xl ${healthStyle.iconColor}`}>{healthStyle.icon}</span>
                <span className={`text-sm font-black tracking-tight ${healthStyle.titleColor}`}>General Health</span>
              </div>
              <p className={`text-xs leading-relaxed font-medium pl-8 ${healthStyle.textColor}`}>
                  {item.safety.generalHealth.text}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Now moved to the bottom of the page content */}
        <div className="flex gap-3 pt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button className="flex-1 h-14 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm active:scale-[0.98]">
              <span className="material-symbols-outlined text-xl">auto_fix</span>
              Fix Results
          </button>
          <button 
              onClick={onDone}
              className="flex-1 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center hover:opacity-90 transition shadow-xl active:scale-[0.98]"
          >
              Done
          </button>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};