"use server"

import { revalidatePath } from "next/cache";
import { deleteArtwork } from "@/dal/artworks";
import { del } from "@vercel/blob";
import { deleteImageDimensions } from "@/dal/imageDimensions";

export async function deleteArtworkAction(id: number) {
    const deletedArtwork = await deleteArtwork(id)
    await deleteImageDimensions(deletedArtwork[0].id)
    await del(deletedArtwork[0].imagePath)
    revalidatePath("/")
    revalidatePath("/portfolio")
}