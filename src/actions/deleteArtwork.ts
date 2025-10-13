"use server"

import { db } from "@/db";
import { artworksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs/promises"

export async function deleteArtworkAction(id: number) {
    const deletedArtwork = await db.delete(artworksTable).where(eq(artworksTable.id, id)).returning()
    await fs.unlink(`public/images/${deletedArtwork[0].imagePath}`)
    revalidatePath("/")
    revalidatePath("/portfolio")
}