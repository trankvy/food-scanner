import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="px-5 pt-2 space-y-5 pb-32 animate-fade-in font-display">
      
      {/* Page Title */}
      <div>
        <h2 className="text-[26px] font-bold text-gray-900 leading-tight">102 Biomarkers</h2>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {/* Summary Tab (Active) */}
        <button className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-100/80 rounded-full transition-transform active:scale-95 border border-transparent">
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          </div>
          <span className="font-semibold text-[13px] text-gray-900 tracking-wide">Summary</span>
        </button>

        {/* Liver Health Tab */}
        <button className="flex items-center gap-2 px-1 py-1 pr-3 rounded-full transition-transform active:scale-95 group">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
             <span className="text-emerald-700 font-bold text-[10px]">A</span>
          </div>
          <span className="font-medium text-[13px] text-emerald-700/80 group-hover:text-emerald-800">Liver Health</span>
        </button>

        {/* Kidney Tab */}
        <button className="flex items-center gap-2 px-1 py-1 pr-3 rounded-full transition-transform active:scale-95 group">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
             <span className="text-emerald-700 font-bold text-[10px]">A</span>
          </div>
          <span className="font-medium text-[13px] text-emerald-700/80 group-hover:text-emerald-800">Kidney</span>
        </button>
      </div>

      {/* Biomarkers Card */}
      <div className="bg-white rounded-[1.2rem] p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] border border-gray-50/50">
        <h3 className="text-[15px] font-bold text-gray-900 mb-4">102 Biomarkers</h3>
        
        <div className="space-y-2.5 mb-6">
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-[19px] text-gray-900 leading-none">76</span>
            <span className="text-gray-400 font-medium text-[15px] leading-none">Optimal markers</span>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-[19px] text-gray-900 leading-none">22</span>
            <span className="text-gray-400 font-medium text-[15px] leading-none">In range markers</span>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-[19px] text-gray-900 leading-none">4</span>
            <span className="text-gray-400 font-medium text-[15px] leading-none">Out of range markers</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex h-[5px] w-full rounded-full overflow-hidden gap-1">
          <div className="w-[70%] bg-emerald-400 rounded-full"></div>
          <div className="w-[20%] bg-yellow-300 rounded-full"></div>
          <div className="w-[10%] bg-pink-400 rounded-full"></div>
        </div>
      </div>

      {/* Biological Age Card */}
      <div className="relative overflow-hidden rounded-[1.2rem] p-5 h-40 flex flex-col justify-between shadow-md group cursor-pointer transition-transform active:scale-[0.98]">
        {/* Exact Green Background */}
        <div className="absolute inset-0 bg-[#1b4d3e] z-0"></div>
        
        <div className="relative z-10 text-white">
          <h3 className="text-[15px] font-medium opacity-90 text-gray-100">Biological age</h3>
          <div className="text-[42px] font-bold mt-0.5 tracking-tight leading-tight">25</div>
        </div>
        <div className="relative z-10 text-emerald-50/80 text-[13px] font-medium">
          2.5 years younger than your actual age
        </div>
      </div>

      {/* Superpower Score Card */}
      <div className="relative overflow-hidden rounded-[1.2rem] p-5 h-40 flex flex-col justify-between shadow-md group cursor-pointer transition-transform active:scale-[0.98]">
        {/* Red/Orange Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7f1d1d] via-[#9a3412] to-[#d97706] z-0"></div>
        {/* Subtle blur effect for depth */}
        <div className="absolute bottom-[-40%] left-[-10%] w-48 h-48 bg-orange-500/20 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 text-white">
          <h3 className="text-[15px] font-medium opacity-90 text-gray-100">superpower score</h3>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-[42px] font-bold tracking-tight leading-tight">93</span>
            <span className="text-[11px] font-medium opacity-70 relative -top-1">out of 100</span>
          </div>
        </div>
        <div className="relative z-10 text-orange-50/90 text-[13px] font-medium">
          You're very healthy. Keep going!
        </div>
      </div>
    </div>
  );
};
