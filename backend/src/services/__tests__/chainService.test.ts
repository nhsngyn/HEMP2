import * as chainService from '../chainService';
import { ChainFilters } from '../../models/types';

// Mock 환경 변수를 production으로 설정하여 2초 딜레이 제거
process.env.NODE_ENV = 'production';

describe('chainService', () => {
  describe('getAllChains', () => {
    it('should return all chains without filters', async () => {
      const chains = await chainService.getAllChains();
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      expect(chains.length).toBeGreaterThan(0);
      
      // 각 체인이 필수 속성을 가지고 있는지 확인
      chains.forEach(chain => {
        expect(chain).toHaveProperty('id');
        expect(chain).toHaveProperty('name');
        expect(chain).toHaveProperty('score');
        expect(typeof chain.score).toBe('number');
      });
    });

    it('should filter chains by minScore', async () => {
      const minScore = 80;
      const filters: ChainFilters = { minScore };
      
      const chains = await chainService.getAllChains(filters);
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      
      // 모든 체인의 점수가 minScore 이상인지 확인
      chains.forEach(chain => {
        expect(chain.score).toBeGreaterThanOrEqual(minScore);
      });
    });

    it('should filter chains by maxScore', async () => {
      const maxScore = 60;
      const filters: ChainFilters = { maxScore };
      
      const chains = await chainService.getAllChains(filters);
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      
      // 모든 체인의 점수가 maxScore 이하인지 확인
      chains.forEach(chain => {
        expect(chain.score).toBeLessThanOrEqual(maxScore);
      });
    });

    it('should filter chains by minScore and maxScore', async () => {
      const minScore = 60;
      const maxScore = 80;
      const filters: ChainFilters = { minScore, maxScore };
      
      const chains = await chainService.getAllChains(filters);
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      
      // 모든 체인의 점수가 범위 내에 있는지 확인
      chains.forEach(chain => {
        expect(chain.score).toBeGreaterThanOrEqual(minScore);
        expect(chain.score).toBeLessThanOrEqual(maxScore);
      });
    });

    it('should filter chains by search query (name)', async () => {
      const search = 'cosmos';
      const filters: ChainFilters = { search };
      
      const chains = await chainService.getAllChains(filters);
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      
      // 검색어가 이름 또는 ID에 포함되어 있는지 확인 (대소문자 무시)
      chains.forEach(chain => {
        const matchesName = chain.name.toLowerCase().includes(search.toLowerCase());
        const matchesId = chain.id.toLowerCase().includes(search.toLowerCase());
        expect(matchesName || matchesId).toBe(true);
      });
    });

    it('should return empty array for non-existent chain name', async () => {
      const search = 'nonexistentchain12345';
      const filters: ChainFilters = { search };
      
      const chains = await chainService.getAllChains(filters);
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      expect(chains.length).toBe(0);
    });

    it('should combine multiple filters correctly', async () => {
      const minScore = 70;
      const search = 'o'; // 'o'가 포함된 체인 검색
      const filters: ChainFilters = { minScore, search };
      
      const chains = await chainService.getAllChains(filters);
      
      expect(chains).toBeDefined();
      expect(Array.isArray(chains)).toBe(true);
      
      // 모든 필터 조건을 만족하는지 확인
      chains.forEach(chain => {
        expect(chain.score).toBeGreaterThanOrEqual(minScore);
        const matchesName = chain.name.toLowerCase().includes(search.toLowerCase());
        const matchesId = chain.id.toLowerCase().includes(search.toLowerCase());
        expect(matchesName || matchesId).toBe(true);
      });
    });
  });

  describe('getChainById', () => {
    it('should return a chain when ID exists', async () => {
      // 먼저 모든 체인을 가져와서 첫 번째 체인의 ID 사용
      const allChains = await chainService.getAllChains();
      expect(allChains.length).toBeGreaterThan(0);
      
      const firstChainId = allChains[0].id;
      const chain = await chainService.getChainById(firstChainId);
      
      expect(chain).toBeDefined();
      expect(chain).not.toBeNull();
      expect(chain?.id).toBe(firstChainId);
    });

    it('should return null for non-existent chain ID', async () => {
      const chain = await chainService.getChainById('nonexistentchain');
      
      expect(chain).toBeNull();
    });
  });

  describe('getChainStatistics', () => {
    it('should return valid statistics', async () => {
      const stats = await chainService.getChainStatistics();
      
      expect(stats).toBeDefined();
      expect(stats).toHaveProperty('totalChains');
      expect(stats).toHaveProperty('totalProposals');
      expect(stats).toHaveProperty('avgScore');
      expect(stats).toHaveProperty('scoreDistribution');
      
      expect(typeof stats.totalChains).toBe('number');
      expect(typeof stats.totalProposals).toBe('number');
      expect(typeof stats.avgScore).toBe('number');
      
      expect(stats.totalChains).toBeGreaterThan(0);
      expect(stats.avgScore).toBeGreaterThanOrEqual(0);
      expect(stats.avgScore).toBeLessThanOrEqual(100);
      
      // Score distribution 검증
      expect(stats.scoreDistribution).toHaveProperty('high');
      expect(stats.scoreDistribution).toHaveProperty('medium');
      expect(stats.scoreDistribution).toHaveProperty('low');
      
      const totalDistribution = 
        stats.scoreDistribution.high + 
        stats.scoreDistribution.medium + 
        stats.scoreDistribution.low;
      
      expect(totalDistribution).toBe(stats.totalChains);
    });
  });

  describe('getChainPropositions', () => {
    it('should return propositions for a valid chain', async () => {
      // 먼저 모든 체인을 가져와서 첫 번째 체인의 ID 사용
      const allChains = await chainService.getAllChains();
      expect(allChains.length).toBeGreaterThan(0);
      
      const firstChainId = allChains[0].id;
      const propositions = await chainService.getChainPropositions(firstChainId);
      
      expect(propositions).toBeDefined();
      expect(Array.isArray(propositions)).toBe(true);
    });

    it('should return empty array for chain with no propositions', async () => {
      const propositions = await chainService.getChainPropositions('nonexistentchain');
      
      expect(propositions).toBeDefined();
      expect(Array.isArray(propositions)).toBe(true);
      expect(propositions.length).toBe(0);
    });

    it('should filter propositions by type', async () => {
      const allChains = await chainService.getAllChains();
      const firstChainId = allChains[0].id;
      
      const allPropositions = await chainService.getChainPropositions(firstChainId);
      
      if (allPropositions.length > 0) {
        const firstType = allPropositions[0].type;
        const filtered = await chainService.getChainPropositions(firstChainId, { type: firstType });
        
        expect(filtered).toBeDefined();
        expect(Array.isArray(filtered)).toBe(true);
        
        filtered.forEach(prop => {
          expect(prop.type === firstType || prop.originalType === firstType).toBe(true);
        });
      }
    });
  });
});
