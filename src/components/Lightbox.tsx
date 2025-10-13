"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect, JSX, MouseEvent, TouchEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { artworkSelectSchemaType } from '@/zod-schemas/artwork'
import { ISizeCalculationResult } from 'image-size/types/interface'
import { getDimensions } from '@/lib/utils'


type Props = {
    artworks: artworkSelectSchemaType[]
    dimensionsArray: {
        id: number;
        dimensions: ISizeCalculationResult;
    }[]
} 

export default function Lightbox({artworks, dimensionsArray} : Props) {
    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const imageRef = useRef<null | HTMLImageElement>(null)
    const imageId = searchParams.get('imageId')
    const router = useRouter()
    const [startX, setStartX] = useState(0)
    const imageIndex = imageId ? artworks.findIndex((imageObj) => imageObj.id.toString() === imageId) : -1;
    const {name, imagePath} = imageId ? artworks[imageIndex] : {};
    const dimensions = imageId ? getDimensions(dimensionsArray, Number(imageId)) : ""

    useEffect(() => {
        if (imageId) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [imageId])

    function handleClose() {
        if(imageId) router.replace("/portfolio", {scroll: false})
    }

    function handleDialogClick(e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>) {
        if(!imageRef.current?.contains(e.target as HTMLElement)) {
            router.replace("/portfolio", {scroll: false})
        }
    }

    function handleTouchEnd(e: TouchEvent<HTMLImageElement>) {
        const endX = e.changedTouches[0].clientX
        const deltaX = endX - startX
        if (deltaX > 0) {
            showPrev()
        }
        if (deltaX < 0) {
            showNext()
        }
    }

    function showNext () {
        if (imageIndex + 1 < artworks.length) {
            const newImageId = artworks[imageIndex + 1].id
            router.push(`/portfolio?imageId=${newImageId}`, {scroll: false})
        } else {
            const newImageId = artworks[0].id
            router.push(`/portfolio?imageId=${newImageId}`, {scroll: false})
        }
    }

    function showPrev () {
        if (imageIndex - 1 > -1) {
            const newImageId = artworks[imageIndex - 1].id
            router.push(`/portfolio?imageId=${newImageId}`, {scroll: false})
        } else {
            const newImageId = artworks[artworks.length - 1].id
            router.push(`/portfolio?imageId=${newImageId}`, {scroll: false})
        }
    }

    const dialog: JSX.Element | null = imageId ? 
    (
        <dialog onClick={e => handleDialogClick(e)} aria-label='image carousel' onClose={handleClose} className="fixed md:overflow-hidden left-[50%] top-[50%] z-50 w-full h-full translate-x-[-50%] translate-y-[-50%]  backdrop:bg-black/85 flex justify-center items-center  bg-transparent" ref={dialogRef}>

            <button className='text-white fixed h-full xl:h-auto pr-12 pl-10 left-0 bg-black/40 xl:bg-transparent xl:left-1/12 xl:p-6 hidden md:inline-block cursor-pointer text-4xl font-bold' 
            onClick={e => {
                e.stopPropagation()
                showPrev()
                }}>
                ⭠
            </button>

            <Image onTouchStart={e => setStartX(e.touches[0].clientX)} onTouchEnd={e => handleTouchEnd(e)} ref={imageRef} className={dimensions ? (dimensions.height > dimensions.width ? "w-[500px] h-auto" : "h-[500px w-auto") : ""} src={`/images/${imagePath}`} width={dimensions ? dimensions.width : undefined} alt={name!} height={dimensions ? dimensions.height : undefined} />

            <button className='text-white fixed h-full pl-12 pr-8 right-0 bg-black/40 xl:bg-transparent xl:right-1/12 xl:p-6 xl:h-auto hidden md:inline-block cursor-pointer text-4xl font-bold' 
            onClick={e => {
                e.stopPropagation()
                showNext()
                }}>
                ⭢
            </button>
            <button className='text-white p-4 fixed top-0 right-0 text-4xl cursor-pointer font-sans'>X</button>
        </dialog>
    )
    :
    null
    
    return dialog

}