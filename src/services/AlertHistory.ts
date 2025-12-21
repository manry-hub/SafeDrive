// types/history.ts
export type AlertHistory = {
  id: string;
  duration: number; // detik
  condition: 'WARNING_1' | 'WARNING_2' | 'DANGER';
  message: string;
  timestamp: number; // Date.now()
};
