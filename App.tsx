import React, { useState, useRef, useEffect } from 'react';
import { View, FoodItem, SafetyLevel } from './types';
import { Dashboard } from './components/Dashboard';
import { Memory } from './components/Memory';
import { Scanner } from './components/Scanner';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [showScanner, setShowScanner] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when view changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentView]);

  const [history, setHistory] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Peanut Satay',
      timestamp: Date.now() - 10000000,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9V3ndqhWxiZ9JKXNvOnMOQyEMHUJrBJEOYhxVl3JquNr0r4tJA5OP6OrIwCWe1EJk1GXoHCY5ZWtbjAE8U6b2psxyeal_fIPirO_J9TVkVo9O9UvD4lVtrIDvhP8kIUMUGrbU0vpyjtuvyLs8TGY-h-jkJdDAdK_nyA7_nqn4-NMU02ABliV7gQxDQwB4c1hLoWTt35LjBnEUTKdt5GfyVp8QiBCqGWHJ-MBlFscSa3B0lo_H0D5pjyynBaQay9t2j9NEHrK2pg',
      macros: { carbs: 12, protein: 18, fat: 14 },
      safety: { 
        diabetesRisk: { level: SafetyLevel.CAUTION, text: 'Medium GI' },
        weightMgmt: { level: SafetyLevel.WARNING, text: 'Calorie Dense' },
        generalHealth: { level: SafetyLevel.SAFE, text: 'High protein' }
      },
      primaryTag: 'ALLERGY' // Mapped to 'Do Not Eat' / Warning
    },
    {
      id: '2',
      name: 'Avocado Toast',
      timestamp: Date.now(), // Today
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Zvn9ucGk_AIe_ScujTn_Wn4VCgVeVgQTNUkxujm4Y15IJ36F6S2JmlsL_kBD9e7OH5xbL1doue4AZXvy7hr-W8ge9JRVEO-6iPR91twsrwLGO0ZPQZGDhLsmu8i-zo-78v__KykQecsA1z6LEVVYiwwpiw8LBd_59ytxgmvhLOFKmaiQWVGHjUuHmlqTNvaov3IhgshP5qlmH32KcdFj3c0jHULOm3xWf2-7b9U63KEyjQyZSHVah1TEs8tU_u9A5NJcwxj9iA',
      macros: { carbs: 30, protein: 12, fat: 20 },
      safety: { 
        diabetesRisk: { level: SafetyLevel.SAFE, text: 'Complex Carbs' },
        weightMgmt: { level: SafetyLevel.SAFE, text: 'Healthy Fats' },
        generalHealth: { level: SafetyLevel.SAFE, text: 'Nutrient Rich' }
      },
      primaryTag: 'SAFE'
    },
    {
      id: '3',
      name: 'Kale Spinach Blend',
      timestamp: Date.now() - 3600000,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5pvPyjOISYLBS8Lw0WliqMmoRmLtc7S5bqDd_uSV2PM8p9QCvqiZ69yopNcu7YnnCf_ZDBIJJj5Lm0Badt5v-EwiSsp6P1Sdyw_Srl7w0MIPhBg1Ugme-UipvC5Wlbpc1QKmuX1BhSDup8kIegspczY3RV00BMVDSD3g5Cu4NDui19JGsiA46HP31NpimUm2VKUFixhZwOToT9402oRMczDk7jGaHyWV_xqYK0ktyofnqXpjcLSERcow0AeubHVWyCPhlIpV3kg',
      macros: { carbs: 10, protein: 4, fat: 1 },
      safety: {
          diabetesRisk: { level: SafetyLevel.SAFE, text: 'Low GI' },
          weightMgmt: { level: SafetyLevel.SAFE, text: 'Low Calorie' },
          generalHealth: { level: SafetyLevel.SAFE, text: 'Superfood' }
      },
      primaryTag: 'SAFE'
    },
    {
      id: '4',
      name: 'Creamy Carbonara',
      timestamp: Date.now() - 7200000,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo2B3d4AV11UhDEKA2uHMOe-ro_h9CQYrcrfvn-e8UVpWS5624TKA_ro2tqEpOvWmPbH-JGt2txng1SRwmx7pIGPFPMxjBe-G2f4MGoMAIzppotwS8QJtvJdRivOmZHZwyxNKWAdTIKvad_2rkaSVZ64CGnsaPAeBPo06IxoUeJ9J2oVdH5mgc1hy44R5L7BIx_6tzcvPx3hxO4TtIsVC9WFYGN5oZWFZmy1_rZqouq-4uzSODUSuIa7VkffEEtLIpF6fi1TEDCA',
      macros: { carbs: 45, protein: 12, fat: 35 },
      safety: { 
        diabetesRisk: { level: SafetyLevel.WARNING, text: 'High GI (65+)' },
        weightMgmt: { level: SafetyLevel.CAUTION, text: 'Calorie dense' },
        generalHealth: { level: SafetyLevel.SAFE, text: 'Ingredients fresh' }
      },
      primaryTag: 'DAIRY'
    },
    {
      id: '5',
      name: 'Grilled Salmon',
      timestamp: Date.now() - 86400000,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi5PnqX_wOh2aKxMmLbU_qaAfOP41o-VouWm6lU6kC_JfUEljDOc2Ea1mVHNjQ45fTLvjvvPiImpNTcquX6Z3_D4kqVlB9YpGXUrRPmTaqLp03Q0G5G7p64KkaYTcUchxh6g1SL12UGSvECH54Gmf465sL_pKMKiZ8K8TZdU4dnKn9Ig10lNkNfxmyehiUMu_tEK1Qms91rvc9AePxz1P4r-bm33ec0DBf8HjXE0kYHD0QcfAWv9mCgYI_CzEs0KPaMOPKE0VAuQ',
      macros: { carbs: 0, protein: 25, fat: 15 },
      safety: {
        diabetesRisk: { level: SafetyLevel.SAFE, text: 'Zero Carbs' },
        weightMgmt: { level: SafetyLevel.SAFE, text: 'High Protein' },
        generalHealth: { level: SafetyLevel.SAFE, text: 'Omega-3 Rich' }
      },
      primaryTag: 'SAFE'
    },
    {
      id: '6',
      name: 'Garden Salad',
      timestamp: Date.now() - 172800000, // Yesterday
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNRWCGODnA3u4ZH1lQlN2OmpaobVRqH1xRCH0QtXw7xgsUuwxvGsZbDOC0BPflwtZobfUDrzmsw8YLp7tbJiDUH8HdS7oyVxTw24R_rdfHVinBw5pG2iz_PYnqCvlUsh_k_ZGxsn5dCIezKe88haVAXJZDHln_9idyNyes6UHUzFQbl1KsE-EWc3aKN35JR0pCQOTgKUhDZWIVOPDCJAavsm958jN2Z8FSK42XpMfZw0a5dHJBmV-wO9TYECzaPxHqKgEdrceefA',
      macros: { carbs: 8, protein: 2, fat: 5 },
      safety: {
        diabetesRisk: { level: SafetyLevel.SAFE, text: 'Fiber Rich' },
        weightMgmt: { level: SafetyLevel.SAFE, text: 'Low Calorie' },
        generalHealth: { level: SafetyLevel.SAFE, text: 'Vitamins' }
      },
      primaryTag: 'SAFE'
    }
  ]);

  const handleSaveScan = (newItem: FoodItem) => {
    setHistory(prev => [newItem, ...prev]);
    setShowScanner(false);
    setCurrentView(View.MEMORY);
  };

  return (
    <div className="h-screen w-full bg-[#dce1e6] dark:bg-[#0a0a0a] flex items-center justify-center p-2 font-display select-none overflow-hidden">
      
      {/* iPhone 17 Pro Mockup */}
      <div className="relative h-[95vh] aspect-[9/19.5] bg-[#222] rounded-[55px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)_inset,0_0_0_6px_#323232,0_0_0_7px_#111] ring-1 ring-white/20 overflow-hidden transition-all duration-300">
         
         {/* Hardware Buttons */}
         <div className="absolute top-28 -left-[8px] w-[3px] h-7 bg-[#2a2a2a] rounded-l-md border border-[#111] border-r-0"></div> {/* Action Btn */}
         <div className="absolute top-40 -left-[8px] w-[3px] h-12 bg-[#2a2a2a] rounded-l-md border border-[#111] border-r-0"></div> {/* Vol Up */}
         <div className="absolute top-56 -left-[8px] w-[3px] h-12 bg-[#2a2a2a] rounded-l-md border border-[#111] border-r-0"></div> {/* Vol Down */}
         <div className="absolute top-44 -right-[8px] w-[3px] h-20 bg-[#2a2a2a] rounded-r-md border border-[#111] border-l-0"></div> {/* Power */}

         {/* Screen Container */}
         <div className="relative w-full h-full bg-background-light dark:bg-background-dark rounded-[48px] overflow-hidden flex flex-col mask-image-rounded">
            
            {/* Dynamic Island / Status Bar Area */}
            <div className={`absolute top-0 w-full h-14 z-[120] flex justify-between items-center px-8 pt-3.5 text-[15px] font-semibold transition-colors duration-300 pointer-events-none select-none ${showScanner ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
               <span className="w-12 text-center pl-1 font-sans">9:41</span>
               <div className="flex gap-2 items-center pr-1">
                 {/* Cellular */}
                 <span className="material-symbols-filled text-[18px]">signal_cellular_alt</span>
                 {/* Wifi */}
                 <span className="material-symbols-filled text-[18px]">wifi</span>
                 {/* Battery */}
                 <div className="relative w-[24px] h-[11.5px] border-[1px] border-current rounded-[3px] ml-0.5 opacity-90">
                    <div className="absolute top-0 bottom-0 left-0 m-[1.5px] bg-current rounded-[1px] w-[60%]"></div>
                    <div className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-[1.5px] h-[4px] bg-current rounded-r-[1px]"></div>
                 </div>
               </div>
            </div>
            
            {/* Dynamic Island Cutout */}
            <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-[120] pointer-events-none flex items-center justify-end pr-3">
               <div className="w-2.5 h-2.5 rounded-full bg-[#111111] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
            </div>

            {/* Scrollable App Content */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto no-scrollbar relative bg-background-light dark:bg-background-dark scroll-smooth"
            >
              
              {/* Header */}
              <header className={`px-6 py-4 pt-20 flex items-center bg-transparent ${currentView === View.DASHBOARD ? 'justify-between' : 'justify-center'}`}>
                <h1 className={`text-[28px] font-bold tracking-tight text-text-main dark:text-white leading-none pb-1 ${currentView === View.DASHBOARD ? 'font-brand' : ''}`}>
                  {currentView === View.DASHBOARD ? 'superpower' : 'Food Memory'}
                </h1>
                {currentView === View.DASHBOARD && (
                    <button className="w-8 h-8 rounded-full bg-black shadow-sm flex items-center justify-center border border-transparent transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-white text-[18px]">add</span>
                    </button>
                )}
              </header>

              {/* Main Content */}
              <main className="pb-28">
                {currentView === View.DASHBOARD && <Dashboard />}
                {currentView === View.MEMORY && <Memory items={history} />}
              </main>

            </div>

            {/* Scanner Modal */}
            {showScanner && (
              <Scanner onSave={handleSaveScan} onClose={() => setShowScanner(false)} />
            )}

            {/* Bottom Navigation Bar */}
            <div className="absolute bottom-0 w-full z-40">
              <div className="relative bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-2xl border-t border-gray-200/50 pb-6 pt-3 px-8 flex justify-between items-end shadow-[0_-1px_3px_rgba(0,0,0,0.02)] h-[88px]">
                
                <button 
                  onClick={() => setCurrentView(View.DASHBOARD)}
                  className={`flex flex-col items-center gap-1.5 group w-16 transition-all duration-300 ${currentView === View.DASHBOARD ? 'text-sage-light' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                >
                  <span className={`material-symbols-outlined text-3xl transition-transform duration-300 group-hover:scale-110 ${currentView === View.DASHBOARD ? 'material-symbols-filled' : ''}`}>
                      grid_view
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide">Dashboard</span>
                </button>

                <button 
                  onClick={() => setShowScanner(true)}
                  className="flex flex-col items-center gap-1.5 group w-16 pb-2"
                >
                  <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-center relative group-active:scale-95 transition-all duration-200 ring-4 ring-white/50 -mt-14">
                    <span className="material-symbols-outlined text-3xl text-gray-800 group-hover:text-black transition-colors">qr_code_scanner</span>
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-sage-light rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] ring-2 ring-white"></span>
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide text-gray-400 group-hover:text-gray-600">Scan</span>
                </button>

                <button 
                  onClick={() => setCurrentView(View.MEMORY)}
                  className={`flex flex-col items-center gap-1.5 group w-16 transition-all duration-300 ${currentView === View.MEMORY ? 'text-sage-light' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                >
                  <span className={`material-symbols-outlined text-3xl transition-transform duration-300 group-hover:scale-110 ${currentView === View.MEMORY ? 'material-symbols-filled' : ''}`}>
                      history
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide">Memory</span>
                </button>

              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/80 dark:bg-white/80 rounded-full z-50 pointer-events-none"></div>

         </div>
      </div>
    </div>
  );
};

export default App;