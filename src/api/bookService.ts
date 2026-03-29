import axios from 'axios';

const API_URL = "http://localhost:8081/api/v1/books";

export const getAllBooks = () => axios.get(API_URL);

export const createBook = (formData: FormData) => {
    return axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const updateBook = (id: string, formData: FormData) => {
    return axios.put(`${API_URL}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteBook = (id: string) => axios.delete(`${API_URL}/${id}`);

// Cover Image එක fetch කිරීමට URL එක
export const getBookCoverUrl = (id: string) => `${API_URL}/${id}/cover-image`;