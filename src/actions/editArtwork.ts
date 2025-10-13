"use server"

import { db } from "@/db"
import { artworksTable } from "@/db/schema"
import { editArtworkSchema } from "@/zod-schemas/artwork"
import { eq } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import z from "zod/v4"
import { ActionResponse } from "@/types/action-response"

export async function editArtworkAction (id: number, prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
    const formDataObject = Object.fromEntries(formData.entries())
    const validatedFields = editArtworkSchema.safeParse(formDataObject)
    const NonImageInputs = {
        name: formDataObject.name,
        year: formDataObject.year
    }
    if (!validatedFields.success) {
        return {
            success: false,
            message: "An error occurred",
            errors: z.flattenError(validatedFields.error).fieldErrors,
            inputs: NonImageInputs
        }
    }
    const data = validatedFields.data
    const artworkSelect = await db.select().from(artworksTable).where(eq(artworksTable.id, id))

    if(!artworkSelect) return notFound()
    const artwork = artworkSelect[0]
    let imagePath = artwork.imagePath
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public/images/${artwork.imagePath}`)
        imagePath = `${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public/images/${imagePath}`,
            Buffer.from(await data.image.arrayBuffer())
        )
    }
    await db.update(artworksTable).set({
        name: data.name,
        year: data.year,
        imagePath
    }).where(eq(artworksTable.id, id))

    revalidatePath("/")
    revalidatePath("/portfolio")
    //redirect("/dashboard")

    return {
        success: true,
        message: `Artwork ID #${id} updated successfully`
    }
}