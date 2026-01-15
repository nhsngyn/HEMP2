import { Request, Response } from 'express';
import * as chainService from '../services/chainService';
import { ChainFilters, PropositionFilters } from '../models/types';
import { HttpException } from '../middleware/errorHandler';

/**
 * Get all chains
 * Query params: minScore, maxScore, search
 */
export const getAllChains = async (req: Request, res: Response): Promise<void> => {
  try {
    // 📌 Validate query parameters
    const minScore = req.query.minScore ? Number(req.query.minScore) : undefined;
    const maxScore = req.query.maxScore ? Number(req.query.maxScore) : undefined;
    
    // Check for invalid numbers
    if (minScore !== undefined && (isNaN(minScore) || minScore < 0 || minScore > 100)) {
      throw new HttpException(400, 'minScore must be a number between 0 and 100');
    }
    
    if (maxScore !== undefined && (isNaN(maxScore) || maxScore < 0 || maxScore > 100)) {
      throw new HttpException(400, 'maxScore must be a number between 0 and 100');
    }
    
    if (minScore !== undefined && maxScore !== undefined && minScore > maxScore) {
      throw new HttpException(400, 'minScore cannot be greater than maxScore');
    }
    
    const filters: ChainFilters = {
      minScore,
      maxScore,
      search: req.query.search as string | undefined
    };
    
    const chains = await chainService.getAllChains(filters);
    
    res.json({
      success: true,
      data: chains,
      count: chains.length
    });
  } catch (error) {
    // If it's already an HttpException, rethrow it
    if (error instanceof HttpException) {
      throw error;
    }
    
    // Otherwise, it's a server error
    throw new HttpException(500, 'Failed to fetch chains');
  }
};

/**
 * Get chain by ID
 */
export const getChainById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!id || id.trim() === '') {
      throw new HttpException(400, 'Chain ID is required');
    }
    
    const chain = await chainService.getChainById(id);
    
    if (!chain) {
      throw new HttpException(404, `Chain with ID '${id}' not found`);
    }
    
    res.json({
      success: true,
      data: chain
    });
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(500, 'Failed to fetch chain');
  }
};

/**
 * Get propositions for a specific chain
 * Query params: type, result, participationLevel, voteComposition, processingSpeed
 */
export const getChainPropositions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID
    if (!id || id.trim() === '') {
      throw new HttpException(400, 'Chain ID is required');
    }
    
    // Verify chain exists
    const chain = await chainService.getChainById(id);
    if (!chain) {
      throw new HttpException(404, `Chain with ID '${id}' not found`);
    }
    
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
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(500, 'Failed to fetch propositions');
  }
};

/**
 * Get chain statistics
 */
export const getChainStatistics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stats = await chainService.getChainStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(500, 'Failed to fetch statistics');
  }
};
