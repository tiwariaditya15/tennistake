import Link from "next/link";
import { useRouter } from "next/router";

type Note = {
  name: string;
  content: string;
  email: string;
  id: string;
};

export default function Note({ note }: { note: Note }) {
  const router = useRouter();
  const { noteId } = router["query"];
  return (
    <Link href={`/note/${note["id"]}`}>
      <a className={"p-3 hover:bg-slate-600"}>{note["name"]}</a>
    </Link>
  );
}
