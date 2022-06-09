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

interface EditorProps {
  noteId: string;
  initialContent: string;
}

export default function Editor({ noteId, initialContent }: EditorProps) {
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
    content: initialContent?.length ? initialContent : "",
    autofocus: false,
    onUpdate: (props) => {},
  });

  return (
    <section className="p-4 bg-slate-50 h-screen overflow-scroll">
      <EditorContent editor={editor} className="h-screen" />
    </section>
  );
}
