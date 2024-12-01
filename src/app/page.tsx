import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-4">
      <Link href="/form">
        <Button variant="contained">Contact Us</Button>
      </Link>
    </div>
  );
}
