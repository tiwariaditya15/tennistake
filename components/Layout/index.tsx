import Link from "next/link";

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <section>
      <section className="bg-slate-50 text-gray-600 p-4 text-lg">
        <Link href={"/"}>
          <a> TennisTake</a>
        </Link>
      </section>
      {children}
    </section>
  );
}
