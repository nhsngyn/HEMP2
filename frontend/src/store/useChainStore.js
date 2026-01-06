// src/store/useChainStore.js
import { create } from 'zustand';
import { getAllChains } from '../api/chainApi';

// 슬롯 키들을 배열로 관리
const SLOT_KEYS = ['selectedMainId', 'selectedSubId1', 'selectedSubId2'];

const useChainStore = create((set, get) => ({
  // 데이터
  allChains: [],
  
  // 선택 상태
  selectedMainId: null,
  selectedSubId1: null,
  selectedSubId2: null,
  
  // 필터
  sankeyFilter: null,
  
  // 로딩 및 에러 상태
  isLoading: false,
  error: null,
  
  /**
   * API로부터 체인 데이터 로드
   */
  fetchChains: async (filters = {}) => {
    // 이미 로딩 중이면 중복 호출 방지
    if (get().isLoading) return;
    
    set({ isLoading: true, error: null });
    try {
      const chains = await getAllChains(filters);
      set({ 
        allChains: chains, 
        isLoading: false,
        error: null 
      });
      return chains;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.message || 'Failed to fetch chains' 
      });
      console.error('Error fetching chains:', error);
      throw error;
    }
  },
  
  /**
   * 에러 초기화
   */
  clearError: () => set({ error: null }),
  
  /**
   * Sankey 필터 설정
   */
  setSankeyFilter: (filter) => set({ sankeyFilter: filter }),
  
  /**
   * Sankey 필터 초기화
   */
  clearSankeyFilter: () => set({ sankeyFilter: null }),
  
  /**
   * 특정 슬롯 초기화
   */
  clearSlot: (slotType) => set(() => {
    const keyMap = { main: 'selectedMainId', sub1: 'selectedSubId1', sub2: 'selectedSubId2' };
    const key = keyMap[slotType];
    return key ? { [key]: null } : {};
  }),

  /**
   * 체인 ID로 제거
   */
  removeChainById: (chainId) => set((state) => {
    const updates = {};
    SLOT_KEYS.forEach(key => {
      if (state[key] === chainId) updates[key] = null;
    });
    return updates;
  }),

  /**
   * 체인 선택 적용
   */
  applySelection: (chainId, targetSlot = null) => set((state) => {
    // 1. 현재 체인이 이미 어딘가에 있는지 확인
    const currentSlotKey = SLOT_KEYS.find(key => state[key] === chainId);
    const updates = {};

    // 2. targetSlot 문자열을 실제 스토어 키로 변환
    const targetKeyMap = {
      main: 'selectedMainId',
      sub1: 'selectedSubId1',
      sub2: 'selectedSubId2',
    };
    const finalTargetKey = targetSlot ? targetKeyMap[targetSlot] : null;

    if (!finalTargetKey) {
      // 타겟이 없으면 자동으로 빈 슬롯 찾기
      if (currentSlotKey) return {};

      const emptySlotKey = SLOT_KEYS.find(key => !state[key]);
      updates[emptySlotKey || SLOT_KEYS[0]] = chainId;
      return updates;
    }

    // 타겟이 있으면 해당 슬롯에 배치
    if (currentSlotKey && currentSlotKey !== finalTargetKey) {
      updates[currentSlotKey] = null;
    }
    
    updates[finalTargetKey] = chainId;
    return updates;
  }),

  /**
   * 모든 선택 초기화
   */
  resetAll: () => set({ 
    selectedMainId: null, 
    selectedSubId1: null, 
    selectedSubId2: null,
    sankeyFilter: null 
  }),
}));

export default useChainStore;
