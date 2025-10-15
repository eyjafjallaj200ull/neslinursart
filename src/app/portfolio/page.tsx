import { getArtworks } from "@/dal/artworks"
import Gallery from "@/components/Gallery";

export default async function PortfolioPage() {
  const artworks = await getArtworks({orderBy: false})
  return (
    <div suppressHydrationWarning className="">
        <Gallery artworks={artworks} />
    </div>
  )
}
