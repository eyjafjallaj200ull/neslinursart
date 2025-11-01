"use server"

import { editArtworkSchema } from "@/zod-schemas/artwork"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import z from "zod/v4"
import { ActionResponse } from "@/types/action-response"
import { getArtworkById, updateArtwork } from "@/dal/artworks"
import { del, put } from "@vercel/blob"
import { deleteImageDimensions, insertImageDimensions } from "@/dal/imageDimensions"
import imageSize from "image-size"

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
    const artwork = await getArtworkById(id)

    if(!artwork) return notFound()
    let imagePath = artwork.imagePath
    if (data.image != null && data.image.size > 0) {
        await del(artwork.imagePath)
        await deleteImageDimensions(id)
        const imageFile = formData.get('image') as File;
        const blob = await put(imageFile.name, imageFile, {
            access: 'public',
            addRandomSuffix: true,
        });

        imagePath = blob.url
        const imageDimensions = imageSize(new Uint8Array(await data.image.arrayBuffer()))
        const dimensions = await insertImageDimensions({
            imageId: id,
            width: imageDimensions.width || 0,
            height: imageDimensions.height || 0
        })
        console.log("dims", dimensions)
    }
    await updateArtwork(id, data, imagePath)

    revalidatePath("/")
    revalidatePath("/portfolio")
    //redirect("/dashboard")

    return {
        success: true,
        message: `Artwork ID #${id} updated successfully`
    }
}