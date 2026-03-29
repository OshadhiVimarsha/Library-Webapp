import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/users";

export const getAllUsers = () => axios.get(API_URL);

export const createUser = (userData: any) => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
        if (userData[key] !== null && userData[key] !== undefined) {
            formData.append(key, userData[key]);
        }
    });
    return axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteUser = (nic: string) => axios.delete(`${API_URL}/${nic}`);

// userService.ts
export const updateUser = (nic: string, formData: FormData) => {
    return axios.put(`${API_URL}/${nic}`, formData); 
};