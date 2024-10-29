import apiClient from './apiClient';

export const fetchStudent = async (studentId: string) => {
  try {
    const response = await apiClient.get(`/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student for ID ${studentId}:`, error);
    throw error;
  }
};
