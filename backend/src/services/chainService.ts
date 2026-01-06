import { Chain, Proposition, ChainFilters, PropositionFilters } from '../models/types';
import { getChains, getPropositions } from '../utils/dataLoader';

/**
 * Get all chains with optional filtering
 */
export const getAllChains = async (filters?: ChainFilters): Promise<Chain[]> => {
  let chains = getChains();
  
  // Apply filters
  if (filters) {
    if (filters.minScore !== undefined) {
      chains = chains.filter(chain => chain.score >= filters.minScore!);
    }
    
    if (filters.maxScore !== undefined) {
      chains = chains.filter(chain => chain.score <= filters.maxScore!);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      chains = chains.filter(chain => 
        chain.name.toLowerCase().includes(searchLower) ||
        chain.id.toLowerCase().includes(searchLower)
      );
    }
  }
  
  return chains;
};

/**
 * Get chain by ID
 */
export const getChainById = async (id: string): Promise<Chain | null> => {
  const chains = getChains();
  const chain = chains.find(c => c.id === id);
  return chain || null;
};

/**
 * Get propositions for a specific chain with optional filtering
 */
export const getChainPropositions = async (
  chainId: string,
  filters?: PropositionFilters
): Promise<Proposition[]> => {
  const allPropositions = getPropositions();
  let propositions = allPropositions[chainId] || [];
  
  // Apply filters
  if (filters) {
    if (filters.type) {
      propositions = propositions.filter(p => 
        p.type === filters.type || p.originalType === filters.type
      );
    }
    
    if (filters.result) {
      propositions = propositions.filter(p => p.result === filters.result);
    }
    
    if (filters.participationLevel) {
      propositions = propositions.filter(p => 
        p.participationLevel === filters.participationLevel
      );
    }
    
    if (filters.voteComposition) {
      propositions = propositions.filter(p => 
        p.voteComposition === filters.voteComposition
      );
    }
    
    if (filters.processingSpeed) {
      propositions = propositions.filter(p => 
        p.processingSpeed === filters.processingSpeed
      );
    }
  }
  
  return propositions;
};

/**
 * Get statistics for all chains
 */
export const getChainStatistics = async () => {
  const chains = getChains();
  const propositions = getPropositions();
  
  const totalChains = chains.length;
  const totalProposals = Object.values(propositions).reduce(
    (sum, props) => sum + props.length, 
    0
  );
  
  const avgScore = chains.reduce((sum, chain) => sum + chain.score, 0) / totalChains;
  
  const scoreDistribution = {
    high: chains.filter(c => c.score >= 80).length,
    medium: chains.filter(c => c.score >= 60 && c.score < 80).length,
    low: chains.filter(c => c.score < 60).length
  };
  
  return {
    totalChains,
    totalProposals,
    avgScore: Math.round(avgScore * 100) / 100,
    scoreDistribution
  };
};
