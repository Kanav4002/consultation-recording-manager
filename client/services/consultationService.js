import api from '../api/axios';

export const getConsultations = async () => {
  const { data } = await api.get('/consultations');
  return data;
};

export const getConsultationById = async (id) => {
  const { data } = await api.get(`/consultations/${id}`);
  return data;
};

export const searchConsultations = async (query) => {
  const { data } = await api.get(`/consultations/search`, { params: { q: query } });
  return data;
};

export const createConsultation = async (formData) => {
  const { data } = await api.post('/consultations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteConsultation = async (id) => {
  const { data } = await api.delete(`/consultations/${id}`);
  return data;
};
