import { Request, Response } from 'express';
import * as chainService from '../services/chainService';

/**
 * Get all chains
 */
export const getAllChains = async (req: Request, res: Response): Promise<void> => {
  try {
    const chains = await chainService.getAllChains();
    res.json({
      success: true,
      data: chains
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
 */
export const getChainPropositions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const propositions = await chainService.getChainPropositions(id);
    
    res.json({
      success: true,
      data: propositions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch propositions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

