"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect, MouseEvent, TouchEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { artworkSelectSchemaType } from '@/zod-schemas/artwork'
import { ISizeCalculationResult } from 'image-size/types/interface'


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
    const imageIndex = imageId ? artworks.findIndex((imageObj) => imageObj.id.toString() === imageId) : -1;
    const {name, imagePath} = imageId ? artworks[imageIndex] : {name: "", imagePath: ""};
    const dimensions = imageId ? dimensionsArray.find(dimObj => dimObj.id === Number(imageId))?.dimensions ?? {height:0, width: 0} : null

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (imageId) {
            // Only open if not already open
            if (!dialog.open && imageIndex > -1) {
                dialog.showModal()
            }
        } else {
            // Only close if open
            if (dialog.open) {
                dialog.close()
            }
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
    
    return (
        <dialog onClick={e => handleDialogClick(e)} aria-label='image carousel' onClose={handleClose} className="fixed md:overflow-hidden left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center bg-transparent [&:not([open])]:pointer-events-none [&:not([open])]:opacity-0 [&[open]]:w-full [&[open]]:h-full" ref={dialogRef}>
            {!!imageId && imageIndex > -1 ? (
            <>
                <button className='text-white fixed md:h-full xl:h-auto md:pr-12 md:pl-10 left-0 md:bg-black/40 xl:bg-transparent xl:left-1/12 xl:p-6 cursor-pointer text-4xl font-bold outline-none' 
                onClick={e => {
                    e.stopPropagation()
                    showPrev()
                    }}>
                    ⭠
                </button>

                <Image ref={imageRef} className={dimensions ? (dimensions.height > dimensions.width ? "md:w-[500px] md:h-auto" : "md:h-[500px] md:w-auto") : ""} src={imagePath} width={dimensions ? dimensions.width : 100} alt={name!} height={dimensions ? dimensions.height : 100} />

                <button className='text-white fixed md:h-full md:pl-12 md:pr-10 right-0 md:bg-black/40 xl:bg-transparent xl:right-1/12 xl:p-6 xl:h-auto  cursor-pointer text-4xl font-bold outline-none' 
                onClick={e => {
                    e.stopPropagation()
                    showNext()
                    }}>
                    ⭢
                </button>
                <button className='text-white p-4 fixed top-0 right-0 text-4xl cursor-pointer font-sans outline-none'>X</button>
            </>
            )
        : null}
        </dialog>
    )
}