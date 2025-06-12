export interface Note {
  id: number;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
  
} 

export interface Note {
 _id: string;
  title: string;
  content: string;
  tag: string;
}



export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
}