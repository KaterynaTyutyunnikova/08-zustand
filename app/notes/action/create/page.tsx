import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Add a New Note | NoteHub",
  description:
    "Quickly add a new personal note to your NoteHub workspace and keep your ideas organized.",
  openGraph: {
    title: "Add a New Note | NoteHub",
    description:
      "Quickly add a new personal note to your NoteHub workspace and keep your ideas organized.",
    url: "https://08-zustand-zeta-rust.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Add Note",
      },
    ],
    type: "website",
  },
};
const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
