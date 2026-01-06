import chainsData from '../../../frontend/src/data/mockData';
import { sankeyMockPropositions } from '../../../frontend/src/data/sankeyMockData';

/**
 * Get all chains
 */
export const getAllChains = async () => {
  // TODO: Replace with actual database query
  return chainsData;
};

/**
 * Get chain by ID
 */
export const getChainById = async (id: string) => {
  // TODO: Replace with actual database query
  const chain = chainsData.find(chain => chain.id === id);
  return chain || null;
};

/**
 * Get propositions for a specific chain
 */
export const getChainPropositions = async (chainId: string) => {
  // TODO: Replace with actual database query
  const propositions = sankeyMockPropositions[chainId] || [];
  return propositions;
};

