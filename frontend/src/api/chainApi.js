import apiClient from './client';

/**
 * Chain API 서비스
 */

/**
 * 모든 체인 데이터 조회
 * @param {Object} filters - 필터 옵션 { minScore, maxScore, search }
 * @returns {Promise} 체인 배열
 */
export const getAllChains = async (filters = {}) => {
  try {
    const params = {};
    if (filters.minScore !== undefined) params.minScore = filters.minScore;
    if (filters.maxScore !== undefined) params.maxScore = filters.maxScore;
    if (filters.search) params.search = filters.search;

    const response = await apiClient.get('/api/chains', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chains:', error);
    throw error;
  }
};

/**
 * 특정 체인 데이터 조회
 * @param {string} chainId - 체인 ID
 * @returns {Promise} 체인 데이터
 */
export const getChainById = async (chainId) => {
  try {
    const response = await apiClient.get(`/api/chains/${chainId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching chain ${chainId}:`, error);
    throw error;
  }
};

/**
 * 체인별 프로포절 데이터 조회
 * @param {string} chainId - 체인 ID
 * @param {Object} filters - 필터 옵션
 * @returns {Promise} 프로포절 배열
 */
export const getChainPropositions = async (chainId, filters = {}) => {
  try {
    const params = {};
    if (filters.type) params.type = filters.type;
    if (filters.result) params.result = filters.result;
    if (filters.participationLevel) params.participationLevel = filters.participationLevel;
    if (filters.voteComposition) params.voteComposition = filters.voteComposition;
    if (filters.processingSpeed) params.processingSpeed = filters.processingSpeed;

    const response = await apiClient.get(`/api/chains/${chainId}/propositions`, { params });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching propositions for chain ${chainId}:`, error);
    throw error;
  }
};

/**
 * 전체 통계 데이터 조회
 * @returns {Promise} 통계 데이터
 */
export const getChainStatistics = async () => {
  try {
    const response = await apiClient.get('/api/chains/statistics');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

/**
 * Health check
 * @returns {Promise} 서버 상태
 */
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

