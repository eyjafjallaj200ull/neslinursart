import { getArtworks } from "@/dal/artworks"
import Gallery from "@/components/Gallery";
import { getImageDimensionsByImageId } from "@/dal/imageDimensions";

export default async function PortfolioPage() {
  const artworks = await getArtworks({orderBy: false})
  const dimensionsArray = await Promise.all(artworks.map( async (artwork) => {
      const dimensions = await getImageDimensionsByImageId(artwork.id)
      return {id: artwork.id, dimensions}
      })
  )
  return (
    <div suppressHydrationWarning className="">
        <Gallery dimensionsArray={dimensionsArray} artworks={artworks} />
    </div>
  )
}
