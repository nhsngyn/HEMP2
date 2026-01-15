import React, { useMemo } from 'react';
import { sankeyMockPropositions, defaultDummyPropositions } from '../../data/sankeyMockData';
import useChainStore from '../../store/useChainStore';

const ProposalsTable = ({ mainChain }) => {
  const { sankeyFilter } = useChainStore();

  const propositions = useMemo(() => {
    if (!mainChain) return [];

    const mockData = {
      ...sankeyMockPropositions,
      'default': defaultDummyPropositions
    };

    return (mainChain.propositions && Array.isArray(mainChain.propositions) && mainChain.propositions.length > 0)
      ? mainChain.propositions
      : (mockData[mainChain.id] || mockData['default'] || []);
  }, [mainChain]);

  const filteredPropositions = useMemo(() => {
    let result = propositions;

    if (sankeyFilter && propositions.length > 0) {
      const { sourceColumn, targetColumn, sourceName, targetName, type } = sankeyFilter;

      result = propositions.filter((p) => {
        const propType = p.type || 'Other';
        const result = p.result || 'Passed';
        const participationLevel = p.participationLevel || p.participation || 'Mid';
        const voteComposition = p.voteComposition || 'Consensus';
        const processingSpeed = p.processingSpeed || 'Normal';

        if (sourceColumn === 0 && targetColumn === 1) {
          return propType === sourceName && result === targetName;
        }
        if (sourceColumn === 1 && targetColumn === 2) {
          const typeMatch = type ? propType === type : true;
          return result === sourceName && participationLevel === targetName && typeMatch;
        }
        if (sourceColumn === 2 && targetColumn === 3) {
          const typeMatch = type ? propType === type : true;
          return participationLevel === sourceName && voteComposition === targetName && typeMatch;
        }
        if (sourceColumn === 3 && targetColumn === 4) {
          const typeMatch = type ? propType === type : true;
          return voteComposition === sourceName && processingSpeed === targetName && typeMatch;
        }

        return true;
      });
    }

    return result.sort((a, b) => {
      const idA = a.id || 0;
      const idB = b.id || 0;
      return idA - idB;
    });
  }, [sankeyFilter, propositions]);

  const getStatusColor = (statusRaw) => {
    if (!statusRaw) return 'text-[#6D7380]';
    const status = statusRaw.toUpperCase();
    if (status.startsWith('PASSED')) return 'text-[#54CB97]';
    if (status.startsWith('REJECTED')) return 'text-[#F93A4D]';
    if (status.startsWith('FAILED')) return 'text-[#8590A2e6]';
    return 'text-[#6D7380]';
  };

  const formatStatus = (prop) => {
    let statusText = '';

    if (prop.status) {
      statusText = prop.status;
    } else {
      if (prop.result === 'Passed') statusText = 'PASSED';
      else if (prop.result === 'Rejected') statusText = 'REJECTED';
      else statusText = 'FAILED';
    }

    return statusText.replace(/\s*\([^)]*%\)/g, '').trim();
  };

  const formatProcessingTime = (prop) => {

    if (prop.processingTime) return prop.processingTime;
    if (prop.processingSpeed === 'Fast') return '1-2 days';
    if (prop.processingSpeed === 'Normal') return '2-5 days';
    if (prop.processingSpeed === 'Slow') return '4-9 days';
    return '-';
  };

  const formatTypeForDisplay = (type) => {
    if (!type) return 'Other';
    if (type.startsWith('Msg')) {
      let formatted = type.substring(3);
      formatted = formatted.replace(/([A-Z])/g, ' $1').trim();
      return formatted;
    }
    return type;
  };

  return (
    <div
      className="w-full h-full  rounded-lg shadow-lg flex flex-col relative"
      style={{
        padding: '24px'
      }}
    >
      <div
        className="flex items-center  justify-start gap-2 shrink-0 "
        style={{ marginBottom: '16px' }}
      >
        <h2 style={{ color: '#D1D5DB', fontSize: '14px', lineHeight: '140%', letterSpacing: '-0.02em', fontWeight: '700' }}>
          All Proposals
        </h2> <span className="text-gray-500" style={{ fontSize: '18px', lineHeight: '145%', letterSpacing: '-0.01em', fontWeight: '600' }}> {filteredPropositions.length}</span>
      </div>

      <div className="overflow-x-auto scrollbar-hide flex-1 min-h-0 relative">
        <div 
          className="relative"
          style={{ transform: 'rotateX(180deg)' }}
        >
          <div style={{ transform: 'rotateX(180deg)' }}>
            <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 ">
              <th
                className="text-left text-gray-400"
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                ID
              </th>
              <th
                className="text-left text-gray-400"
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                Title
              </th>
              <th
                className="text-left text-gray-400"
                style={{
                  padding: '12px 16px',
                  width: '180px',
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                Type
              </th>
              <th
                className="text-left text-gray-400"
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                Participation
              </th>
              <th
                className="text-left text-gray-400"
                style={{
                  padding: '12px 16px',
                  maxWidth: '140px',
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                Status
              </th>
              <th
                className="text-left text-gray-400"
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  lineHeight: '130%',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                Processing Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPropositions.map((prop, index) => (
              <tr
                key={index}
                className={` border-gray-800 hover:bg-gray-900/50 transition-colors ${index % 2 === 0 ? 'bg-transparent' : ''
                  }`}
                style={{
                  height: '48px',
                  backgroundColor: index % 2 === 1 ? '#191C23' : 'transparent'
                }}
              >
                <td
                  className="text-gray-400"
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: '140%',
                    letterSpacing: '-0.02em',
                    fontWeight: '500'
                  }}
                >
                  #{prop.id || (1000 + index)}
                </td>
                <td
                  className="max-w-md truncate"
                  style={{
                    padding: '12px 16px',
                    color: '#E8EAED',
                    fontSize: '13px',
                    lineHeight: '140%',
                    letterSpacing: '-0.02em',
                    fontWeight: '500'
                  }}
                >
                  {prop.title || 'Proposal Title'}
                </td>
                <td
                  className="text-gray-200 font-bold"
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    fontFamily: 'SUIT',
                    width: '180px',
                    lineHeight: '22px'
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-sm transition-transform cursor-pointer"
                    style={{
                      height: '22px',
                      padding: '3px 8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      verticalAlign: 'middle',
                      boxSizing: 'border-box',
                      backgroundColor: '#29303A',
                      color: '#D1D5DB',
                      transformOrigin: 'center',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                      lineHeight: '130%',
                      letterSpacing: '-0.02em',
                      fontWeight: '700'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                      width: '100%'
                    }}>
                      {formatTypeForDisplay(prop.originalType || prop.type || 'Other')}
                    </span>
                  </span>
                </td>
                <td
                  className="text-gray-300"
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: '130%',
                    letterSpacing: '-0.02em',
                    fontWeight: '600'
                  }}
                >
                  {prop.participation || '0.00%'}
                </td>
                <td
                  className={getStatusColor(formatStatus(prop))}
                  style={{
                    padding: '12px 16px',
                    maxWidth: '140px',
                    fontSize: '13px',
                    lineHeight: '130%',
                    letterSpacing: '-0.02em',
                    fontWeight: '800'
                  }}
                >
                  {formatStatus(prop)}
                </td>
                <td
                  className="text-gray-400"
                  style={{
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: '140%',
                    letterSpacing: '-0.02em',
                    fontWeight: '600'
                  }}
                >
                  {formatProcessingTime(prop)}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
        </div>
      </div>

      <div 
        className="md:hidden absolute pointer-events-none"
        style={{ 
          top: '60px', // 타이틀 높이만큼 아래에서 시작
          right: '24px', // 카드 패딩만큼 안쪽
          bottom: '24px', // 카드 패딩만큼 위쪽
          width: '40px',
          background: 'linear-gradient(to left, rgba(23, 23, 23, 0.98), rgba(23, 23, 23, 0.5), transparent)',
          zIndex: 10
        }}
      />
    </div>
  );
};

export default ProposalsTable;

