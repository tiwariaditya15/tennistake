import Link from "next/link";
import { useRouter } from "next/router";
import { Note as TNote } from "../../types";

export default function Note({ note }: { note: TNote }) {
  const router = useRouter();
  const { noteId } = router["query"];
  return (
    <Link href={`/note/${note["id"]}`}>
      <a
        className={`p-3 hover:bg-slate-600 ${
          note["id"] === noteId ? "bg-slate-700" : ""
        }`}
      >
        {note["title"]}
      </a>
    </Link>
  );
}
