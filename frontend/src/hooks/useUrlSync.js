// src/hooks/useUrlSync.js
import { useEffect, useRef } from 'react';
import useChainStore from '../store/useChainStore';

/**
 * URL 쿼리 파라미터와 체인 선택 상태를 동기화하는 훅
 * 
 * URL 형식: /?main=cosmos&sub1=osmosis&sub2=juno
 */
const useUrlSync = () => {
  const {
    allChains,
    selectedMainId,
    selectedSubId1,
    selectedSubId2,
    applySelection,
  } = useChainStore();

  const isInitialMount = useRef(true);
  const isRestoringFromUrl = useRef(false);

  /**
   * 체인 name으로 id 찾기
   */
  const findChainIdByName = (chainName) => {
    if (!chainName || !allChains.length) return null;
    const chain = allChains.find(
      (c) => c.name.toLowerCase() === chainName.toLowerCase()
    );
    return chain?.id || null;
  };

  /**
   * 체인 id로 name 찾기
   */
  const findChainNameById = (chainId) => {
    if (!chainId || !allChains.length) return null;
    const chain = allChains.find((c) => c.id === chainId);
    return chain?.name || null;
  };

  /**
   * URL에서 초기 상태 복원 (마운트 시 1회)
   */
  useEffect(() => {
    if (!isInitialMount.current || !allChains.length) return;

    const params = new URLSearchParams(window.location.search);
    const mainName = params.get('main');
    const sub1Name = params.get('sub1');
    const sub2Name = params.get('sub2');

    // URL에 파라미터가 없으면 복원하지 않음
    if (!mainName && !sub1Name && !sub2Name) {
      isInitialMount.current = false;
      return;
    }

    isRestoringFromUrl.current = true;

    // URL 파라미터를 체인 ID로 변환하여 상태 복원
    const mainId = findChainIdByName(mainName);
    const sub1Id = findChainIdByName(sub1Name);
    const sub2Id = findChainIdByName(sub2Name);

    if (mainId) applySelection(mainId, 'main');
    if (sub1Id) applySelection(sub1Id, 'sub1');
    if (sub2Id) applySelection(sub2Id, 'sub2');

    isInitialMount.current = false;
    isRestoringFromUrl.current = false;
  }, [allChains, applySelection]);

  /**
   * 선택 상태가 변경되면 URL 업데이트
   */
  useEffect(() => {
    // 초기 마운트 시에는 URL 업데이트 안 함
    if (isInitialMount.current) return;
    
    // URL에서 복원 중일 때는 URL 업데이트 안 함 (무한 루프 방지)
    if (isRestoringFromUrl.current) return;

    const params = new URLSearchParams();

    const mainName = findChainNameById(selectedMainId);
    const sub1Name = findChainNameById(selectedSubId1);
    const sub2Name = findChainNameById(selectedSubId2);

    if (mainName) params.set('main', mainName);
    if (sub1Name) params.set('sub1', sub1Name);
    if (sub2Name) params.set('sub2', sub2Name);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    // history.replaceState로 페이지 새로고침 없이 URL 변경
    window.history.replaceState({}, '', newUrl);
  }, [selectedMainId, selectedSubId1, selectedSubId2, allChains]);

  /**
   * 브라우저 뒤로가기/앞으로가기 처리
   */
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const mainName = params.get('main');
      const sub1Name = params.get('sub1');
      const sub2Name = params.get('sub2');

      isRestoringFromUrl.current = true;

      const mainId = findChainIdByName(mainName);
      const sub1Id = findChainIdByName(sub1Name);
      const sub2Id = findChainIdByName(sub2Name);

      // 현재 상태와 URL이 다르면 복원
      if (mainId) {
        applySelection(mainId, 'main');
      }
      if (sub1Id) {
        applySelection(sub1Id, 'sub1');
      }
      if (sub2Id) {
        applySelection(sub2Id, 'sub2');
      }

      isRestoringFromUrl.current = false;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [allChains, applySelection]);
};

export default useUrlSync;
