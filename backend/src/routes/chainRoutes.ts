import { Router } from 'express';
import { getAllChains, getChainById, getChainPropositions } from '../controllers/chainController';

const router = Router();

/**
 * @route   GET /api/chains
 * @desc    Get all chains
 * @access  Public
 */
router.get('/', getAllChains);

/**
 * @route   GET /api/chains/:id
 * @desc    Get chain by ID
 * @access  Public
 */
router.get('/:id', getChainById);

/**
 * @route   GET /api/chains/:id/propositions
 * @desc    Get propositions for a specific chain
 * @access  Public
 */
router.get('/:id/propositions', getChainPropositions);

export default router;

