import React from 'react';

/**
 * 간단한 로딩 스피너 컴포넌트
 * 각 차트에서 독립적으로 사용 가능
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-gray-400 ${sizeClasses[size]}`}
      ></div>
      {message && (
        <p className="text-gray-400 text-body3-m mt-4">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

