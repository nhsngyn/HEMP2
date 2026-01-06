import { Request, Response } from 'express';
import * as chainService from '../services/chainService';
import { ChainFilters, PropositionFilters } from '../models/types';

/**
 * Get all chains
 * Query params: minScore, maxScore, search
 */
export const getAllChains = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: ChainFilters = {
      minScore: req.query.minScore ? Number(req.query.minScore) : undefined,
      maxScore: req.query.maxScore ? Number(req.query.maxScore) : undefined,
      search: req.query.search as string | undefined
    };
    
    const chains = await chainService.getAllChains(filters);
    
    res.json({
      success: true,
      data: chains,
      count: chains.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chains',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get chain by ID
 */
export const getChainById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const chain = await chainService.getChainById(id);
    
    if (!chain) {
      res.status(404).json({
        success: false,
        error: 'Chain not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: chain
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chain',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get propositions for a specific chain
 * Query params: type, result, participationLevel, voteComposition, processingSpeed
 */
export const getChainPropositions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const filters: PropositionFilters = {
      type: req.query.type as string | undefined,
      result: req.query.result as string | undefined,
      participationLevel: req.query.participationLevel as string | undefined,
      voteComposition: req.query.voteComposition as string | undefined,
      processingSpeed: req.query.processingSpeed as string | undefined
    };
    
    const propositions = await chainService.getChainPropositions(id, filters);
    
    res.json({
      success: true,
      data: propositions,
      count: propositions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch propositions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get chain statistics
 */
export const getChainStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await chainService.getChainStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
