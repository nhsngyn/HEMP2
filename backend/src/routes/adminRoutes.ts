import { Router } from 'express';
import { refreshData, getSystemStatus } from '../controllers/adminController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

/**
 * @route   POST /api/admin/refresh-data
 * @desc    Refresh cached chain and proposition data
 * @access  Protected (requires X-Admin-API-Key header)
 */
router.post('/refresh-data', asyncHandler(refreshData));

/**
 * @route   GET /api/admin/status
 * @desc    Get system status and cache information
 * @access  Protected (requires X-Admin-API-Key header)
 */
router.get('/status', asyncHandler(getSystemStatus));

export default router;
