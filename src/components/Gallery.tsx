import GalleryImage from "./GalleryImage"
import Link from "next/link"
import Lightbox from "./Lightbox"
import { artworkSelectSchemaType } from "@/zod-schemas/artwork"
import { imageSizeFromFile } from 'image-size/fromFile'
import { getDimensions } from "@/lib/utils"


type Props = {
  artworks: artworkSelectSchemaType[]
}

// async function makeDimensionsArray (artworkArray: artworkSelectSchemaType[]) {
//   return Promise.all(artworkArray.map( async (artwork) => {
//     const dimensions = await imageSizeFromFile(`public${artwork.imagePath}`)
//     return {id: artwork.id, dimensions}
//   }))
// }

export default async function Gallery({artworks}: Props) {
  const dimensionsArray = await Promise.all(artworks.map( async (artwork) => {
    const dimensions = await imageSizeFromFile(`public/images/${artwork.imagePath}`)
    return {id: artwork.id, dimensions}
    })
  )
  
  return (
    <>
      <main className="flex justify-center">
        <ul className="columns-1 md:columns-2 md:gap-6 w-2/3 mt-5 ">
          {
            artworks.map(({id, name, year, imagePath}) => {
              return (
                <li className="break-inside-avoid" key={id}>
                  <Link className="" href={`?imageId=${id}`} scroll={false}> 
                    <GalleryImage src={`/images/${imagePath}`} dimensions={getDimensions(dimensionsArray, id)} title={name} year={year} alt={name} />
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
