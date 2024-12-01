import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-4">
    <Link href="/form"><button className="border-2 border-gray-500 text-white bg-blue-500 rounded-md p-1">Contact Us</button></Link>
    </div>
  );
}
