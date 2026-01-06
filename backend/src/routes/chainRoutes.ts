import { Router } from 'express';
import { 
  getAllChains, 
  getChainById, 
  getChainPropositions,
  getChainStatistics 
} from '../controllers/chainController';

const router = Router();

/**
 * @route   GET /api/chains
 * @desc    Get all chains
 * @query   minScore, maxScore, search
 * @access  Public
 */
router.get('/', getAllChains);

/**
 * @route   GET /api/chains/statistics
 * @desc    Get chain statistics
 * @access  Public
 */
router.get('/statistics', getChainStatistics);

/**
 * @route   GET /api/chains/:id
 * @desc    Get chain by ID
 * @access  Public
 */
router.get('/:id', getChainById);

/**
 * @route   GET /api/chains/:id/propositions
 * @desc    Get propositions for a specific chain
 * @query   type, result, participationLevel, voteComposition, processingSpeed
 * @access  Public
 */
router.get('/:id/propositions', getChainPropositions);

export default router;
