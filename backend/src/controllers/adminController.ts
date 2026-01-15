import { Request, Response } from 'express';
import { clearCache, getChains, getPropositions } from '../utils/dataLoader';
import { HttpException } from '../middleware/errorHandler';

/**
 * Admin API Key validation middleware
 * For production, use a secure API key stored in environment variables
 */
const validateAdminKey = (req: Request): void => {
  const apiKey = req.headers['x-admin-api-key'] as string;
  const expectedKey = process.env.ADMIN_API_KEY || 'hemp2-admin-dev-key';
  
  if (!apiKey || apiKey !== expectedKey) {
    throw new HttpException(401, 'Unauthorized: Invalid or missing admin API key');
  }
};

/**
 * @route   POST /api/admin/refresh-data
 * @desc    Refresh cached chain and proposition data
 * @access  Protected (Admin only)
 */
export const refreshData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate admin API key
    validateAdminKey(req);
    
    // Clear existing cache
    clearCache();
    
    // Reload data immediately
    const chains = getChains();
    const propositions = getPropositions();
    
    const totalProposals = Object.values(propositions).reduce(
      (sum, props) => sum + props.length,
      0
    );
    
    res.json({
      success: true,
      message: 'Data refreshed successfully',
      data: {
        chainsLoaded: chains.length,
        propositionsLoaded: totalProposals,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(500, 'Failed to refresh data');
  }
};

/**
 * @route   GET /api/admin/status
 * @desc    Get system status and cache information
 * @access  Protected (Admin only)
 */
export const getSystemStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate admin API key
    validateAdminKey(req);
    
    const chains = getChains();
    const propositions = getPropositions();
    
    const totalProposals = Object.values(propositions).reduce(
      (sum, props) => sum + props.length,
      0
    );
    
    res.json({
      success: true,
      data: {
        status: 'operational',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        cache: {
          chainsCount: chains.length,
          propositionsCount: totalProposals
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(500, 'Failed to get system status');
  }
};
