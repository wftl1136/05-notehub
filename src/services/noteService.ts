// === src/services/noteService.ts ===

import axios from 'axios';
import type {
  Note,
  FetchNotesResponse,
  FetchNotesParams,
} from '../types/note';

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

// Изменено: noteId - number, добавлен generic для типа возвращаемых данных
export const deleteNote = async (noteId: number): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(`/notes/${noteId}`);
  return response.data;
};