import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClients from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};
const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClients />
    </HydrationBoundary>
  );
};
export default NoteDetails;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `Note ${note.title}`,
    description: note.content.slice(0, 60),
    openGraph: {
      title: `Note ${note.title}`,
      description: note.content.slice(0, 60),
      url: "https://08-zustand-zeta-rust.vercel.app/notes/${id}",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub logo",
        },
      ],
      type: "article",
    },
  };
}
