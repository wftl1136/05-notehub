export interface Note {
  _id: number;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
  
} 