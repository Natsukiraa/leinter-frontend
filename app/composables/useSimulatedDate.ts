export const useSimulatedDate = () => {
  return useState<string>('simulated-date', () => (new Date().toISOString().split('T')[0] || ''));
};