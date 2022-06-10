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

interface EditorProps {
  noteId?: string;
  initialContent?: string;
}

export default function Editor({}: EditorProps) {
  const router = useRouter();
  const { noteId } = router["query"];
  const note = useNotesStore((state) =>
    state.notes.find((note) => note.id === noteId)
  );
  const editor = useEditor({
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
    content: note ? note["content"] : "",
    autofocus: false,
    onUpdate: (props) => {},
  });
  console.log({ note });
  return (
    <section className="p-4 bg-slate-100 text-slate-700 text-lg h-screen overflow-scroll">
      <EditorContent editor={editor} className="h-screen" />
    </section>
  );
}
