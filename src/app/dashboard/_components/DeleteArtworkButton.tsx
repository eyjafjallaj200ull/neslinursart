"use client"

import { deleteArtworkAction } from "@/actions/deleteArtwork"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function DeleteArtworkButton({id} : {id: number}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <button className={`cursor-pointer ${isPending ? "text-gray-400" : ""}`} onClick={() => {
            startTransition(async () => {
                await deleteArtworkAction(id)
                router.refresh()
             })
        }} disabled={isPending} > 
            Delete 
        </button>
    )
}