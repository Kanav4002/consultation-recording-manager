import api from '../api/axios';

export const getNotes = async (consultationId) => {
  const { data } = await api.get(`/consultations/${consultationId}/notes`);
  return data;
};

export const createNote = async (consultationId, content) => {
  const { data } = await api.post(`/consultations/${consultationId}/notes`, { content });
  return data;
};

export const updateNote = async (noteId, content) => {
  const { data } = await api.put(`/notes/${noteId}`, { content });
  return data;
};

export const deleteNote = async (noteId) => {
  const { data } = await api.delete(`/notes/${noteId}`);
  return data;
};
