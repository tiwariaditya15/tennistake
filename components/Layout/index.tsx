import Link from "next/link";

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <section>
      <section className="bg-slate-900 text-white p-4 text-lg">
        <Link href={"/"}>
          <a> TennisTake</a>
        </Link>
      </section>
      {children}
    </section>
  );
}
