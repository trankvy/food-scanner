export enum View {
  DASHBOARD = 'DASHBOARD',
  SCAN = 'SCAN',
  MEMORY = 'MEMORY',
  RESULT = 'RESULT'
}

export enum SafetyLevel {
  SAFE = 'Safe',
  CAUTION = 'Caution',
  WARNING = 'Warning'
}

export interface MacroData {
  carbs: number;
  protein: number;
  fat: number;
}

export interface SafetyMetrics {
  diabetesRisk: {
    level: SafetyLevel;
    text: string;
  };
  weightMgmt: {
    level: SafetyLevel;
    text: string;
  };
  generalHealth: {
    level: SafetyLevel;
    text: string;
  };
}

export interface FoodItem {
  id: string;
  name: string;
  timestamp: number;
  imageUrl: string;
  macros: MacroData;
  safety: SafetyMetrics;
  primaryTag: 'SAFE' | 'UNSAFE' | 'ALLERGY' | 'DAIRY' | 'UNKNOWN';
}