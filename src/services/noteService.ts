// === src/services/noteService.ts ===

import axios from 'axios';
import { FetchNotesParams, FetchNotesResponse } from '../types/api';
import { Note } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Изменено: fetchNotes теперь принимает объект с параметрами и имеет явные типы
 export const fetchNotes = async ({
  page = 1,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
  return response.data;
};

// Добавлен generic <Note>, явно указан тип возвращаемого значения
export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${noteId}`);
  return response.data;
};