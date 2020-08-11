import Link from "next/link";

export default function Home() {
  return (
    <Link href="/bootcamps">
      <div className="btn btn-primary">Bootcamps</div>
    </Link>
  );
}
