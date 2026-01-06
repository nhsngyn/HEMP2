/**
 * Chain data structure
 */
export interface Chain {
  id: string;
  name: string;
  logo: string;
  score: number;
  hempScore?: number;
  avgScore?: number;
  
  // Radar chart scores
  governance?: number;
  participation?: number;
  speed?: number;
  consensus?: number;
  activity?: number;
  
  // Additional metadata
  totalProposals?: number;
  avgParticipation?: number;
  avgProcessingTime?: number;
  
  // Propositions data
  propositions?: Proposition[];
}

/**
 * Proposition/Proposal structure
 */
export interface Proposition {
  id: number | string;
  title: string;
  type: string;
  originalType?: string;
  status?: string;
  result?: 'Passed' | 'Rejected' | 'Failed';
  
  // Participation data
  participation?: string;
  participationLevel?: 'High' | 'Mid' | 'Low';
  
  // Vote composition
  voteComposition?: 'Consensus' | 'Contested' | 'Polarized';
  
  // Processing
  processingSpeed?: 'Fast' | 'Normal' | 'Slow';
  processingTime?: string;
  
  // Additional fields
  votingStart?: string;
  votingEnd?: string;
  totalDeposit?: string;
  
  // For sankey chart filtering
  stableKey?: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

/**
 * Chain filter parameters
 */
export interface ChainFilters {
  minScore?: number;
  maxScore?: number;
  search?: string;
}

/**
 * Proposition filter parameters
 */
export interface PropositionFilters {
  type?: string;
  result?: string;
  participationLevel?: string;
  voteComposition?: string;
  processingSpeed?: string;
}

