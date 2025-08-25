import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTags } from "@/types/note";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPageFilter({ params }: Props) {
  const { slug } = await params;
  const res = slug?.[0];

  const tag: NoteTags | undefined =
    !res || res.toLowerCase() === "all" ? undefined : (res as NoteTags);
  const queryClient = new QueryClient();
  const initialNotes = await queryClient.fetchQuery({
    queryKey: ["notes", 1, "", tag ?? "all"],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialNotes={initialNotes} initialTag={tag} />
    </HydrationBoundary>
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = slug?.[0];
  const tag = !res || res.toLowerCase() === "all" ? "All" : res;

  return {
    title: `Notes — ${tag}`,
    description: `Notes by category: ${tag}.`,
    openGraph: {
      title: `Notes — ${tag}`,
      description: `Notes by category: ${tag}.`,
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub logo",
        },
      ],
      type: "website",
    },
  };
}
