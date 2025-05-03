import { instance } from '../api/axios';

export const fetchData = async (fetchUrl) => {
  try {
    const response = await instance.get(fetchUrl);
    return response.data.results;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error; // 에러를 던져 컴포넌트에서 처리하도록 함
  }
};
