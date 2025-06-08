import axios from 'axios';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  
}

export type CreateNoteDto = {
  title: string;
  content: string;
  tag: Note['tag'];
};

export const fetchNotes = async (search: string, page: number): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = {
    page,
    search: search || undefined
  };
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('', { params });
  return response.data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(`/${id}`);
  return response.data;
}; 