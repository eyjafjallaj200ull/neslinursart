import GalleryImage from "./GalleryImage"
import Link from "next/link"
import Lightbox from "./Lightbox"
import { artworkSelectSchemaType } from "@/zod-schemas/artwork"


type Props = {
  artworks: artworkSelectSchemaType[],
  dimensionsArray: {
    id: number;
    dimensions: {
        height: number;
        width: number
    };
  }[]
}

// async function makeDimensionsArray (artworkArray: artworkSelectSchemaType[]) {
//   return Promise.all(artworkArray.map( async (artwork) => {
//     const dimensions = await imageSizeFromFile(`public${artwork.imagePath}`)
//     return {id: artwork.id, dimensions}
//   }))
// }

export default function Gallery({artworks, dimensionsArray}: Props) {
  
  return (
    <>
      <main className="flex justify-center">
        <ul className="columns-1 md:columns-2 md:gap-6 w-2/3 mt-5 ">
          {
            artworks.map(({id, name, year, imagePath}) => {
              const dimensions = dimensionsArray.find(dimObj => dimObj.id === id)?.dimensions ?? {height:0, width: 0}
              return (
                <li className="break-inside-avoid" key={id}>
                  <Link className="" href={`?imageId=${id}`} scroll={false}> 
                    <GalleryImage src={imagePath} dimensions={dimensions} title={name} year={year} alt={name} />
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </main>
      <Lightbox dimensionsArray={dimensionsArray} artworks={artworks} />
    </>
  )
}
