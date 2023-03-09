import axios from 'axios';
import { API_BASE_URL } from './base';


export const getAbonnements = () => {
  return axios.get(`${API_BASE_URL}abonnement/findAll`);
};

export const create = (abonnement) => {
  return axios.post(`${API_BASE_URL}abonnement/add`, abonnement);
};

export const updateById = (id, abonnement) => {
  return axios.put(`${API_BASE_URL}abonnement/update/${id}`, abonnement);
};

export const deleteById = (id) => {
  return axios.delete(`${API_BASE_URL}abonnement/delete/${id}`);
};
