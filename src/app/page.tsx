import { Carousel } from "@/components/Carousel";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Carousel />
      <Link className="flex justify-end text-xl mr-10 mt-10 sm:hidden" href="/portfolio">See all artworks</Link>
    </main> 
  );
}
