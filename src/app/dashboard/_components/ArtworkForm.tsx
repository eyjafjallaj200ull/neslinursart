"use client"

import { createArtworkAction } from "@/actions/createArtwork";
import { editArtworkAction } from "@/actions/editArtwork";
import { ActionResponse } from "@/types/action-response";
import { artworkSelectSchemaType } from "@/zod-schemas/artwork";
import { useActionState } from "react";

const initialState: ActionResponse = {
  success: false,
  message: '',
}

export default function ArtworkForm ({artwork} : {artwork?: artworkSelectSchemaType | null}) {
    const [state, action, isPending] = useActionState(
        artwork ? editArtworkAction.bind(null, artwork.id) : createArtworkAction,
        initialState
    )
    return (
        <form className="grid gap-1 mx-auto max-w-[500px]" action={action}>
            <div className="grid gap-1">
                <label htmlFor="name">Title</label>
                <input 
                    className="border-foreground border-solid border-1 p-1 outline-none"
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={artwork ? artwork.name : `${state.inputs?.name ?? ""}`}
                />
                {state?.errors?.name ?? ""}
            </div>
            <div className="grid gap-1">
                <label htmlFor="year">Year</label>
                <input 
                    className="border-foreground border-solid border-1 p-1 outline-none"
                    type="text"
                    id="year"
                    name="year"
                    required
                    defaultValue={artwork ? artwork.year : `${state.inputs?.year ?? ""}`}
                />
                {state?.errors?.year ?? ""}
            </div>
            <div className="grid gap-1">
                <label htmlFor="image">Image</label>
                <input 
                    className="border-foreground border-solid border-1 p-1 outline-none cursor-pointer"
                    type="file"
                    id="image"
                    name="image"
                    required={!artwork}
                />
                {!!artwork && (
                    <img className="size-72 justify-self-center my-5 object-cover" alt={artwork.name} src={`/images/${artwork.imagePath}`} />
                )}
                {state?.errors?.image ?? ""}
            </div>
            <button
                className="border-foreground border-solid border-1 justify-self-center w-20 p-1 cursor-pointer mt-5"
                type="submit" disabled={isPending} >
                {isPending ? "Saving..." : "Save" }
            </button>
            {state?.success ? state.success : "" }
        </form>
    )
}