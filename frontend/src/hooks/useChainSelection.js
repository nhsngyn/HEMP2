// src/hooks/useChainSelection.js
import useChainStore from "../store/useChainStore";
import { COLORS } from "../constants/colors";

const useChainSelection = () => {
  const {
    selectedMainId,
    selectedSubId1,
    selectedSubId2,
    applySelection,
    removeChainById,
  } = useChainStore();

  const getSelectionInfo = (id) => {
    if (id === selectedMainId)
      return { type: "main", color: COLORS.MAIN };

    if (id === selectedSubId1)
      return { type: "sub1", color: COLORS.SUB1 };

    if (id === selectedSubId2)
      return { type: "sub2", color: COLORS.SUB2 };

    return null;
  };

  /**
   * 체인 선택/해제 토글
   * - 이미 선택된 체인을 클릭하면 선택 해제
   * - 선택되지 않은 체인을 클릭하면 빈 슬롯에 자동 배치
   */
  const selectChain = (chainId) => {
    const isSelected = 
      chainId === selectedMainId || 
      chainId === selectedSubId1 || 
      chainId === selectedSubId2;

    if (isSelected) {
      // 이미 선택된 체인이면 선택 해제 (토글)
      return removeChainById(chainId);
    } else {
      // 선택되지 않은 체인이면 빈 슬롯에 자동 배치
      return applySelection(chainId, null);
    }
  };

  return {
    getSelectionInfo,
    selectChain,
    selectedMainId,
    selectedSubId1,
    selectedSubId2,
  };
};

export default useChainSelection;