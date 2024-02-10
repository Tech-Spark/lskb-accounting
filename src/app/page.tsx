import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <h1 className="font-bold text-xl">
        <em className="text-2xl">Welcome </em> to New-lisan-kebab bookkeeping!
        Please login______
      </h1>
      <br></br>
      <Link
        href="/login"
        className="font-bold text-3xl hover:bg-sky-700 px-4 py-1 rounded"
      >
        Login
      </Link>
    </main>
  );
}
