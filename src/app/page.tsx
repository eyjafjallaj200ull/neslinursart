import { Carousel } from "@/components/Carousel";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Carousel />
      <Link className="float-right mr-5 mt-10 text-lg px-2 pb-1 pt-0.25 rounded-md border-solid border-foreground border-1 sm:hidden" href="/portfolio">See all artworks</Link>
    </main> 
  );
}
