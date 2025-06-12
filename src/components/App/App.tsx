import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import { fetchNotes } from '../../services/noteService';
import {  FetchNotesResponse } from '../../services/noteService';
import { useDebounce } from 'use-debounce';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }), // передаем объект с параметрами
    keepPreviousData: true,  // оставляем для плавной пагинации
    placeholderData: {
      notes: [],
      totalPages: 0,
      page: 1,
    }, // добавлено для placeholderData
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <Error message={error?.message || ''} />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default AppContent;