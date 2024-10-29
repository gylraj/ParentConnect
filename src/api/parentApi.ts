import axios from 'axios';
import { removeNonNumeric } from '../utils/helper';
import apiClient from './apiClient';

export const fetchParents = async () => {
  try {
    const response = await apiClient('/parent');
    return response.data;
  } catch (error) {
    console.error('Error fetching parents:', error);
    throw error;
  }
};

export const fetchParent = async ({
  phoneNumber,
  pin,
}: {
  phoneNumber: string;
  pin: string;
}) => {
  try {
    const numericPhoneNumber = removeNonNumeric(phoneNumber);

    const parents = await fetchParents();
    return parents.find(
      (parent: { phone_number: string; pin: string; id: string }) =>
        removeNonNumeric(parent.phone_number) === numericPhoneNumber &&
        parent.pin === pin
    );
  } catch (error) {
    console.error('Error fetching parents:', error);
    throw error;
  }
};

export const fetchStudents = async (parentId: string) => {
  try {
    const response = await apiClient.get(`/parent/${parentId}/student`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching students for parent ID ${parentId}:`, error);
    throw error;
  }
};
