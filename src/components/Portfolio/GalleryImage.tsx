import Image from "next/image"
import { ISizeCalculationResult } from "image-size/types/interface"


type Props = {
    src: string
    alt: string
    className?: string
    title: string
    year: number
    dimensions: ISizeCalculationResult
}

export default function GalleryImage ({src, alt, className, title, year, dimensions}: Props) {
    return (
        <div className=" mb-5">
            <div className={`relative text-center text-transparent hover:text-[#ededed] transition-all cursor-pointer ${className}`}>
                <Image 
                priority={!!(title === "A Neighbourhood")}
                fetchPriority={!!(title === "A Neighbourhood") ? "high" : "auto"}
                className={` `} 
                src={src} 
                alt={alt} 
                width={dimensions.width}
                height={dimensions.height}
                sizes="(min-width: 780px) 33.33vw, 66.74vw"
                />
                <div className="absolute top-0 bottom-0 grid place-content-center w-full h-full hover:backdrop-brightness-50 text-2xl">
                    <p className="" >{title}</p>
                    <p className="">{year}</p>
                </div>
            </div>
            <p className="text-lg" >{title}</p>
            <p className="">{year}</p>
        </div>
    )
}