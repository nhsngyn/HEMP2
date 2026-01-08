import axios from 'axios';

/**
 * API Base URL
 * 개발 환경에서는 localhost:3000, 배포 환경에서는 실제 API 서버 주소
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  || (import.meta.env.MODE === 'production' ? 'https://hemp2.onrender.com' : 'http://localhost:3000');

/**
 * Axios 인스턴스 생성
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * - 요청 전에 로깅, 토큰 추가 등 처리
 */
apiClient.interceptors.request.use(
  (config) => {
    // 개발 환경에서 요청 로깅
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 * - 응답 데이터 가공, 에러 처리
 */
apiClient.interceptors.response.use(
  (response) => {
    // 개발 환경에서 응답 로깅
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // 에러 처리
    console.error('[API Response Error]', error.response || error);
    
    // 에러 메시지 추출
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'An error occurred';
    
    // 에러 객체 재구성
    const customError = {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    };
    
    return Promise.reject(customError);
  }
);

export default apiClient;

