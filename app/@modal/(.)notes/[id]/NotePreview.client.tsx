"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();
  const handleClickClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClickClose}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {error && <p>Something went wrong.</p>}
        {!isLoading && !error && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {note.updatedAt
                ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
                : `Created at: ${new Date(note.createdAt).toLocaleString()}`}
            </p>

            <button
              className={css.backBtn}
              onClick={handleClickClose}
              aria-label="Close"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
