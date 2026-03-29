import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1/lendings';

export const getAllLendings = () => axios.get(API_URL);

export const createLending = (data: any) => axios.post(API_URL, data);

export const returnBook = (id: string) => axios.put(`${API_URL}/${id}/return`);

export const deleteLending = (id: string) => axios.delete(`${API_URL}/${id}`);
