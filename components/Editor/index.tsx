import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useNotesStore } from "../../store";
import { useRouter } from "next/router";
import { useSaveMutation } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import { useDeleteMutation } from "../../hooks/useDeleteMutation";

interface EditorProps {
  noteId?: string;
  initialContent?: string;
}

export default function Editor({}: EditorProps) {
  const [saved, setSaved] = useState(false);
  const firstRender = useRef(true);
  const router = useRouter();
  const { noteId } = router["query"];
  const note = useNotesStore((state) =>
    state.notes.find((note) => note.id === noteId)
  );
  const saveMutation = useSaveMutation(setSaved);
  const deleteMutation = useDeleteMutation();
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Start writing...",
        }),
        Highlight,
        Typography,
        Underline,
        Image.configure({
          inline: true,
        }),
        BulletList,
        OrderedList,
        ListItem,
        TextAlign.configure({
          types: ["paragraph", "heading"],
        }),
        TextStyle,

        Link.configure({
          openOnClick: false,
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
        },
      },
      content: note ? note["content"] : "",
      autofocus: false,
      onUpdate: (props) => {},
    },
    [note]
  );
  // debounced save calls
  const editorContent = editor?.getHTML();
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!editor || editor.getHTML() === "") return;
    const timerId = setTimeout(() => {
      saveMutation.mutate({
        id: noteId as string,
        content: editor.getHTML(),
      });
    }, 3000);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorContent, editor, noteId]);
  return (
    <section className="p-4 bg-slate-200 text-slate-700 text-lg h-screen overflow-scroll">
      <section className="w-full flex justify-between">
        <section className="flex items-end">
          <h1 className="text-2xl font-bold">{note?.["title"]}</h1>
          {saved ? (
            <p className="px-2 text-sm mb-1 text-slate-600">saved</p>
          ) : null}
        </section>
        <button
          className="bg-red-600 text-white px-2 rounded-md"
          onClick={() => {
            if (deleteMutation.isLoading) {
              return;
            }
            deleteMutation.mutate(noteId as string);
          }}
        >
          {deleteMutation.isLoading ? "Deleting" : "Delete"}
        </button>
      </section>
      <section className="bg-slate-50 overflow-scroll my-2 rounded-md p-2">
        <EditorContent editor={editor} className="h-screen" />
      </section>
    </section>
  );
}
