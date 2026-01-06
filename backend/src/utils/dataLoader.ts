import * as fs from 'fs';
import * as path from 'path';
import { Chain, Proposition } from '../models/types';

/**
 * Load chain data from frontend mockData
 */
export const loadChainData = (): Chain[] => {
  try {
    const mockDataPath = path.resolve(__dirname, '../../../frontend/src/data/mockData.js');
    
    // Read the file
    const fileContent = fs.readFileSync(mockDataPath, 'utf-8');
    
    // Extract the array from the export statement
    // Look for "export const mockChains = [...]"
    const match = fileContent.match(/export const mockChains\s*=\s*(\[[\s\S]*?\n\];)/);
    
    if (!match) {
      console.error('Could not find mockChains export in mockData.js');
      return [];
    }
    
    // Use eval in a controlled way (only for development)
    // In production, consider using a proper data format like JSON
    const chainsData = eval(match[1]);
    
    return chainsData as Chain[];
  } catch (error) {
    console.error('Error loading chain data:', error);
    return [];
  }
};

/**
 * Load proposition data from frontend sankeyMockData
 */
export const loadPropositionData = (): Record<string, Proposition[]> => {
  try {
    const sankeyDataPath = path.resolve(__dirname, '../../../frontend/src/data/sankeyMockData.js');
    
    // Read the file
    const fileContent = fs.readFileSync(sankeyDataPath, 'utf-8');
    
    // Extract sankeyMockPropositions
    const match = fileContent.match(/export const sankeyMockPropositions\s*=\s*(\{[\s\S]*?\n\};)/);
    
    if (!match) {
      throw new Error('Could not parse sankeyMockData.js');
    }
    
    // Use eval in a controlled way
    const propositionsData = eval(`(${match[1]})`);
    
    return propositionsData as Record<string, Proposition[]>;
  } catch (error) {
    console.error('Error loading proposition data:', error);
    return {};
  }
};

/**
 * Cache for loaded data
 */
let chainsCache: Chain[] | null = null;
let propositionsCache: Record<string, Proposition[]> | null = null;

/**
 * Get chains with caching
 */
export const getChains = (): Chain[] => {
  if (!chainsCache) {
    chainsCache = loadChainData();
  }
  return chainsCache;
};

/**
 * Get propositions with caching
 */
export const getPropositions = (): Record<string, Proposition[]> => {
  if (!propositionsCache) {
    propositionsCache = loadPropositionData();
  }
  return propositionsCache;
};

/**
 * Clear cache (useful for development)
 */
export const clearCache = (): void => {
  chainsCache = null;
  propositionsCache = null;
};

