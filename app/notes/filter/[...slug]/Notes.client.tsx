"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";
import type { Note } from "@/types/note";
import Link from "next/link";

type Props = {
  initialNotes: FetchNotesResponse;
  initialTag?: Note["tag"];
};

export default function NotesClient({ initialNotes, initialTag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [initialTag, debouncedSearch]);

  const { data = initialNotes } = useQuery({
    queryKey: ["notes", page, debouncedSearch, initialTag ?? "All"],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: initialTag,
      }),
    placeholderData: keepPreviousData,
    initialData:
      page === 1 && debouncedSearch === "" ? initialNotes : undefined,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={search} updateQuery={setSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <NoteList notes={data.data} />
    </div>
  );
}
