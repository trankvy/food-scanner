import React, { useState } from 'react';
import { View, FoodItem, SafetyLevel } from './types';
import { Dashboard } from './components/Dashboard';
import { Memory } from './components/Memory';
import { Scanner } from './components/Scanner';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [showScanner, setShowScanner] = useState(false);
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
    <div className="max-w-md mx-auto min-h-screen relative bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden font-display transition-colors duration-300">
      
      {/* Header */}
      <header className={`px-5 py-4 pt-7 flex items-center bg-transparent sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md ${currentView === View.DASHBOARD ? 'justify-between' : 'justify-center'}`}>
        <h1 className={`text-[28px] font-bold tracking-tight text-text-main dark:text-white leading-none pb-1 ${currentView === View.DASHBOARD ? 'font-brand' : ''}`}>
          {currentView === View.DASHBOARD ? 'superpower' : 'Food Memory'}
        </h1>
        {currentView === View.DASHBOARD && (
            <button className="w-8 h-8 rounded-full bg-black shadow-sm flex items-center justify-center border border-transparent transition-transform active:scale-95">
                <span className="material-symbols-outlined text-white text-[18px]">add</span>
            </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="min-h-[80vh]">
        {currentView === View.DASHBOARD && <Dashboard />}
        {currentView === View.MEMORY && <Memory items={history} />}
      </main>

      {/* Floating Scanner Modal */}
      {showScanner && (
        <Scanner onSave={handleSaveScan} onClose={() => setShowScanner(false)} />
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 z-40">
        <div className="relative bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-2xl border-t border-gray-200/50 pb-2 pt-3 px-10 flex justify-between items-end shadow-[0_-1px_3px_rgba(0,0,0,0.02)] h-20">
          
          <button 
            onClick={() => setCurrentView(View.DASHBOARD)}
            className={`flex flex-col items-center gap-1.5 group w-16 transition-all duration-300 pb-2 ${currentView === View.DASHBOARD ? 'text-sage-light' : 'text-gray-400'}`}
          >
            <span className={`material-symbols-outlined text-3xl transition-transform group-hover:scale-105 ${currentView === View.DASHBOARD ? 'material-symbols-filled' : ''}`}>
                grid_view
            </span>
            <span className="text-[10px] font-semibold tracking-wide">Dashboard</span>
          </button>

          <button 
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center gap-1 group w-16 relative -top-4"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-center relative group-active:scale-95 transition-all duration-200 ring-4 ring-white/50">
              <span className="material-symbols-outlined text-3xl text-gray-800 group-hover:text-black transition-colors">qr_code_scanner</span>
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-sage-light rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] ring-2 ring-white"></span>
            </div>
            <span className="text-[10px] font-semibold tracking-wide text-gray-600 group-hover:text-gray-800 mt-2">Scan</span>
          </button>

          <button 
            onClick={() => setCurrentView(View.MEMORY)}
            className={`flex flex-col items-center gap-1.5 group w-16 transition-all duration-300 pb-2 ${currentView === View.MEMORY ? 'text-sage-light' : 'text-gray-400'}`}
          >
            <span className={`material-symbols-outlined text-3xl transition-colors ${currentView === View.MEMORY ? 'material-symbols-filled' : ''}`}>
                history
            </span>
            <span className="text-[10px] font-semibold tracking-wide">Memory</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default App;