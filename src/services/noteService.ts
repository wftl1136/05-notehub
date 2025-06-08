import axios from 'axios';

// Твій токен має бути у файлі .env як VITE_NOTEHUB_TOKEN
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Отримати список нотаток
export const fetchNotes = async (page = 1, search = '') => {
  const response = await axiosInstance.get('/notes', {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
  return response.data;
};

// Створити нову нотатку
export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await axiosInstance.post('/notes', noteData);
  return response.data;
};

// Видалити нотатку
export const deleteNote = async (noteId: string) => {
  const response = await axiosInstance.delete(`/notes/${noteId}`);
  return response.data;
};
