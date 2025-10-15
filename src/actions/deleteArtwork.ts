"use server"

import { revalidatePath } from "next/cache";
import fs from "fs/promises"
import { deleteArtwork } from "@/dal/artworks";

export async function deleteArtworkAction(id: number) {
    const deletedArtwork = await deleteArtwork(id)
    await fs.unlink(`public/images/${deletedArtwork[0].imagePath}`)
    revalidatePath("/")
    revalidatePath("/portfolio")
}