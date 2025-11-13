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
        <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex justify-evenly gap-3'>
                <Image className='max-h-[600px] w-auto ml-3' objectFit='cover' src={Passage} alt="Passage"  sizes="(min-width: 480px) 436px, calc(85vw + 45px)" />
                <Image className='max-h-[600px] w-auto' objectFit='cover' src={Neighbourhood} alt="A Neighbourhood" sizes="(min-width: 460px) 417px, calc(83.57vw + 49px)" />
                <Image className='max-h-[600px] w-auto' objectFit='cover' src={Forest} alt="The Forest of the Moss Spirit" sizes="(min-width: 440px) 412px, calc(93.33vw + 20px)" />
                <Image className='max-h-[600px] w-auto' objectFit='cover' src={City} alt="City" sizes="(min-width: 460px) 428px, calc(91.43vw + 26px)" />
                <Image className='max-h-[600px] w-auto' objectFit='cover' src={Underworld} alt="Entrance of the Underworld" sizes="(min-width: 460px) 426px, calc(90vw + 30px)" />
            </div>
        </div>
    )
}