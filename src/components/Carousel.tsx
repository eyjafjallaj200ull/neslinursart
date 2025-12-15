"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";
import Passage from "../../public/passage.jpg"
import Neighbourhood from "../../public/a_neighbourhood.jpg"
import Forest from "../../public/the_forest_of_the_moss_spirit.jpg"
import City from "../../public/city.jpg"
import Underworld from "../../public/entrance_of_the_underworld.jpg"

export function Carousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    return (
        <div className='relative mt-10 sm:mt-0'>
            <div className='after:absolute after:right-0 after:top-0 after:bg-linear-to-l after:from-zinc-950 after:to-transparent after:w-1/6 md:after:w-1/4 after:h-full before:absolute before:left-0 before:top-0 before:bg-linear-to-r before:from-zinc-950 before:to-transparent before:w-1/6 md:before:w-1/4 before:h-full before:z-10 overflow-hidden' ref={emblaRef}>
                <div className='flex gap-3'>
                    <Image className='max-h-[400px] sm:max-h-[600px] ml-3 object-cover' priority={true} src={Passage} alt="Passage"  sizes="(min-width: 2460px) calc(25.37vw - 159px), (min-width: 640px) 429px, 291px" />
                    <Image className='max-h-[400px] sm:max-h-[600px] object-cover' src={Neighbourhood} alt="A Neighbourhood" sizes="(min-width: 2500px) calc(32.8vw - 118px), (min-width: 2180px) calc(82.67vw - 1360px), (min-width: 640px) 408px, 278px" />
                    <Image className='max-h-[400px] sm:max-h-[600px] object-cover' src={Forest} alt="The Forest of the Moss Spirit" sizes="(min-width: 2860px) 15.71vw, (min-width: 640px) 407px, 275px" />
                    <Image className='max-h-[400px] sm:max-h-[600px] object-cover' src={City} alt="City" sizes="(min-width: 2700px) 17vw, (min-width: 640px) 422px, 285px" />
                    <Image className='max-h-[400px] sm:max-h-[600px] object-cover' src={Underworld} alt="Entrance of the Underworld" sizes="(min-width: 2660px) 17.65vw, (min-width: 640px) 420px, 284px" />
                </div>
            </div>
        </div>
    )
}