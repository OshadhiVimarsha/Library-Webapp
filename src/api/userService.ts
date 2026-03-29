import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/users";

export const getAllUsers = () => axios.get(API_URL);

export const createUser = (formData: FormData) => {
    return axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteUser = (nic: string) => axios.delete(`${API_URL}/${nic}`);

export const updateUser = (nic: string, formData: FormData) => {
    return axios.put(`${API_URL}/${nic}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};