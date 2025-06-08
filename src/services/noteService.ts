import axios from 'axios';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
console.log('Token:', token);



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


export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await axiosInstance.post('/notes', noteData);
  return response.data;
};


export const deleteNote = async (noteId: string) => {
  const response = await axiosInstance.delete(`/notes/${noteId}`);
  return response.data;
};
